import React, { useState } from "react";
import TableData from "@/components/coustomUi/TableData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDate } from "@/utility/dataFromating";
import PaginationComp from "@/components/coustomUi/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductTable = ({ productStat }) => {
  console.log("product stat:", productStat);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataType, setDataType] = useState("daily");
  const pageSize = 5;

  const monthlyData = productStat.monthlyData;
  const dailyData = productStat.dailyData;

  const columns = [
    {
      key: dataType === 'daily' ? 'date' : 'month',
      header: dataType === 'daily' ? 'Date' : 'Month',
      className: "font-medium capitalize",
      render: dataType === 'daily' ? (row) => formatDate(row.date) : undefined,
    },
    {
      key: "totalSales",
      header: "Total Sale",
      className: "font-medium capitalize",
    },
    {
      key: "totalUnits",
      header: "Total Unit",
      className: "font-medium capitalize",
    },
  ];

  const data = dataType === "daily" ? dailyData : monthlyData;
  const totalItems = data.length;
  const dataToDisplay = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectChange = (value) => {
    setDataType(value);
    setCurrentPage(1); // Reset to the first page whenever the data type changes
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Transaction list</CardTitle>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="daily" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <TableData data={dataToDisplay} columns={columns} isOptionAvailable={false}/>
      </CardContent>
      <CardFooter>
        <PaginationComp
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
        />
      </CardFooter>
    </Card>
  );
};

export default ProductTable;
