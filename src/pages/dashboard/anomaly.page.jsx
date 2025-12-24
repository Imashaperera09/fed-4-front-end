import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TriangleAlert,
    Clock,
    TrendingDown,
    MapPin,
    History,
    Filter
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const stats = [
    {
        title: "Active Anomalies",
        value: "3",
        icon: <TriangleAlert className="w-5 h-5 text-red-500" />,
        color: "text-red-600",
        bgColor: "bg-red-50",
    },
    {
        title: "Under Review",
        value: "1",
        icon: <Clock className="w-5 h-5 text-yellow-500" />,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
    },
    {
        title: "Resolved Today",
        value: "5",
        icon: <TrendingDown className="w-5 h-5 text-green-500" />,
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
];

const pieData = [
    { name: "Mechanical", value: 15, color: "#3b82f6" },
    { name: "Power Output", value: 28, color: "#f59e0b" },
    { name: "Temperature", value: 22, color: "#10b981" },
    { name: "Vibration", value: 35, color: "#ef4444" },
];

const lineData = [
    { name: "Mon", value: 8 },
    { name: "Tue", value: 12 },
    { name: "Wed", value: 6 },
    { name: "Thu", value: 15 },
    { name: "Fri", value: 9 },
    { name: "Sat", value: 4 },
    { name: "Sun", value: 3 },
];

const recentAnomalies = [
    {
        id: 1,
        title: "Unusual Vibration Pattern",
        severity: "High",
        status: "Active",
        location: "Turbine #27, Sector B",
        time: "2 hours ago",
        description: "Detected abnormal vibration levels during peak wind conditions",
    },
    {
        id: 2,
        title: "Power Output Deviation",
        severity: "Medium",
        status: "Under Review",
        location: "Turbine #14, Sector A",
        time: "5 hours ago",
        description: "Energy generation dropped 15% below expected output for current conditions",
    },
];

export default function AnomalyPage() {
    return (
        <main className="p-8 space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Anomaly Detection</h1>
                <p className="text-gray-500">Monitor and investigate unusual patterns in wind turbine operations.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-all">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                {stat.icon}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Anomaly Types Distribution</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </Button>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                    formatter={(value) => <span className="text-xs font-medium text-gray-600">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Area Chart */}
                <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Anomaly Trends</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <TrendingDown className="h-4 w-4 text-gray-400" />
                            </Button>
                            <select className="text-xs font-bold uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer text-gray-400">
                                <option>Weekly</option>
                                <option>Daily</option>
                            </select>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lineData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
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
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Anomalies List */}
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Anomalies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentAnomalies.map((anomaly) => (
                        <div key={anomaly.id} className="p-4 rounded-xl border border-gray-100 bg-white/30 hover:bg-white/50 transition-all group">
                            <div className="flex items-start justify-between mb-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-gray-900">{anomaly.title}</h3>
                                        <Badge variant="secondary" className={anomaly.severity === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}>
                                            {anomaly.severity}
                                        </Badge>
                                        <Badge variant="outline" className="text-gray-500 border-gray-200">
                                            {anomaly.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {anomaly.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <History className="w-3 h-3" />
                                            {anomaly.time}
                                        </div>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                    Investigate
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600">{anomaly.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </main>
    );
}
