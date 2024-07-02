import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoaderData } from "react-router-dom";
import SelectedUserCard from "./userUi/SelectedUserCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios/AxiosIntence";
import TransactionsCard from "./userUi/TransactionsCard";

const SelectedUser = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const transactionIds = data.transactions;

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axiosInstance("/client/oldProduct");
        console.log(result);
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on the transaction IDs
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) =>
        transactionIds.includes(product._id)
      );
      setFilteredProducts(filtered);
    }
  }, [products, transactionIds]);

  console.log(filteredProducts)
  
  return (
    <>
      <SelectedUserCard data={data} />
      <Card className='bg-primary-foreground'>
        <CardHeader>
          <CardTitle>Purchesed item</CardTitle>
          <CardDescription>
            {filteredProducts.length > 0
              ? `You have ${filteredProducts.length} items in your purchase history.`
              : "No purchased items found for the given transactions."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <TransactionsCard key={product._id} data={product} />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

export default SelectedUser;
