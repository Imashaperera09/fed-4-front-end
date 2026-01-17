
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from "recharts";
import { Zap, Battery, Sun, TrendingUp } from "lucide-react";

import { useGetSolarUnitForUserQuery, useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from "date-fns";
import { useMemo } from "react";

export default function AnalyticsPage() {
    const { data: solarUnit } = useGetSolarUnitForUserQuery();
    const solarUnitId = solarUnit?._id;

    const { data: energyData = [] } = useGetEnergyGenerationRecordsBySolarUnitQuery(
        { id: solarUnitId, groupBy: "date" },
        { skip: !solarUnitId }
    );

    const metrics = useMemo(() => {
        if (!energyData.length) return { total: 0, avg: 0, export: 0, weeklyData: [] };

        const totalProduction = energyData.reduce((acc, curr) => acc + (curr.totalEnergyGenerated || 0), 0);
        const avgDaily = totalProduction / (energyData.length || 1);
        const gridExport = totalProduction * 0.2; // Assuming 20% export

        // Process last 30 days
        const end = new Date();
        const start = subDays(end, 29);
        const days = eachDayOfInterval({ start, end });

        const weeklyData = days.map(day => {
            const dateStr = format(day, "yyyy-MM-dd");
            // API returns _id: { date: "YYYY-MM-DD" }
            const dayData = energyData.find(d => d._id?.date === dateStr);
            const production = dayData ? dayData.totalEnergyGenerated : 0;
            return {
                name: format(day, "MMM dd"),
                production: production,
                consumption: production * 0.6 // Simulated consumption
            };
        });

        return {
            total: totalProduction,
            avg: avgDaily,
            export: gridExport,
            weeklyData
        };
    }, [energyData]);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-500">Deep dive into your energy production and consumption metrics.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Production</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.total.toLocaleString()} kWh</div>
                        <p className="text-xs text-muted-foreground">Lifetime generation</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Daily Output</CardTitle>
                        <Sun className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.avg.toFixed(1)} kWh</div>
                        <p className="text-xs text-muted-foreground">Based on available data</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Grid Export</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.export.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh</div>
                        <p className="text-xs text-muted-foreground">Estimated 20% of production</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
                        <Battery className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98%</div>
                        <p className="text-xs text-muted-foreground">Fully charged</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Overview (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={metrics.weeklyData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    interval={2} // Show every 3rd label to avoid clutter
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}kWh`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="production" name="Production" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="consumption" name="Consumption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Production Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={metrics.weeklyData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    interval={2}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}kWh`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="production"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#f59e0b" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
