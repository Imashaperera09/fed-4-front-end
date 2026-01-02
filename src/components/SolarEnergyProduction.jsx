import { useState, useMemo } from "react";
import EnergyProductionCard from "./EnergyProductionCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format, toDate, subDays } from "date-fns";

const SolarEnergyProduction = ({
  data,
  isLoading,
  isError,
  detectionMethod,
  setDetectionMethod,
  threshold,
  setThreshold,
  minKwh,
  setMinKwh,
}) => {
  const [selectedTab, setSelectedTab] = useState("all");

  // Process data for the last 7 days
  const processedData = useMemo(() => {
    if (!data || isError) return [];

    // Assuming data is already sorted by date descending or we take the first 7
    const last7Days = data.slice(0, 7).map((el) => ({
      ...el,
      dateObj: toDate(el._id.date),
      energy: el.totalEnergyGenerated,
    }));

    // Calculate Window Average (7-day average of the provided data)
    const totalEnergy = last7Days.reduce((acc, curr) => acc + curr.energy, 0);
    const windowAverage = totalEnergy / last7Days.length;

    return last7Days.map((el) => {
      let isAnomaly = false;
      let anomalyReason = "";

      if (detectionMethod === "window-average") {
        const thresholdValue = windowAverage * (threshold / 100);
        if (el.energy < thresholdValue) {
          isAnomaly = true;
          anomalyReason = `${((1 - el.energy / windowAverage) * 100).toFixed(1)}% below window average (${windowAverage.toFixed(1)} kWh)`;
        }
      } else {
        if (el.energy < minKwh) {
          isAnomaly = true;
          anomalyReason = `Below absolute threshold of ${minKwh} kWh`;
        }
      }

      return {
        ...el,
        day: format(el.dateObj, "EEE"),
        dateStr: format(el.dateObj, "MMM d"),
        isAnomaly,
        anomalyReason,
      };
    }).reverse();
  }, [data, isError, detectionMethod, threshold, minKwh]);

  const stats = useMemo(() => {
    if (processedData.length === 0) return null;
    const energies = processedData.map((d) => d.energy);
    const avg = energies.reduce((a, b) => a + b, 0) / energies.length;
    const min = Math.min(...energies);
    const max = Math.max(...energies);
    const anomalies = processedData.filter((d) => d.isAnomaly).length;
    const anomalyPercentage = ((anomalies / processedData.length) * 100).toFixed(1);

    return { avg, min, max, anomalies, anomalyPercentage };
  }, [processedData]);

  const filteredData = processedData.filter((el) => {
    if (selectedTab === "all") return true;
    return el.isAnomaly;
  });

  if (isLoading) {
    return (
      <section className="px-12 py-6 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-100 rounded mb-8"></div>
        <div className="grid grid-cols-7 gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data) return null;

  return (
    <section className="px-12 font-[Inter] py-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Solar Energy Production</h2>
          <p className="text-muted-foreground text-sm">Daily energy output for the past 7 days</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Detection Method:</span>
            <Select value={detectionMethod} onValueChange={setDetectionMethod}>
              <SelectTrigger className="w-[200px] h-9 border-border focus:ring-primary">
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="window-average">Window Average (7-day)</SelectItem>
                <SelectItem value="absolute-threshold">Absolute Threshold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 w-full max-w-[450px] bg-secondary/30 p-2 px-4 rounded-full border border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] whitespace-nowrap">
              {detectionMethod === "window-average"
                ? `Threshold: ${threshold}% below average`
                : `Minimum: ${minKwh} kWh`}
            </span>
            <input
              type="range"
              min={detectionMethod === "window-average" ? "0" : "0"}
              max={detectionMethod === "window-average" ? "100" : "50"}
              step="1"
              value={detectionMethod === "window-average" ? threshold : minKwh}
              onChange={(e) => (detectionMethod === "window-average" ? setThreshold(e.target.value) : setMinKwh(e.target.value))}
              className="flex-1 h-1 bg-secondary rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
            />
          </div>
        </div>
      </div>

      {stats && (
        <div className="mb-6 p-3 bg-secondary/50 border border-border rounded-xl flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="text-primary font-medium">
              Window Average: <span className="font-bold">{stats.avg.toFixed(1)} kWh</span>
            </span>
            <span className="text-primary/70">
              | Range: <span className="font-medium">{stats.min.toFixed(1)} - {stats.max.toFixed(1)} kWh</span>
            </span>
          </div>
          <div className="text-primary font-medium">
            Anomalies: <span className="text-red-600 font-bold">{stats.anomalies}</span> out of 7 days ({stats.anomalyPercentage}%)
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-2">
        <Button
          variant={selectedTab === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTab("all")}
          className="rounded-full px-6"
        >
          All
        </Button>
        <Button
          variant={selectedTab === "anomaly" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTab("anomaly")}
          className="rounded-full px-6"
        >
          Anomaly
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {filteredData.map((el) => (
          <EnergyProductionCard
            key={el._id.date}
            day={el.day}
            date={el.dateStr}
            production={el.energy}
            hasAnomaly={el.isAnomaly}
            anomalyReason={el.anomalyReason}
          />
        ))}
      </div>
    </section>
  );
};

export default SolarEnergyProduction;
