import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductDetails from "./orderUi/ProductDetails";
import OrderDelivery from "./orderUi/OrderDelievery";
import DetailsPanel from "./orderUi/DetailsPanel";
import { formatDate } from "@/utility/dataFromating";
import axiosInstance from "@/axios/AxiosIntence";

const SingleOrder = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [orderStat, setOrderStat] = useState();

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

  useEffect(() => {
    switch (data.data.orderStat) {
      case "Pending":
        setOrderStat(2);
        break;
      case "Completed":
        setOrderStat(4);
        break;
      default:
        setOrderStat(1);
    }
  }, [orderStat]);

  //handle edit product stat

  const handleEdit = (_id, status) => {
    console.log(_id);

    const load = {
      orderId: _id,
      orderStat: status || "Completed",
    };

    const response = async () => {
      try {
        const res = await axiosInstance.patch(`/sales/${_id}`, load);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  };

  return (
    <>
        <div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 align-middle">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          size="icon"
          variant="outline"
          className="self-start md:self-auto"
        >
          <ChevronLeft />
        </Button>
        <CardTitle className="flex flex-col w-full md:w-auto">
          <h1 className="text-lg md:text-xl">Order ID #{data.data._id}</h1>
          <CardDescription className="text-sm md:text-base">
            {formatDate(data.data.createdAt)}
          </CardDescription>
        </CardTitle>
        <Badge
          className={`${getStatusClass(
            data.data.orderStat
          )} w-fit px-2 py-1 rounded-lg text-sm md:text-base self-start md:self-auto`}
        >
          {data.data.orderStat}
        </Badge>
      </div>
    </div>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-7 mt-6">
        <div className="col-span-7 md:col-span-5 flex flex-col gap-4">
          <ProductDetails productData={data.data} />
          <OrderDelivery currentStep={orderStat} />
        </div>
        <DetailsPanel
          cartData={data.data}
          handleEdit={handleEdit}
        />
      </section>
    </>
  );
};

export default SingleOrder;
