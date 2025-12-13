import { Card } from "@/components/ui/card";

export default function WeatherConditions({ temperature = 12, windSpeed = 8.5, backgroundUrl = "/assests/images/weather1.jpg" }) {
  return (
    <Card className="rounded-xl p-0 overflow-hidden">
      <div
        className="relative h-full w-full"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-white/05" />
        <div className="relative p-6">
          <div className="rounded-xl bg-white/20 backdrop-blur-sm p-3 mb-4 border border-white/40 inline-block">
            <h3 className="text-lg font-semibold text-white">Weather Conditions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/20 backdrop-blur-sm p-4 border border-white/40">
              <div className="flex items-center gap-2 text-sm text-white/80">
                {/* temperature icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
                  <path d="M14 14.5V5a3 3 0 10-6 0v9.5a4.5 4.5 0 106 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="11" cy="17.5" r="2.5" fill="currentColor" opacity="0.6" />
                </svg>
                <span>Temperature</span>
              </div>
              <div className="text-2xl font-bold text-white">{temperature}°C</div>
            </div>
            <div className="rounded-xl bg-white/20 backdrop-blur-sm p-4 border border-white/40">
              <div className="flex items-center gap-2 text-sm text-white/80">
                {/* wind icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
                  <path d="M4 8h8a3 3 0 100-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 12h12a3 3 0 110 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M6 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Wind Speed</span>
              </div>
              <div className="text-2xl font-bold text-white">{windSpeed} m/s</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
