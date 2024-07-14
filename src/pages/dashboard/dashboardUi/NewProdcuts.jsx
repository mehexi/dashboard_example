import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const NewProduct = ({ product }) => {
  console.log(product);

  const filteredProduct = product.slice(0, 5);

  const getRankClasses = (rank) => {
    switch (rank) {
      case 1:
        return "bg-purple-700/30 text-purple-300";
      case 2:
        return "bg-purple-800/50 text-purple-200";
      case 3:
        return "bg-teal-600/50 text-teal-200";
      case 4:
        return "bg-yellow-600/50 text-yellow-200";
      case 5:
        return "bg-orange-600/50 text-orange-200";
      default:
        return "bg-gray-400/50 text-gray-200";
    }
  };

  return (
    <Card className="col-span-6 md:col-span-2 bg-primary-foreground">
      <CardHeader>
        <CardTitle>Latest Product</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredProduct.map((product, index) => (
          <>
            <div
              className="flex items-center justify-between p-3"
              key={product._id}
            >
              <div className="flex items-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 object-cover mr-3 rounded"
                />
                <div>
                  <div className="font-bold">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    {product.description}
                  </div>
                </div>
                    </div>
                    <h1>${product.price}</h1>
                </div>
                <Separator/>
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewProduct;
