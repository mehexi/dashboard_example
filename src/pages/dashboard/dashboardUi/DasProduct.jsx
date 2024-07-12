import axiosInstance from "@/axios/AxiosIntence";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";

const DasProduct = ({ product }) => {
  return (
    <Card className="col-span-6 lg:col-span-2 overflow-hidden">
      <ProductCarousel data={product} />
    </Card>
  );
};

export default DasProduct;
