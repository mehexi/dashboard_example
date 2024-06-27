import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const Summary = ({ cartData }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(5); // Set discount as percentage
  const [total, setTotal] = useState(0);

  // Static shipping cost (example: $10.00)
  const shippingCost = 10.0;

  useEffect(() => {
    // Calculate Subtotal
    const newSubtotal = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);

    // Calculate discount amount
    const discountAmount = (newSubtotal * discount) / 100;

    // Calculate Total
    const newTotal = newSubtotal + shippingCost - discountAmount;
    setTotal(newTotal);
  }, [cartData, discount]);

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableRow className="border-none">
            <TableCell className="text-[#637381] dark:text-[#919EAB]">
              Subtotal
            </TableCell>
            <TableCell className="text-right font-bold">
              ${subtotal.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableCell className="text-[#637381] dark:text-[#919EAB]">
              Discount
            </TableCell>
            <TableCell className="text-right font-bold">
              -${((subtotal * discount) / 100).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableCell className="text-[#637381] dark:text-[#919EAB]">
              Shipping
            </TableCell>
            <TableCell className="text-right font-bold">
              ${shippingCost.toFixed(2)}
            </TableCell>
          </TableRow>
        </Table>
        <Separator />
        <Table>
          <TableRow className="border-none">
            <TableCell className="text-[#637381] dark:text-[#919EAB]">
              Total
            </TableCell>
            <TableCell className="text-right font-bold">
              ${total.toFixed(2)}
            </TableCell>
          </TableRow>
        </Table>
        <Separator />
        <div className="relative mt-5">
          <Input type="text" defaultValue="DISCOUNT5" className="px-4 py-8" />
          <Button
            variant=""
            className="absolute top-1/2 -translate-y-1/2 right-5"
          >
            Apply
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Check it out</Button>
      </CardFooter>
    </Card>
  );
};

export default Summary;
