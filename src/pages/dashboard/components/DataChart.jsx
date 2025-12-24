import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Dot } from "recharts";
import { format, toDate } from "date-fns";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataChart = ({ data, isLoading, isError, detectionMethod, threshold, minKwh }) => {
  const [selectedRange, setSelectedRange] = useState("7");

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const processedData = useMemo(() => {
    if (!data || isError) return [];

    const rangeData = data.slice(0, parseInt(selectedRange));

    // Calculate Window Average for the last 7 days (as a baseline)
    const last7Days = data.slice(0, 7);
    const totalEnergy7 = last7Days.reduce((acc, curr) => acc + curr.totalEnergyGenerated, 0);
    const windowAverage7 = totalEnergy7 / last7Days.length;

    return rangeData.map((el) => {
      const energy = el.totalEnergyGenerated;
      let isAnomaly = false;

      if (detectionMethod === "window-average") {
        const thresholdValue = windowAverage7 * (threshold / 100);
        if (energy < thresholdValue) isAnomaly = true;
      } else {
        if (energy < minKwh) isAnomaly = true;
      }

      return {
        date: format(toDate(el._id.date), "MMM d"),
        energy: energy,
        isAnomaly: isAnomaly,
      };
    }).reverse(); // Reverse to show chronological order
  }, [data, isError, selectedRange, detectionMethod, threshold, minKwh]);

  if (isLoading) {
    return (
      <Card className="rounded-2xl p-6 border-none shadow-lg bg-white/50 backdrop-blur-sm animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
        <div className="h-[300px] bg-gray-100 rounded-xl"></div>
      </Card>
    );
  }

  if (!data || isError) return null;

  const chartConfig = {
    energy: {
      label: "Energy (kWh)",
      color: "hsl(var(--chart-1))",
    },
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.isAnomaly) {
      return (
        <circle cx={cx} cy={cy} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} />
      );
    }
    return null;
  };

  return (
    <Card className="rounded-2xl p-6 border-none shadow-lg bg-white/50 backdrop-blur-sm overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Energy Production Chart</h2>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Performance Overview</p>
        </div>
        <Select value={selectedRange} onValueChange={handleRangeChange}>
          <SelectTrigger className="w-[140px] h-9 border-gray-200 rounded-xl focus:ring-blue-500">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[350px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={processedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Area
              type="monotone"
              dataKey="energy"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEnergy)"
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      <div className="mt-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          Normal Production
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          Anomaly Detected
        </div>
      </div>
    </Card>
  );
};

export default DataChart;
