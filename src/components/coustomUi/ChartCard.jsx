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

  return (
    <Card className="w-full max-w-full col-span-5">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <CardDescription>Overview</CardDescription>
            <CardTitle className="text-2xl sm:text-4xl">{totalSales}</CardTitle>
            <p>Total Units Sold: {totalUnits}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select onValueChange={handleRangeChange} value={selectedRange}>
              <SelectTrigger className="w-full sm:w-40">
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
      <CardContent className="p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={400}>
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
