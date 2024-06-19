import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CoustomToolTip from "./CoustomToolTip";
import { DatePickerWithRange } from "../ui/DatePicker";

const ChartCard = ({ data, timeRange = "monthly", onToggle }) => {
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [dateRange, setDateRange] = useState([
    new Date("2021-01-02"),
    new Date("2021-11-17"),
  ]);

  const stat = data.data.stat[0];
  const monthlyData = stat.monthlyData;
  const dailyData = stat.dailyData;

  const handleRangeChange = (value) => {
    setSelectedRange(value);
    onToggle(value);
  };

  const handleDateRangeChange = (range) => {
    const { from, to } = range;
    setDateRange([from, to]);
  };

  const stripTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const filteredDailyData = dailyData.filter((item) => {
    const date = stripTime(new Date(item.date));
    const [startDate, endDate] = dateRange.map((d) => d && stripTime(d));
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });

  const totalSales = filteredDailyData.reduce(
    (acc, item) => acc + item.totalSales,
    0
  );
  const totalUnits = filteredDailyData.reduce(
    (acc, item) => acc + item.totalUnits,
    0
  );

  const chartData =
    selectedRange === "monthly" ? monthlyData : filteredDailyData;

  // Debug logs
  console.log("Date Range:", dateRange);
  console.log("Filtered Daily Data:", filteredDailyData);
  console.log("Total Sales:", totalSales);
  console.log("Total Units:", totalUnits);

  return (
    <Card className="col-span-5">
      <CardHeader className="">
        <div className="flex justify-between">
          <div>
            <CardDescription>Overview</CardDescription>
            <CardTitle className="text-4xl">{totalSales}</CardTitle>
            <p>Total Units Sold: {totalUnits}</p>
          </div>
          <div className="flex justify-between gap-2">
            <Select onValueChange={handleRangeChange} value={selectedRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange onChange={handleDateRangeChange} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey={selectedRange === "monthly" ? "month" : "date"} />
            <YAxis />
            <Tooltip content={<CoustomToolTip />} />
            <Bar
              dataKey="totalSales"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
