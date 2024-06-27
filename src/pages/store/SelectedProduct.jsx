import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import config from "@/config";
import RatingStars from "@/utility/RatingStars";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import QuantitySelector from "@/components/coustomUi/QuantitySelector";
import { addToCart } from "@/utility/addToCart";
import { PhotoCarousel } from "@/components/coustomUi/PhotoCarousel";

const SelectedProduct = () => {
  const data = useLoaderData();
  const product = data.data.data;
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const buyProduct = (product) => {
    addToCart(product)
    navigate('/checkout')
  }

  return (
    <section className="mx-auto w-full max-w-[80rem] p-4">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 mb-4"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-7 auto-rows-max gap-4">
        <div className="col-span-1 lg:col-span-4 rounded-xl overflow-hidden">
          <PhotoCarousel data={product.images} />
        </div>
        <Card className="col-span-1 lg:col-span-3 flex flex-col h-full">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="px-2 py-1 bg-green-400/20 text-[#22C55E] w-fit rounded-lg">
                active
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                <RatingStars rating={product.rating} size={24} />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{product.description}</CardDescription>
          </CardContent>
          <CardContent>
            <Separator className="border-dashed" />
          </CardContent>
          <CardContent className="flex justify-between">
            <h1>Quantity</h1>
            <QuantitySelector
              available={product.stock}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </CardContent>
          <CardContent>
            <Separator />
          </CardContent>
          <CardContent className="flex-grow flex items-baseline align-baseline justify-between">
            <CardTitle>Total</CardTitle>
            <CardTitle>${product.price * quantity}</CardTitle>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button
              onClick={() => addToCart(product)}
              className="w-full flex gap-2"
              variant="outline"
            >
              <ShoppingCart size={18} />
              <h1>Add to cart</h1>
            </Button>
            <Button onClick={()=>buyProduct(product)}  className="w-full">
              <h1>Buy now</h1>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default SelectedProduct;
