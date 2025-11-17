import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: "68f27e4735af464f48833c71",
    groupBy: "date",
  });

  // Transform external API data to the format expected by the frontend
  const transformedData = data ? data.map(item => ({
    date: item._id.date,
    energy: Math.round(item.totalEnergyGenerated / 1000) // Convert to kW and round
  })) : [];

  // Use transformed API data
  const energyData = transformedData;
  
  return (
    <main className="px-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Alice's House</h1>
      <p className="text-gray-600 mb-8">Welcome back to your Solar Energy Production Dashboard</p>
      
      <div className="space-y-8">
        {/* First: 7 Days Energy Consumption Cards */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl">Last 7 Days Energy Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading energy data...</p>
              </div>
            )}
            {isError && (
              <div className="text-center py-4 mb-4">
                <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  ❌ Error loading data: Please check if the backend server is running.
                </p>
              </div>
            )}
            <div className="grid grid-cols-7 gap-3">
              {energyData.length > 0 ? (
                energyData.slice(0, 7).map((record, index) => {
                  const date = new Date(record.date);
                  const formattedDate = date.toLocaleDateString('en-US', { 
                    day: 'numeric',
                    month: 'long'
                  });
                  
                  return (
                    <div key={index} className="text-center bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{record.energy}kW</div>
                      <div className="text-xs text-gray-500 font-medium">{formattedDate}</div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-7 text-center py-8">
                  <p className="text-gray-500">No energy data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Second: Power Usage Chart */}
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Power Usage Chart</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">📊</span>
              <select className="text-sm border rounded px-2 py-1 bg-white">
                <option>Per Week</option>
                <option>Per Month</option>
                <option>Per Year</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded">
                <div className="animate-pulse text-gray-500">Loading chart data...</div>
              </div>
            )}
            {isError && (
              <div className="text-center py-4 mb-4">
                <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  ❌ Failed to load chart data: Please check backend connection.
                </p>
              </div>
            )}
            {energyData.length > 0 && (
              <div className="space-y-4">
                {/* SVG Chart */}
                <div className="relative">
                  <svg 
                    width="100%" 
                    height="300" 
                    className="border rounded-lg bg-gradient-to-b from-blue-50 to-white"
                    viewBox="0 0 600 300"
                  >
                    {/* Background grid */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                      </pattern>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: "#3b82f6", stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: "#3b82f6", stopOpacity: 0.1}} />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Y-axis labels */}
                    {[0, 200, 400, 600, 800].map((value, i) => (
                      <g key={i}>
                        <text 
                          x={30} 
                          y={270 - (value / 800) * 220 + 5}
                          textAnchor="end" 
                          className="text-xs fill-gray-500"
                        >
                          {value}kW
                        </text>
                        <line 
                          x1={40} 
                          y1={270 - (value / 800) * 220}
                          x2={560} 
                          y2={270 - (value / 800) * 220}
                          stroke="#e2e8f0" 
                          strokeWidth="1"
                        />
                      </g>
                    ))}
                    
                    {/* Chart area and line */}
                    {(() => {
                      const chartData = energyData.slice(0, 7).map(d => d.energy);
                      const maxValue = 800;
                      
                      // Generate area path
                      let areaPath = `M 40 ${270 - (chartData[0] / maxValue) * 220}`;
                      let linePath = `M 40 ${270 - (chartData[0] / maxValue) * 220}`;
                      
                      for (let i = 1; i < chartData.length; i++) {
                        const x = 40 + (i / (chartData.length - 1)) * 520;
                        const y = 270 - (chartData[i] / maxValue) * 220;
                        areaPath += ` L ${x} ${y}`;
                        linePath += ` L ${x} ${y}`;
                      }
                      
                      areaPath += ` L 560 270 L 40 270 Z`;
                      
                      return (
                        <>
                          <path d={areaPath} fill="url(#chartGradient)" opacity="0.6" />
                          <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          
                          {/* Data points */}
                          {chartData.map((value, index) => {
                            const x = 40 + (index / (chartData.length - 1)) * 520;
                            const y = 270 - (value / maxValue) * 220;
                            
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
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                            <text 
                              key={index}
                              x={40 + (index / 6) * 520} 
                              y={290}
                              textAnchor="middle" 
                              className="text-xs fill-gray-500"
                            >
                              {day}
                            </text>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                  
                  {/* Chart Legend */}
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
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
