import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://570f-2409-40f3-121-9770-f45f-5950-be47-5c66.ngrok-free.app";

async function validateUserCredits(userId: string) {
  const { data: userCredits, error } = await supabaseAdmin
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .single();

    if (error) {
      throw new Error("Failed to fetch user credits");
    }

    const credits = userCredits?.model_training_count ?? 0
    if (credits <= 0) {
      throw new Error("You don't have enough credits to train a model.");
    }
    return credits;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("The replicate api token is not defined");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "UnAuthorized",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const input = {
      fileKey: formData.get("fileKey") as string,
      modelName: formData.get("modelName") as string,
      gender: formData.get("gender") as string,
    };

    console.log(input);

    if (!input.fileKey || !input.modelName) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const oldCredits = await validateUserCredits(user?.id);

    const fileName = input.fileKey.replace("training-data/", "");
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training-data")
      .createSignedUrl(fileName, 3600);

    if (!fileUrl?.signedUrl) {
      throw new Error("Failed to get the file url.");
    }

    console.log(fileUrl);

    const modelId = `${user.id}_${Date.now()}_${input.modelName.toLowerCase().replaceAll(" ", "-")}`;
    //CREATE MODEL
    await replicate.models.create("aswinko", modelId, {
      visibility: "private",
      hardware: "gpu-a100-large",
    });

    //start the training

    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "c6e78d2501e8088876e99ef21e4460d0dc121af7a4b786b9a4c2d75c620e300d",
      {
        // You need to create a model on Replicate that will be the destination for the trained version.
        destination: `aswinko/${modelId}`,
        input: {
          steps: 1200,
          resolution: "1024",
          input_images: fileUrl.signedUrl,
          trigger_word: "ohwx",
        },
        webhook: `${WEBHOOK_URL}/api/webhooks/training?userId=${user.id}&modelName=${encodeURIComponent(input.modelName)}&fileName=${encodeURIComponent(fileName)}`,
        webhook_events_filter: ["completed"], // optional
      }
    );

    //add model values in the supabase

    await supabaseAdmin.from("models").insert({
      model_id: modelId,
      user_id: user.id,
      model_name: input.modelName,
      gender: input.gender,
      training_status: training.status,
      trigger_word: "ohwx",
      training_steps: 1200,
      training_id: training.id,
    });

    //update the credits
    await supabaseAdmin.from("credits").update({model_training_count: oldCredits - 1}).eq("user_id", user.id);



    // console.log(training);

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to start the model training";
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
