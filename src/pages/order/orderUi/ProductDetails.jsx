import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const ProductDetails = ({ productData }) => {
  const products = productData.products;

  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
      <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Product</TableHead>
              <TableHead className=" text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="flex items-center gap-3">
                  <img
                    src={`${product.productID.images[0]}`}
                    className="aspect-square w-10 h-10 rounded object-cover md:w-20 md:h-20"
                    alt={product.productID.name}
                  />
                  <div>
                    <h1>{product.productID.name}</h1>
                    <CardDescription>
                      {product.productID.description}
                    </CardDescription>
                  </div>
                </TableCell>
                <TableCell className="text-right">x{product.quantity}</TableCell>
                <TableCell className="font-semibold text-lg text-right">
                  ${product.totalPrice}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-semibold text-right" colSpan={2}>
                Charge
              </TableCell>
              <TableCell className="text-xl font-semibold text-right text-red-400">
                - $
                {productData.deliveryOption === "Free 5-7 days delivery"
                  ? 0
                  : productData.deliveryOption === "Standard 3-5 days delivery"
                  ? 10
                  : productData.deliveryOption === "Express 2-3 days delivery"
                  ? 20
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-lg text-right" colSpan={2}>
                Total
              </TableCell>
              <TableCell className="text-xl font-bold text-right md:text-2xl">
                ${productData.cost}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
