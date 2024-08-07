import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const TotalBalanceData = ({ overAllStatus }) => {
  return (
    <Card className="col-span-6 lg:col-span-2 h-40 bg-primary-foreground flex justify-between items-center">
      <CardHeader className="col-span-1 flex gap-1">
        <CardDescription>Total Balance</CardDescription>
        <CardTitle className="text-3xl max-sm:text-xl">
        <span>${overAllStatus.yearlySalesTotal.toLocaleString()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <Button className="w-fit truncate">WithDraw</Button>
      </CardContent>
    </Card>
  );
};

export default TotalBalanceData;
