import React, { useEffect, useRef } from "react";
import config from "@/config";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/utility/addToCart";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const descriptionRef = useRef(null);

  const truncateText = (element, maxLength) => {
    if (element && element.textContent.length > maxLength) {
      element.textContent = element.textContent.slice(0, maxLength) + "...";
    }
  };

  useEffect(() => {
    truncateText(descriptionRef.current, 50);
  }, [data.description]);

  return (
    <Link to={`${data._id}`} className="w-full h-full">
      <div
        className={`bg-white/5 flex flex-col justify-between rounded-2xl p-3 shadow-lg mx-auto w-full group cursor-pointer h-full`}
      >
        <div className="mb-3 relative">
          <img
            src={`${config.API_BASE_URL}${data.images[0]}`}
            alt="Product Image"
            className="aspect-square rounded-xl object-cover w-full group-hover:scale-105 duration-300"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addToCart(data);
            }}
            className="absolute bottom-3 right-3 px-4 py-2 rounded-lg hidden group-hover:block"
          >
            <ShoppingCart size={14} />
          </Button>
        </div>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold duration-300">{data.name}</h1>
            <p ref={descriptionRef} className="text-gray-600 max-w-48 text-sm">
              {data.description}
            </p>
          </div>
          <h1 className="text-xl font-bold text-right">{data.price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
