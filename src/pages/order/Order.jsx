import axiosInstance from "@/axios/AxiosIntence";
import TableData from "@/components/coustomUi/TableData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import OrderList from "./orderUi/OrderList";
import PaginationComp from "@/components/coustomUi/Pagination";

const Order = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get("/sales", {
          params: {
            page: currentPage,
            limit: pageSize,
            status: filter,
          },
        });
        const data = result.data;
        setData(data);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filter, currentPage]);

  const handleTabChange = (value) => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!data) {
    return <h1>Loading...</h1>;
  }

  console.log(data)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Tabs
          defaultValue="all"
          value={filter}
          onValueChange={handleTabChange}
          className="w-fit"
        >
          <TabsList className="grid w-full grid-cols-4 gap-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Canceled">Canceled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>List of Orders</CardTitle>
            <CardDescription>
              Showing {data.length} out of {totalItems}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <OrderList data={data} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <PaginationComp
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </section>
  );
};

export default Order;
