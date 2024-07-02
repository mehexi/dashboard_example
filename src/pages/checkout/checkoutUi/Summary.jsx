import { AuthContext } from "@/auth/AuthProvider";
import axiosInstance from "@/axios/AxiosIntence";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import config from "@/config";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckOutComplete from "../CheckOutComplete";
import {
  Dialog,
} from "@/components/ui/dialog";
import { removeAllCart } from "@/utility/cartUtils";

const Summary = ({ cartData, userLocation, shipping, paymentOption }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [voucherError, setVoucherError] = useState("");
  const [cart, setCartData] = useState([]);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState([])
  
  const shippingCost = shipping.cost || 0


  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axiosInstance.get("/vouchers");
        setVouchers(response.data);
      } catch (error) {
        console.error(error);
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
  }, [cartData, discount, shippingCost]);

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

  //add order to database
  const handleOrderData = async () => {
    if (!paymentOption) {
      setError("Please select a payment option");
      return;
    }

    try {
      const userId = localStorage.getItem("uID");

      const products = cartData.map((item) => ({
        productID: item._id,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      }));

      const location = {
        addressType: userLocation.addressType,
        address: userLocation.address,
        city: userLocation.city,
        state: userLocation.state,
        zipCode: userLocation.zipCode,
        selectedCountry: userLocation.selectedCountry,
      };

      // Prepare orderData object
      const orderData = {
        userId,
        cost: total,
        products,
        location,
      };

      
      const response = await axiosInstance.post("/sales", orderData);
      console.log("Order added successfully:", response.data);
      const orderDetails = response.data
      setOrderDetails(orderDetails);
      setOrderComplete(true);
      removeAllCart()
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("cart"));
    setCartData(product);
  }, []);
  
  console.log(shipping);

  const isStep2 = location.pathname.includes("step2");
  const isStep3 = location.pathname.includes("step3");

  return (
    <>
      <Dialog open={orderComplete} onOpenChange={setOrderComplete}>
        <CheckOutComplete orderDetails={orderDetails} shipping={shipping} />
      </Dialog>
      <div className="col-span-2 h-fit flex flex-col gap-4">
        {isStep3 && (
          <Card className="bg-primary-foreground">
            <CardContent className="pt-6">
              {cart.map((item, index) => (
                <>
                  <Card key={index} className="bg-transparent border-none">
                    <div className="p-3 flex gap-3">
                      <img
                        src={`${config.API_BASE_URL}${item.images[0]}`}
                        className="w-auto h-20 aspect-square  rounded-lg object-cover"
                        alt=""
                      />

                      <div className=" flex flex-col gap-1">
                        <h1 className="truncate max-w-40">{item.name}</h1>
                        <CardDescription className="truncate w-40">
                          {item.description}
                        </CardDescription>
                        <h1>${item.price}</h1>
                      </div>
                    </div>
                  </Card>
                  <Separator />
                </>
              ))}
            </CardContent>
          </Card>
        )}
        {isStep3 && userLocation && (
          <Card className="bg-primary-foreground">
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>
                {userLocation.fullName}{" "}
                <span className="text-muted-foreground">
                  ({userLocation.addressType})
                </span>
              </h1>
              <h1 className="text-muted-foreground">
                {userLocation.address}, {userLocation.city},{" "}
                {userLocation.selectedCountry} [{userLocation.zipCode}]
              </h1>
              <h1 className="text-muted-foreground">{userLocation.phone}</h1>
            </CardContent>
          </Card>
        )}
        <Card className="bg-primary-foreground">
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
                <TableCell className="text-right font-bold text-xl text-red-400">
                  ${total.toFixed(2)}
                </TableCell>
              </TableRow>
            </Table>
            <Separator />
            {!isStep2 && !isStep3 && (
              <>
                <div className="relative mt-5">
                  <Input
                    type="text"
                    value={discountCode}
                    placeholder="Promo code here"
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="px-4 py-8"
                  />
                  <Button
                    className="absolute top-1/2 -translate-y-1/2 right-5"
                    onClick={applyDiscount}
                  >
                    Apply
                  </Button>
                </div>
                {voucherError && (
                  <div className="text-red-500 mt-2">{voucherError}</div>
                )}
              </>
            )}
          </CardContent>
          {!isStep2 && !isStep3 && (
            <CardFooter>
              <Button onClick={() => navigate("step2")} className="w-full">
                Check it out
              </Button>
            </CardFooter>
          )}
        </Card>
        {isStep3 && error && <h1 className="text-red-400">{error}</h1>}
        {isStep3 && <Button onClick={handleOrderData}>Complete Order</Button>}
      </div>
    </>
  );
};

export default Summary;
