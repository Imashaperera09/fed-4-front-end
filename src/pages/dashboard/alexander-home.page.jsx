import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Thermometer,
    Wind,
    Zap,
    Filter
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

const consumptionData = [
    { date: "27 July", value: "567kW" },
    { date: "26 July", value: "667kW" },
    { date: "25 July", value: "543kW" },
    { date: "24 July", value: "612kW" },
    { date: "23 July", value: "589kW" },
    { date: "22 July", value: "634kW" },
    { date: "21 July", value: "598kW" },
];

const chartData = [
    { name: "21 July", value: 598 },
    { name: "22 July", value: 634 },
    { name: "23 July", value: 589 },
    { name: "24 July", value: 612 },
    { name: "25 July", value: 543 },
    { name: "26 July", value: 667 },
    { name: "27 July", value: 567 },
];

const pieData = [
    { name: "Used", value: 332 },
    { name: "Remaining", value: 568 },
];

export default function AlexanderHomePage() {
    return (
        <main className="p-6 space-y-6 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Alexander's Home</h1>
                    <p className="text-xs text-gray-500">Welcome back to your Solar Energy Dashboard</p>
                </div>
                <Badge className="bg-green-50 text-green-600 border-green-100 px-2 py-0.5 text-[10px] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Status: Normal
                </Badge>
            </div>

            {/* Top Section: Weather & Real-Time Power */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Weather Card */}
                <Card className="lg:col-span-3 border-none overflow-hidden relative min-h-[180px] shadow-md group">
                    <img
                        src="/assests/solar_panel_bg.png"
                        alt="Solar Panels"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                    <div className="relative p-4 h-full flex flex-col justify-between text-white">
                        <h2 className="text-base font-bold">Weather Conditions</h2>
                        <div className="flex gap-4 mt-2">
                            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 flex-1 border border-white/30">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <Thermometer className="w-3.5 h-3.5 text-white/80" />
                                    <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">Temp</span>
                                </div>
                                <p className="text-xl font-bold">12°C</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 flex-1 border border-white/30">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <Wind className="w-3.5 h-3.5 text-white/80" />
                                    <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">Wind</span>
                                </div>
                                <p className="text-xl font-bold">8.5 m/s</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Real-Time Power Card */}
                <Card className="lg:col-span-2 border-none shadow-md bg-blue-600 text-white overflow-hidden">
                    <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Zap className="w-3.5 h-3.5 fill-white" />
                            <h2 className="text-base font-bold">Real-Time Power</h2>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative py-1">
                            <div className="w-28 h-28">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={52}
                                            startAngle={225}
                                            endAngle={-45}
                                            paddingAngle={0}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            <Cell fill="rgba(255,255,255,0.2)" />
                                            <Cell fill="#fff" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                                <p className="text-xl font-bold">332kw</p>
                                <p className="text-[10px] text-white/70">36.9%</p>
                            </div>
                        </div>

                        <div className="space-y-1.5 mt-2">
                            {[
                                { label: "Avg Wind Speed", value: "7.8 m/s" },
                                { label: "Avg Power", value: "280.4 kW" },
                                { label: "Peak Power", value: "332.1 kW" },
                                { label: "Total Energy", value: "4.0 GWh" },
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between text-[10px]">
                                    <span className="text-white/70">{stat.label}</span>
                                    <span className="font-bold">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Energy Consumption Section */}
            <div className="space-y-3">
                <h2 className="text-lg font-bold text-gray-900">Last 7 Days Energy Consumption</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {consumptionData.map((item, i) => (
                        <Card key={i} className="border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-all text-center p-3 group">
                            <p className="text-[10px] font-medium text-gray-400 mb-1">{item.date}</p>
                            <p className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.value}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Power Usage Chart */}
            <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                    <CardTitle className="text-lg font-bold">Power Usage Chart</CardTitle>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Filter className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                        <select className="text-[10px] font-bold uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer text-gray-400">
                            <option>Per Week</option>
                            <option>Per Day</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent className="h-[220px] pt-0 pb-4 px-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                            <defs>
                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                                dy={8}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                                cursor={{ stroke: '#3b82f6', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorUsage)"
                                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 1.5, stroke: '#fff' }}
                                activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 1.5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </main>
    );
}
