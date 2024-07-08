import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FaCreditCard, FaMoneyBill, FaPaypal } from "react-icons/fa6";

const DetailsPanel = ({ cartData,handleEdit }) => {
  console.log(cartData);

  return (
    <Card className="bg-primary-foreground col-span-2">
      <CardContent className="pt-6 flex flex-col gap-3">
        <CustomerInfo userId={cartData.userId} />
        <Separator />
        <DeliveryInfo deliveryOption={cartData.deliveryOption} />
        <Separator />
        <ShippingInfo location={cartData.location} />
        <Separator />
        <PaymentInfo paymentMethod={cartData.paymentMethod} />
        <Separator />
      </CardContent>
      <CardFooter className="">
        {
          cartData.orderStat==='Completed'?'': <CardContent className='flex w-full gap-3'>
          <Button onClick={()=>{handleEdit(cartData._id, 'Canceled')}}  className='flex-1 w-full' variant='outline'>Cancel Order</Button>
          <Button onClick={()=>{handleEdit(cartData._id)}}  className='flex-1 w-full'>Complete Order</Button>
        </CardContent>
        }
       
      </CardFooter>
    </Card>
  );
};

export default DetailsPanel;

const CustomerInfo = ({ userId }) => {
  return (
    <Card className="bg-transparent border-none">
      <CardHeader>
        <CardTitle>Customer Info</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        {userId.photoURL ? (
          <img
            src={userId.photoURL}
            alt="user"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          ""
        )}
        <div className="">
          <h1>{userId.name}</h1>
          <CardDescription>{userId.email}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

const DeliveryInfo = ({ deliveryOption }) => {
  if (!deliveryOption) {
    return <></>;
  }

  const [speedy, ...timeParts] = deliveryOption.split(" ");
  const time = timeParts.join(" ");

  return (
    <Card className="bg-transparent border-none">
      <CardHeader>
        <CardTitle>Delivery Info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex">
          <CardDescription className="w-[100px]">Speedy:</CardDescription>
          <h1>{speedy}</h1>
        </div>
        <div className="flex">
          <CardDescription className="w-[100px]">Time:</CardDescription>
          <h1>{time}</h1>
        </div>
      </CardContent>
    </Card>
  );
};

const ShippingInfo = ({ location }) => {
  return (
    <Card className="bg-transparent border-none">
      <CardHeader>
        <CardTitle>Shipping Info</CardTitle>
      </CardHeader>
      <CardContent className="capitalize flex flex-col gap-3">
        <div className="flex">
          <CardDescription className="w-[100px]">Address:</CardDescription>
          <h1>{location.address}</h1>
        </div>
        <div className="flex">
          <CardDescription className="w-[100px]">City Name:</CardDescription>
          <h1>{location.city}</h1>
        </div>
        <div className="flex">
          <CardDescription className="w-[100px]">State:</CardDescription>
          <h1>{location.state}</h1>
        </div>
        <div className="flex">
          <CardDescription className="w-[100px]">Zip Code:</CardDescription>
          <h1>{location.zipCode}</h1>
        </div>
        <div className="flex">
          <CardDescription className="w-[100px]">Country:</CardDescription>
          <h1>{location.selectedCountry}</h1>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentInfo = ({ paymentMethod }) => {
  console.log(paymentMethod);
  return (
    <Card className="bg-transparent border-none">
      <CardHeader>
        <CardTitle>Payment Info</CardTitle>
      </CardHeader>
      <CardContent className="">
        {paymentMethod === "paypal" ? (
          <Card className="flex p-6 bg-primary-foreground gap-3 items-center">
            <div className="h-10 w-10 border rounded-full items-center justify-center flex bg-secondary">
              <FaPaypal size={24} />
            </div>
            <h1>**** paypal</h1>
            <h1 className="ml-auto">date</h1>
          </Card>
        ) : paymentMethod === "card" ? (
          <Card className="flex p-6 bg-primary-foreground gap-3 items-center">
            <div className="h-10 w-10 border rounded-full items-center justify-center flex bg-secondary">
              <FaCreditCard size={24} />
            </div>
            <h1>**** card</h1>
            <h1 className="ml-auto">date</h1>
          </Card>
        ) : paymentMethod === "cash" ? (
          <Card className="flex p-6 bg-primary-foreground gap-3 items-center">
            <div className="h-10 w-10 border rounded-full items-center justify-center flex bg-secondary">
              <FaMoneyBill size={24} />
            </div>
            <h1>**** cash</h1>
            <h1 className="ml-auto">date</h1>
          </Card>
        ) : null}
      </CardContent>
    </Card>
  );
};
