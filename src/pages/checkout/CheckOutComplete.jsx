import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useNavigate } from "react-router-dom";

const CheckOutComplete = ({ orderDetails, shipping }) => {

  const navigate = useNavigate()

  return (
    <DialogContent className="flex items-center justify-center max-w-[80rem]">
      <div className="p-8 rounded-lg   text-center">
        <h1 className="text-2xl font-bold mb-6">
          Thank you for your purchase!
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src="/40125099_8789637.svg"
            alt="checkout complete"
            draggable={false}
            className=" w-auto h-96 bg-primary-foreground  rounded-full aspect-square object-cover"
          />
        </div>
        <p className="mb-2">Thanks for placing order</p>
        <p className="mb-6">{orderDetails._id}</p>
        <p className="mb-6 max-w-[500px] text-center">
          We will send you a notification within {shipping.time} days when it
          ships. If you have any question or queries then fell to get in contact
          us.
        </p>
        <p className="mb-6">All the best,</p>
        <Separator/>
        <div className="flex justify-center space-x-4 mt-6">
          <Button variant='outline' onClick={()=>navigate('/')} >Continue shopping</Button>
          <Button>Download as PDF</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default CheckOutComplete;
