import LineChartComp from "@/components/coustomUi/LineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculatePercentageIncrease } from "@/utility/calculatePercentageIncrease";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const ProductSoldData = ({ overAllStatus }) => {
  const { change, isIncrease } = calculatePercentageIncrease(
    overAllStatus.dailyData
  );

  return (
    <Card className="col-span-6 lg:col-span-2 h-40 bg-primary-foreground flex justify-between items-center">
      <CardHeader className="col-span-1 flex gap-1">
        <CardDescription>Product Sold</CardDescription>
        <CardTitle className='text-3xl'>{overAllStatus.yearlyTotalSoldUnits}</CardTitle>
        <span className="flex text-sm gap-1">
          <div className={`${isIncrease?'bg-green-600/20 text-green-200':  'bg-red-600/20 text-red-200'} w-5 h-5 rounded-full flex justify-center items-center`}>

            {isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          </div>
          {isIncrease ? "+" : "-"}
          {change}% {isIncrease ? "increase" : "decrease"} from yesterday
        </span>
      </CardHeader>
      <CardContent className="col-span-1 p-6">
              <LineChartComp data={overAllStatus.dailyData} dataType="daily" keyType='totalUnits' />
      </CardContent>
    </Card>
  );
};

export default ProductSoldData;
