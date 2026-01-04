import { Card } from "@/components/ui/card";
import { Thermometer, Wind, Cloud, Sun, AlertTriangle, Zap } from "lucide-react";

export default function WeatherConditions({ weatherData, isLoading, isError }) {
  if (isLoading) {
    return (
      <Card className="rounded-xl p-6 h-full animate-pulse bg-gray-100">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (isError || !weatherData) {
    return (
      <Card className="rounded-xl p-6 h-full flex items-center justify-center text-muted-foreground">
        <AlertTriangle className="mr-2" /> Failed to load weather data
      </Card>
    );
  }

  const {
    temperature_2m: temp,
    wind_speed_10m: wind,
    cloud_cover: clouds,
    shortwave_radiation: radiation,
  } = weatherData;

  // Solar impact logic
  let impactMessage = "Optimal conditions for solar production.";
  let impactColor = "text-green-400";
  let ImpactIcon = Sun;

  if (clouds > 70) {
    impactMessage = "High cloud cover may reduce energy output.";
    impactColor = "text-yellow-400";
    ImpactIcon = Cloud;
  } else if (radiation < 100) {
    impactMessage = "Low solar radiation detected.";
    impactColor = "text-orange-400";
    ImpactIcon = Cloud;
  }

  return (
    <Card className="rounded-xl p-0 overflow-hidden shadow-lg border-none group">
      <div
        className="relative h-full w-full min-h-[220px]"
        style={{
          backgroundImage: `url('/assests/solar_panel_bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all group-hover:backdrop-blur-none" />
        <div className="relative p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-400" /> Weather & Solar Context
              </h3>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 ${impactColor}`}>
                <ImpactIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/20">
                <div className="flex items-center gap-2 text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">
                  <Thermometer className="w-3 h-3" /> Temp
                </div>
                <div className="text-xl font-bold text-white">{temp}°C</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/20">
                <div className="flex items-center gap-2 text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">
                  <Wind className="w-3 h-3" /> Wind
                </div>
                <div className="text-xl font-bold text-white">{wind} <span className="text-xs font-normal">km/h</span></div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/20">
                <div className="flex items-center gap-2 text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">
                  <Cloud className="w-3 h-3" /> Clouds
                </div>
                <div className="text-xl font-bold text-white">{clouds}%</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/20">
                <div className="flex items-center gap-2 text-[10px] text-white/70 uppercase font-bold tracking-wider mb-1">
                  <Zap className="w-3 h-3" /> Radiation
                </div>
                <div className="text-xl font-bold text-white">{radiation} <span className="text-xs font-normal">W/m²</span></div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-xs text-white/90 font-medium flex items-center gap-2">
              <AlertTriangle className={`w-3.5 h-3.5 ${impactColor}`} />
              {impactMessage}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
