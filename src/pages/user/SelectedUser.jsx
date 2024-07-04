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
import TableData from "@/components/coustomUi/TableData";
import { formatDate } from "@/utility/dataFromating";

const SelectedUser = () => {
  const data = useLoaderData();
  console.log(data);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const transactionIds = data.transactions;
  console.log(data);

  console.log(filteredProducts);

  const columns = [
    { key: "orderId", header: "Order ID", className: "font-medium" },
    { key: "totalCost", header: "Total Cost", className: "font-medium" },
    {key:'products',header: 'Product Item', className:'font-medium',render: (row)=> row.products.length},
    {
      key: "date",
      header: "Date",
      className: "font-medium",
      render: (row) => formatDate(row.date),
    },
  ];

  console.log(transactionIds, "tranjection");

  return (
    <>
      <SelectedUserCard data={data} />
      <Card className="bg-primary-foreground">
        <CardHeader>
          <CardTitle>Purchesed item</CardTitle>
          <CardDescription>
            {transactionIds.length > 0
              ? `You have ${transactionIds.length} items in your purchase history.`
              : "No purchased items found for the given transactions."}
          </CardDescription>
        </CardHeader>
        {transactionIds === 0 ? (
          <></>
        ) : (
          <CardContent>
            <TableData
              data={transactionIds}
              columns={columns}
              isOptionAvilable={true}
            />
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default SelectedUser;
