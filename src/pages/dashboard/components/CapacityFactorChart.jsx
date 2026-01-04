import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Zap, Info } from "lucide-react";

export default function CapacityFactorChart({ data, isLoading, isError }) {
    if (isLoading) {
        return (
            <Card className="h-[300px] animate-pulse">
                <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </CardHeader>
                <CardContent className="h-full bg-gray-100 rounded-b-xl"></CardContent>
            </Card>
        );
    }

    if (isError || !data) {
        return (
            <Card className="h-[300px] flex items-center justify-center text-muted-foreground">
                Failed to load capacity factor data
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-500" /> Capacity Factor
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">Efficiency relative to rated capacity</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                    <Info className="w-4 h-4 text-blue-500" />
                </div>
            </CardHeader>
            <CardContent className="h-[220px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                            tickFormatter={(str) => {
                                const date = new Date(str);
                                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                            unit="%"
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                            cursor={{ fill: '#f8fafc' }}
                            formatter={(value) => [`${value}%`, 'Capacity Factor']}
                        />
                        <Bar dataKey="capacityFactor" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.capacityFactor > 20 ? '#3b82f6' : '#94a3b8'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
            <div className="px-6 pb-4">
                <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                    <p className="text-[10px] text-blue-700 font-medium">
                        <strong>Tip:</strong> A higher capacity factor indicates better utilization of your solar panels. Values typically range from 15% to 25% for solar installations.
                    </p>
                </div>
            </div>
        </Card>
    );
}
