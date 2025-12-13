import { Card } from "@/components/ui/card";

export default function RealTimePower({ power = 332, avgWind = 7.8, avgPower = 2804.8, peakPower = 332.1, totalEnergy = 4.0 }) {
  return (
    <Card className="rounded-xl p-6 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white">
      <h3 className="text-lg font-semibold mb-4">Real-Time Power</h3>
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Circle meter */}
        <div className="flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 36 36" className="h-full w-full">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl font-bold">{power}kW</div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Avg Wind Speed (10 min)</span><span>{avgWind} m/s</span></div>
          <div className="flex justify-between"><span>Avg Power (10 min)</span><span>{avgPower} kW</span></div>
          <div className="flex justify-between"><span>Peak Power (10 min)</span><span>{peakPower} kW</span></div>
          <div className="flex justify-between"><span>Total Energy</span><span>{totalEnergy} GWh</span></div>
        </div>
      </div>
    </Card>
  );
}
