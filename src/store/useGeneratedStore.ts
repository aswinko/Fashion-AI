import { create } from "zustand";
import { imageGenerationFormSchema } from "@/components/image-generation/Configurations";
import { z } from "zod";
import { generateImageAction, storeImages } from "@/app/actions/image-actions";
import { toast } from "sonner";

interface GeneratedImage {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (values: z.infer<typeof imageGenerationFormSchema>) => Promise<void>;
}

const useGeneratedStore = create<GeneratedImage>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: z.infer<typeof imageGenerationFormSchema>) => {
    set({ loading: true, error: null });

    const toastId = toast.loading("Generating image...");

    try {
      const { error, success, data } = await generateImageAction(values);
      if (!success) {
        set({ error: error, loading: false });
        return;
      }

      console.log(data);
      

      const dataWithUrl = data.map((url:string) => {
        return {
            url,
            ...values
        }
      }) 

      set({ images: dataWithUrl as { url: string }[], loading: false });
      toast.success("Image generated successfully!", {id: toastId});
      
      await storeImages(dataWithUrl)
      toast.success("Image stored successfully!", {id: toastId});
    } catch (error) {
      console.log(error);
      set({ error: "Failed to generate image. Please try again." });
    }
  },
}));

export default useGeneratedStore;
