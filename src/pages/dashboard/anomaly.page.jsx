import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TriangleAlert,
    Clock,
    TrendingDown,
    MapPin,
    History,
    Filter,
    CheckCircle2
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
import { useGetAnomaliesForUserQuery, useResolveAnomalyMutation } from "@/lib/redux/query";
import { format } from "date-fns";
import { useState } from "react";

export default function AnomalyPage() {
    const { data: anomalies = [], isLoading } = useGetAnomaliesForUserQuery();
    const [resolveAnomaly] = useResolveAnomalyMutation();
    const [filterStatus, setFilterStatus] = useState("ALL");

    const filteredAnomalies = anomalies.filter(a => {
        if (filterStatus === "ALL") return true;
        return a.status === filterStatus;
    });

    const activeAnomalies = anomalies.filter(a => a.status === "OPEN");
    const resolvedAnomalies = anomalies.filter(a => a.status === "RESOLVED");

    const stats = [
        {
            title: "Active Anomalies",
            value: activeAnomalies.length.toString(),
            icon: <TriangleAlert className="w-5 h-5 text-red-500" />,
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
        {
            title: "Resolved",
            value: resolvedAnomalies.length.toString(),
            icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Total Detected",
            value: anomalies.length.toString(),
            icon: <History className="w-5 h-5 text-blue-500" />,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
    ];

    const typeDistribution = anomalies.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.type);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: curr.type, value: 1 });
        }
        return acc;
    }, []);

    const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"];

    const trendData = anomalies.reduce((acc, curr) => {
        const date = format(new Date(curr.timestamp), "MMM dd");
        const existing = acc.find(item => item.name === date);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: date, value: 1 });
        }
        return acc;
    }, []).slice(-7);

    const handleResolve = async (id) => {
        try {
            await resolveAnomaly(id).unwrap();
        } catch (err) {
            console.error("Failed to resolve anomaly:", err);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading anomalies...</div>;

    return (
        <main className="p-8 space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Anomaly Detection</h1>
                <p className="text-gray-500">Monitor and manage irregular patterns in your solar energy generation.</p>
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
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={typeDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {typeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                        <CardTitle className="text-lg font-semibold">Detection Trends (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
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
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Detected Anomalies</CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant={filterStatus === "ALL" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterStatus("ALL")}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterStatus === "OPEN" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterStatus("OPEN")}
                        >
                            Open
                        </Button>
                        <Button
                            variant={filterStatus === "RESOLVED" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterStatus("RESOLVED")}
                        >
                            Resolved
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {filteredAnomalies.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No anomalies found.</div>
                    ) : (
                        filteredAnomalies.map((anomaly) => (
                            <div key={anomaly._id} className="p-4 rounded-xl border border-gray-100 bg-white/30 hover:bg-white/50 transition-all group">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-gray-900">{anomaly.type.replace(/_/g, ' ')}</h3>
                                            <Badge variant="secondary" className={
                                                anomaly.severity === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    anomaly.severity === 'WARNING' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                            }>
                                                {anomaly.severity}
                                            </Badge>
                                            <Badge variant="outline" className={anomaly.status === 'OPEN' ? 'text-orange-500 border-orange-200' : 'text-green-500 border-green-200'}>
                                                {anomaly.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <History className="w-3 h-3" />
                                                {format(new Date(anomaly.timestamp), "PPP p")}
                                            </div>
                                        </div>
                                    </div>
                                    {anomaly.status === 'OPEN' && (
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                                            onClick={() => handleResolve(anomaly._id)}
                                        >
                                            Resolve
                                        </Button>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">{anomaly.description}</p>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
