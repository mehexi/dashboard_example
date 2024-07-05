import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import config from "@/config";
import { ChevronLeft } from "lucide-react";

export function PhotoCarousel({ data }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((image, index) => (
            <CarouselItem key={index}>
              <div className="flex aspect-square items-center justify-center relative">
                <img
                  src={`${image}`}
                  alt={`product image ${index + 1}`}
                  draggable={false}
                  className="w-full object-cover aspect-square h-full"
                />
                <div className="py-2 text-center text-sm text-muted-foreground absolute z-10 bottom-5 bg-black/20 px-3 rounded-full ">
                  <CarouselPrevious className="">
                    <ChevronLeft  />
                  </CarouselPrevious>
                  <h1 className="text-white">
                    Slide {current} of {count}
                  </h1>
                  <CarouselNext>
                    <ChevronLeft className="text-white" />
                  </CarouselNext>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
