import axiosInstance from "@/axios/AxiosIntence";
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
import { useNavigate } from "react-router-dom";
import Loading from "@/components/coustomUi/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Order = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);

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
  }, [filter, currentPage, pageSize]);

  const handleTabChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!data) {
    return <Loading />;
  }

  console.log(data.orders, "data");

  const onEdit = (_id) => {
    navigate(`${_id}`);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

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
        <Select onValueChange={handlePageSizeChange}>
          <SelectTrigger className='w-fit'>{pageSize}</SelectTrigger>
          <SelectContent>
            <SelectItem value={5}>5</SelectItem>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={15}>15</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card className="bg-primary-foreground">
        <CardHeader>
          <div>
            <CardTitle>List of Orders</CardTitle>
            <CardDescription>
              Showing {data.orders.length} out of {totalItems}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <OrderList data={data} onEdit={onEdit} />
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
