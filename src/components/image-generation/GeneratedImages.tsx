"use client"

import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import useGeneratedStore from "@/store/useGeneratedStore";

const GeneratedImages = () => {
  const images = useGeneratedStore((state) => state.images)
  const loading = useGeneratedStore((state) => state.loading)

  if (images.length === 0) {
    return (
      <Card className="w-full max-w-2xl bg-muted">
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-2xl">No images generated</span>
        </CardContent>
      </Card>
    );
  }
  return (
    <Carousel
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex relative items-center justify-center rounded-lg overflow-hidden aspect-square">
            <Image src={image.url} alt={"Generated image using ai"} fill className="w-full h-full object-contain" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GeneratedImages;
