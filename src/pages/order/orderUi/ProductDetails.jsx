import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import config from "@/config";
import React from "react";

const ProductDetails = ({ productData }) => {
  const products = productData.products;
  console.log(products);

  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <img
                      src={`${config.API_BASE_URL}${product.productID.images[0]}`}
                      className="aspect-square w-20 h-20 rounded object-cover"
                      alt={product.productID.name}
                    />
                    <div>
                      <h1>{product.productID.name}</h1>
                      <CardDescription>
                        {product.productID.description}
                      </CardDescription>
                    </div>
                  </div>
                </TableCell>
                <TableCell>x{product.quantity}</TableCell>
                <TableCell className="font-semibold text-lg text-end">
                  ${product.totalPrice}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-semibold text-lg text-end" colSpan={2}>
                Total
              </TableCell>
              <TableCell className="text-2xl font-bold">
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
