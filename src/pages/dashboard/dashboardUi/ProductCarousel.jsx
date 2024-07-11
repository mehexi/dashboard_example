import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";


const ProductCarousel = ({ data }) => {
  if (!data) {
    return <h1>locading</h1>;
  }

  console.log(data.data);

  return (
    <Carousel className="w-full h-80">
      <CarouselContent style={{ height: '100%' }}>
        {data.data.slice(0, 5).map((product) => (
          <CarouselItem
            key={product._id}
            className="relative p-4 h-full flex bg-gradient-to-t from-black"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover absolute inset-0 w-full h-full -z-10"
            />
            <div className=" z-10 p-6 flex flex-col mt-auto  align-baseline gap-1">
                    <h2 className="text-xl mt-2 capitalize">{product.name}</h2>
                    <CardDescription>{product.description}</CardDescription>
                    <Button className='mt-3 w-fit'>Buy now</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
