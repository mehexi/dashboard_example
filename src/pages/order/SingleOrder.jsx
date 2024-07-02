import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductDetails from "./orderUi/ProductDetails";
import OrderDelievery from "./orderUi/OrderDelievery";
import OrderDelivery from "./orderUi/OrderDelievery";

const SingleOrder = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [orderStat, setOrderStat] = useState(data.data.orderStat);
  console.log(data);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "Completed":
        return "bg-green-500/20 text-green-500";
      case "Canceled":
        return "bg-red-500/20 text-red-500";
      default:
        return "";
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-3 align-middle">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <CardTitle>Order ID #{data.data._id} </CardTitle>
          <h1
            className={`${getStatusClass(
              data.data.orderStat
            )} w-fit px-2 py-1 rounded-lg`}
          >
            {data.data.orderStat}
          </h1>
        </div>
      </div>
      <section className="grid gap-4 grid-cols-7 mt-6">
        <div className="col-span-5 flex flex-col gap-4">
          <ProductDetails productData={data.data} />
          <OrderDelivery/>
        </div>
        <Card className="col-span-2">
          <CardHeader></CardHeader>
        </Card>
      </section>
    </>
  );
};

export default SingleOrder;
