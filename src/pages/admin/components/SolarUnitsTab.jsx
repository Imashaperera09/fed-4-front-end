import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Zap, Search, Plus, Gauge, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: solarUnits, isLoading: isLoadingSolarUnits, isError: isErrorSolarUnits, error: errorSolarUnits } = useGetSolarUnitsQuery();

  if (isLoadingSolarUnits) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isErrorSolarUnits) {
    const errorMessage = errorSolarUnits?.data?.message || errorSolarUnits?.error || JSON.stringify(errorSolarUnits);
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Top Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search solar units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/50 transition-all"
              disabled
            />
          </div>
          <Button asChild className="w-full md:w-auto shadow-lg hover:shadow-primary/20 transition-all">
            <Link to="/admin/solar-units/create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Unit
            </Link>
          </Button>
        </div>

        {/* Error Message */}
        <div className="p-8 text-center bg-destructive/10 rounded-xl border border-destructive/20 animate-in fade-in duration-500">
          <div className="max-w-md mx-auto space-y-3">
            <p className="text-destructive font-bold text-lg">Connection Error</p>
            <p className="text-destructive/80 text-sm font-mono bg-background/50 p-3 rounded border border-destructive/20 break-all">
              {errorMessage}
            </p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4 border-destructive/20 text-destructive hover:bg-destructive/10">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!solarUnits) {
    return (
      <div className="p-12 text-center bg-muted/50 rounded-xl border border-dashed border-border">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const filteredUnits = searchTerm !== "" ? solarUnits.filter(
    (unit) =>
      unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.capacity.toString().includes(searchTerm) ||
      unit.status.toLowerCase().includes(searchTerm.toLowerCase())
  ) : solarUnits;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search solar units..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/50 transition-all"
          />
        </div>
        <Button asChild className="w-full md:w-auto shadow-lg hover:shadow-primary/20 transition-all">
          <Link to="/admin/solar-units/create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Unit
          </Link>
        </Button>
      </div>

      {/* Units Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit, index) => (
          <Card
            key={unit._id}
            className="group relative border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm overflow-hidden cursor-pointer animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{unit.serialNumber}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Serial Number</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${unit.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {unit.status}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Gauge className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Capacity</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {(unit.capacity / 1000).toFixed(1)} <span className="text-sm font-medium text-muted-foreground">kW</span>
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-muted/50 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-xl transition-all pointer-events-none" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUnits.length === 0 && (
        <Card className="border-none shadow-sm bg-muted/30 p-16 text-center animate-in zoom-in-95 duration-500">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">No units found</h3>
              <p className="text-sm text-muted-foreground">
                We couldn't find any solar units matching "{searchTerm}"
              </p>
            </div>
            <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
              Clear Search
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
