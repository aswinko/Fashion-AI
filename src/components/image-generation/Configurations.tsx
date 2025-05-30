"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import useGeneratedStore from "@/store/useGeneratedStore";
import { Tables } from "@datatypes.types";

export const imageGenerationFormSchema = z.object({
  model: z.string().min(1, {
    message: "Model is required.",
  }),
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  guidance: z.number().min(1, {
    message: "Guidance is required.",
  }),
  num_output: z
    .number()
    .min(1, {
      message: "Number of outputs must be at least 1.",
    })
    .max(4, {
      message: "Number of outputs must be less than 4.",
    }),
  aspect_ratio: z.string().min(1, {
    message: "Aspect Ratio is required.",
  }),
  output_format: z.string().min(1, {
    message: "Output format is required.",
  }),
  output_quality: z
    .number()
    .min(1, {
      message: "Output quality must be at least 1.",
    })
    .max(100, {
      message: "Output quality must be less than or equal to 100.",
    }),
  num_inference_steps: z
    .number()
    .min(1, {
      message: "Number of inference steps must be at least 1.",
    })
    .max(50, {
      message: "Number of inference steps must be less than or equal to 50.",
    }),
});

interface ConfigurationsProps {
  userModels: Tables<"models">[];
  model_id?: string | undefined;
}

const Configurations = ({ userModels, model_id }: ConfigurationsProps) => {
  const generateImage = useGeneratedStore((state) => state.generateImage);

  const form = useForm<z.infer<typeof imageGenerationFormSchema>>({
    resolver: zodResolver(imageGenerationFormSchema),
    defaultValues: {
      model: model_id ? `aswinko/${model_id}` : "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_output: 1,
      aspect_ratio: "1:1",
      output_format: "jpg",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;
        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else {
          newSteps = 28;
        }
        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof imageGenerationFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);

    const newValues = {
      ...values,
      prompt: values.model.startsWith("aswinko/")
        ? (() => {
            const modelId = values.model.replace("aswinko/", "").split(":")[0];
            const selectedModel = userModels.find(
              (model) => model.model_id === modelId
            );
            return `photo of a ${selectedModel?.trigger_word || "ohwx"} ${selectedModel?.gender}, ${values.prompt} `;
          })()
        : values.prompt,
    };

    await generateImage(newValues);
  }
  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <fieldset className="grid gap-4 p-4 bg-background rounded-lg border">
            <legend className="text-sm -ml-1 px-1 font-medium">Settings</legend>

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Model
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You can any model from the dropdown menu.</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="black-forest-labs/flux-dev">
                        Flux Dev
                      </SelectItem>
                      <SelectItem value="black-forest-labs/flux-schnell">
                        Flux Schnell
                      </SelectItem>
                      {userModels?.map(
                        (model) =>
                          model.training_status === "succeeded" && (
                            <SelectItem
                              key={model.id}
                              value={`aswinko/${model.model_id}:${model.version}`}
                            >
                              {model.model_name}
                            </SelectItem>
                          )
                      )}
                      {/* <SelectItem value="">My model</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="aspect_ratio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Aspect Ratio
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-foreground/60" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Aspect ratio of the generated image.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a aspect ratio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1:1">1:1</SelectItem>
                        <SelectItem value="16:9">16:9</SelectItem>
                        <SelectItem value="9:16">9:16</SelectItem>
                        <SelectItem value="21:9">21:9</SelectItem>
                        <SelectItem value="9:21">9:21</SelectItem>
                        <SelectItem value="4:5">4:5</SelectItem>
                        <SelectItem value="5:4">5:4</SelectItem>
                        <SelectItem value="4:3">4:3</SelectItem>
                        <SelectItem value="3:4">3:4</SelectItem>
                        <SelectItem value="2:3">2:3</SelectItem>
                        {/* <SelectItem value="3:4">3:4</SelectItem> */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="num_output"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Number of Outputs
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-foreground/60" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total number of output images to generate.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={4}
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="guidance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      Guidance
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-foreground/60" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Prompt guidance for generated image.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={0}
                      max={100}
                      step={0.5}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_inference_steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      Number of Inference Steps
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-foreground/60" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Number of denoising steps. Recommended range is
                            28.50 for dev model and 1.4 for schnell model
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={1}
                      max={
                        form.getValues("model") ===
                        "black-forest-labs/flux-schnell"
                          ? 4
                          : 50
                      }
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="output_quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      Output Quality
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-foreground/60" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Quality when sabing the output image, from 0 to 100.
                            100 is best quality, 0 is lowest quality.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={50}
                      max={100}
                      step={0.5}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="output_format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Output Format
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Format of output image.</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a output format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Prompt
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Prompt for generated images.</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="font-medium">
              Generate
            </Button>
          </fieldset>
        </form>
      </Form>
    </TooltipProvider>
  );
};

export default Configurations;
