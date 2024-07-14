import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import LineChartTool from "./LineChartTool";

const LineChartComp = ({ data, dataType,keyType }) => {
  const chartData = data.map((item) => {
    if (dataType === "monthly") {
      return {
        name: item.month,
        totalSales: item.totalSales,
        totalUnits: item.totalUnits,
      };
    } else if (dataType === "daily") {
      return {
        name: item.date,
        totalSales: item.totalSales,
        totalUnits: item.totalUnits,
      };
    }
    return item;
  });

  return (
    <ResponsiveContainer width={100} height={40}>
      <LineChart data={chartData}>
              <XAxis dataKey="name" hide />
        <Tooltip content={<LineChartTool />} cursor={false} />
        <Line type="monotone" dataKey={keyType} stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;
