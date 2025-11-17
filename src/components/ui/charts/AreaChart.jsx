import { TrendingUp } from "lucide-react"
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const description = "A power usage area chart with real data"

export function AreaChart() {
  const { data, error, isLoading } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: "68f27e4735af464f48833c71",
    groupBy: "date",
  });

  const energyData = data?.data || [];

  // Prepare last 7 days data for chart
  const last7Days = energyData.slice(0, 7).reverse(); // Reverse to show chronological order

  const maxValue = Math.max(...last7Days.map(d => d.energy), 100);
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  // Generate SVG path for area chart
  const generatePath = (points, isArea = false) => {
    if (points.length === 0) return "";
    
    let path = `M ${padding} ${chartHeight - padding - (points[0].energy / maxValue) * (chartHeight - 2 * padding)}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = padding + (i / (points.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding - (points[i].energy / maxValue) * (chartHeight - 2 * padding);
      path += ` L ${x} ${y}`;
    }
    
    if (isArea) {
      path += ` L ${chartWidth - padding} ${chartHeight - padding}`;
      path += ` L ${padding} ${chartHeight - padding} Z`;
    }
    
    return path;
  };

  const areaPath = generatePath(last7Days, true);
  const linePath = generatePath(last7Days, false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Power Usage Chart</CardTitle>
          <CardDescription>Loading energy data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded">
            <div className="animate-pulse text-gray-500">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Power Usage Chart</CardTitle>
          <CardDescription>Error loading chart data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded">
            <div className="text-red-500">Failed to load energy data. Please check backend connection.</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 7 Days Energy Consumption</CardTitle>
        <CardDescription>
          Daily energy output from your solar panels
        </CardDescription>
      </CardHeader>
      <CardContent>
        {last7Days.length > 0 ? (
          <div className="space-y-4">
            {/* Energy Usage Summary Cards */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {last7Days.map((record, index) => {
                const date = new Date(record.date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNumber = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                
                return (
                  <div key={index} className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 font-medium">{dayName}</div>
                    <div className="text-xs text-gray-400">{dayNumber}</div>
                    <div className="text-lg font-bold text-gray-900 mt-1">{record.energy}kW</div>
                  </div>
                );
              })}
            </div>

            {/* SVG Chart */}
            <div className="relative">
              <svg 
                width={chartWidth} 
                height={chartHeight} 
                className="w-full border rounded-lg bg-gradient-to-b from-blue-50 to-white"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              >
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                {[0, 25, 50, 75, 100].map((value, i) => (
                  <g key={i}>
                    <text 
                      x={padding - 10} 
                      y={chartHeight - padding - (value / 100) * (chartHeight - 2 * padding) + 5}
                      textAnchor="end" 
                      className="text-xs fill-gray-500"
                    >
                      {Math.round((value / 100) * maxValue)}kW
                    </text>
                    <line 
                      x1={padding} 
                      y1={chartHeight - padding - (value / 100) * (chartHeight - 2 * padding)}
                      x2={chartWidth - padding} 
                      y2={chartHeight - padding - (value / 100) * (chartHeight - 2 * padding)}
                      stroke="#e2e8f0" 
                      strokeWidth="1"
                    />
                  </g>
                ))}
                
                {/* Area fill */}
                <path
                  d={areaPath}
                  fill="url(#gradient)"
                  opacity="0.3"
                />
                
                {/* Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {last7Days.map((point, index) => {
                  const x = padding + (index / (last7Days.length - 1)) * (chartWidth - 2 * padding);
                  const y = chartHeight - padding - (point.energy / maxValue) * (chartHeight - 2 * padding);
                  
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
                
                {/* X-axis labels */}
                {last7Days.map((record, index) => {
                  const x = padding + (index / (last7Days.length - 1)) * (chartWidth - 2 * padding);
                  const date = new Date(record.date);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  
                  return (
                    <text 
                      key={index}
                      x={x} 
                      y={chartHeight - 10}
                      textAnchor="middle" 
                      className="text-xs fill-gray-500"
                    >
                      {dayName}
                    </text>
                  );
                })}
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#3b82f6", stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: "#3b82f6", stopOpacity: 0.1}} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Legend */}
              <div className="flex items-center justify-center mt-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Power Output</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-gray-300 rounded-full bg-white"></div>
                  <span className="text-sm text-gray-600">Daily Data</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded">
            <div className="text-gray-500">No energy data available</div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {last7Days.length > 0 && (
                <>
                  Average: {Math.round(last7Days.reduce((sum, d) => sum + d.energy, 0) / last7Days.length)}kW per week
                  <TrendingUp className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Solar energy production from your home system
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
