import React, { useState } from "react";
import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LineChartTool from "@/components/coustomUi/LineChartTool";

const ProductYearlyChart = ({ overAllStatus }) => {
  const [view, setView] = useState("daily");

  const handleViewChange = (value) => {
    setView(value);
  };

  const chartData =
    view === "daily"
      ? overAllStatus.dailyData.map((day) => ({
          date: day.date,
          totalSales: day.totalSales,
          totalUnits: day.totalUnits,
        }))
      : overAllStatus.monthlyData.map((month) => ({
          date: month.date,
          totalSales: month.totalSales,
          totalUnits: month.totalUnits,
        }));

  return (
    <Card className="col-span-6 md:col-span-4 max-h-[400px] p-6 rounded-lg bg-primary-foreground flex flex-col justify-between">
      <CardHeader className="p-0 flex justify-between md:flex-row">
        <div className="flex flex-col gap-2">
          <CardDescription className="text-sm capitalize">
            {view} Sales and Units
          </CardDescription>
          <Select onValueChange={handleViewChange}>
            <SelectTrigger>
              <SelectValue placeholder="Daily" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-3">
            <CardDescription className="flex items-center gap-2">
              <div className="w-3 h-3 border rounded-full bg-[#8884d8]"></div>{" "}
              Yearly Sold
            </CardDescription>
            <CardTitle>${chartData[0]?.totalSales}</CardTitle>
          </div>
          <div className="flex flex-col gap-3">
            <CardDescription className="flex items-center gap-2">
              <div className="w-3 h-3 border rounded-full bg-[#FCA900]"></div>{" "}
              Yearly Unit
            </CardDescription>
            <CardTitle>{chartData[0]?.totalUnits}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <div className="rounded-lg mt-9 flex-grow min-h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} className="text-xs text-[#94a3b8] p-2">
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCA900" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FCA900" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#2a2d34"
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<LineChartTool/>}/>
            <Area
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              fillOpacity={4}
              strokeWidth={3}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="totalUnits"
              stroke="#FCA900"
              fillOpacity={4}
              strokeWidth={3}
              fill="url(#colorUv)"
            />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#8884d8"
              strokeWidth={10} // Adjusted stroke width
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalUnits"
              stroke="#FCA900"
              strokeWidth={10} // Adjusted stroke width
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProductYearlyChart;
