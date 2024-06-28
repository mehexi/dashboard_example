import axiosInstance from "@/axios/AxiosIntence";
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
  const [vouchers, setVouchers] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("DISCOUNT5");
  const [voucherError, setVoucherError] = useState("");

  const shippingCost = 10.0;

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axiosInstance("/vouchers");
        setVouchers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    const newSubtotal = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);

    const discountAmount = (newSubtotal * discount) / 100;

    const newTotal = newSubtotal + shippingCost - discountAmount;
    setTotal(newTotal);
  }, [cartData, discount]);

  const applyDiscount = () => {
    const currentDate = new Date();
    const voucher = vouchers.find(
      (v) => v.code === discountCode && new Date(v.expiry_date) >= currentDate
    );

    if (voucher) {
      setDiscount(voucher.discount);
      setVoucherError("");
    } else {
      setDiscount(0);
      setVoucherError("Invalid or expired voucher code.");
    }
  };

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
          <Input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="px-4 py-8"
          />
          <Button
            variant=""
            className="absolute top-1/2 -translate-y-1/2 right-5"
            onClick={applyDiscount}
          >
            Apply
          </Button>
        </div>
        {voucherError && (
          <div className="text-red-500 mt-2">{voucherError}</div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Check it out</Button>
      </CardFooter>
    </Card>
  );
};

export default Summary;
