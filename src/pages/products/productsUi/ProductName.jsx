import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

const ProductName = ({ productTitle, productDetails, price }) => {
  return (
    <Card className='flex justify-between items-center p-6 gap-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg'>
      <div className="flex flex-col justify-between">
        <CardTitle className="text-2xl font-bold text-white">{productTitle}</CardTitle>
        <CardDescription className="text-sm text-gray-200">{productDetails}</CardDescription>
      </div>
      <h1 className="text-4xl font-bold text-white">$ {price}</h1>
    </Card>
  );
};

export default ProductName;
