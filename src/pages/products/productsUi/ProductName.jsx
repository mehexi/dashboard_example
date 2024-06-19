import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const ProductName = ({ productTitle, productDetails, price }) => {
  return (
    <Card className='flex justify-between p-6 gap-6'>
      <div className="flex flex-col justify-between">
        <CardTitle>{productTitle}</CardTitle>
        <CardDescription>{productDetails}</CardDescription>
      </div>
      <CardTitle>$ {price}</CardTitle>
    </Card>
  );
};

export default ProductName;
