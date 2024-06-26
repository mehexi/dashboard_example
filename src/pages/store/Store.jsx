import axiosInstance from "@/axios/AxiosIntence";
import { useEffect, useState } from "react";
import ProductCard from "./storeUi/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Store = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get("/client/products", {
          params: {
            status: "active",
          },
        });
        console.log(response.data);
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <section className="mx-auto grid w-[80rem]  flex-1 auto-rows-max gap-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Shop</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4">
          {product.map((item) => (
            <ProductCard data={item} key={item._id} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default Store;
