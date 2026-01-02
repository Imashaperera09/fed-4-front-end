import imgWindTurbine from "./wind-turbine.png";
import { Sailboat, Shield, Triangle, Wind } from "lucide-react";
import EnergyProductionCard from "../EnergyProductionCard";
import { useState } from "react";

export default function HeroSection() {
  // Energy production data
  const energyProductionData = [
    { day: "Mon", date: "Aug 18", production: "34.1", hasAnomaly: false },
    { day: "Tue", date: "Aug 19", production: "3.2", hasAnomaly: true },
    { day: "Wed", date: "Aug 20", production: "44.7", hasAnomaly: false },
    { day: "Thu", date: "Aug 21", production: "21.9", hasAnomaly: false },
    { day: "Fri", date: "Aug 22", production: "0", hasAnomaly: true },
    { day: "Sat", date: "Aug 23", production: "43", hasAnomaly: false },
    { day: "Sun", date: "Aug 24", production: "26.8", hasAnomaly: false },
  ];

  // State for filter tabs
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter data based on selected tab
  const filteredData = energyProductionData.filter((el) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
    return false;
  });
  return (
    <div className="bg-background px-12 font-[Inter] transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center justify-between py-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary sm:h-12 sm:w-12">
            <Wind className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-foreground sm:text-left sm:text-sm">
            Solar Energy
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent sm:h-12 sm:w-12">
            <Sailboat className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-foreground sm:text-left sm:text-sm">
            Home Dashboard
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary sm:h-12 sm:w-12">
            <Triangle className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-foreground sm:text-left sm:text-sm">
            Real-Time Monitoring
          </span>
        </div>

        <div className="hidden flex-col items-center gap-2 sm:flex sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent sm:h-12 sm:w-12">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-foreground sm:text-left sm:text-sm">
            Anomaly Detection
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 py-4 md:px-6 md:py-16">
        <div>
          {/* Hero Section */}
          <div className="mb-12 md:mb-24">
            <h1 className="text-4xl leading-tight font-bold text-foreground sm:text-5xl sm:leading-20 md:text-7xl md:leading-32 xl:text-8xl">
              <div>Monitor Your Home's</div>
              <div className="flex flex-row items-center gap-4 sm:gap-8">
                <span>Solar Energy</span>
                <div className="relative">
                  <img
                    src={imgWindTurbine}
                    alt="Solar panels on a house roof"
                    className="max-h-8 rounded-xl object-cover sm:max-h-16 md:max-h-20 md:rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-8">
                <span>with Real-Time</span>
              </div>
              <div className="flex flex-row items-center gap-4 sm:gap-8">
                <span>Insights & Alerts</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <Triangle className="h-5 w-5 fill-current text-primary-foreground sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </div>
              </div>
            </h1>

            {/* Solar Energy Production Section */}
            <div className="mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Solar Energy Production</h2>
                <p className="text-muted-foreground">Daily energy output for the past 7 days</p>
              </div>

              {/* Filter Buttons */}
              <div className="mt-4 flex items-center gap-x-4">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  onClick={() => setSelectedTab("all")}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "anomaly"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  onClick={() => setSelectedTab("anomaly")}
                >
                  Anomaly
                </button>
              </div>

              {/* Energy Production Cards */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {filteredData.map((el) => (
                  <EnergyProductionCard
                    key={el.date}
                    day={el.day}
                    date={el.date}
                    production={el.production}
                    hasAnomaly={el.hasAnomaly}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Section - Wind Turbine and Solar Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side - Wind Turbine Image */}
            <div className="relative">
              <img
                src="/assests/images/wind-turbine-2.png"
                alt="Wind turbines with solar panels"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Right Side - Solar Energy Information Card */}
            <div className="bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-emerald-500/20 border border-border rounded-2xl p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Your Solar Energy Generation</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This month, your solar panels generated 2,540 kWh of clean energy,
                  helping you save on electricity bills and reduce your carbon
                  footprint. Track your energy production trends and see how
                  much power you contributed back to the grid.
                </p>
              </div>
            </div>
          </div>

          {/* Third Section  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side  */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-border rounded-2xl p-8">
              <div className="mb-6">
                <div className="mb-4">
                  <div className="inline-block bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Problem
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly alerts.
                </h2>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Panel shading detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Output drop alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Inverter issue monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Dirt & maintenance alerts</span>
                </div>
              </div>
            </div>

            {/* Right Side- Wind Turbine 3 Image */}
            <div className="relative">
              <img
                src="/assests/images/wind-turbine-3.png"
                alt="Wind turbine with orange sky"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Fourth Section  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side */}
            <div className="relative">
              <img
                src="/assests/images/wind-turbine-2.png"
                alt="Wind turbines with solar panels"
                className="w-full h-[450px] object-cover rounded-2xl"
              />
            </div>

            {/* Right Side */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <div className="mb-4">
                  <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Solution
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">
                  The Solar Home Dashboard empowers you to monitor your solar panels, receive instant alerts for anomalies, and optimize your energy usage for maximum savings and peace of mind.
                </h2>
              </div>

              {/* Feature Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-indigo-100 text-sm">Real-time solar panel monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-indigo-100 text-sm">Instant anomaly alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-indigo-100 text-sm">Energy usage optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-indigo-100 text-sm">Maximum savings tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Goals and Needs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side - Goals and Needs */}
            <div className="bg-card rounded-2xl p-8 border border-border transition-colors duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Goals:</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Maximize solar energy savings.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Detect and resolve issues early.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Track daily, weekly, and monthly output.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Get notified of anomalies instantly.</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Needs:</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">A simple dashboard for real-time monitoring.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Instant alerts for system anomalies.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Easy access to historical performance data.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm leading-relaxed">Clear, actionable insights for better energy management.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="relative">
              <img
                src="/assests/images/solar.jpg"
                alt="Professional Solar Installation - certified technicians installing solar panels"
                className="w-full h-96 object-cover rounded-2xl"
              />
              {/* User Profile Button Overlay */}
              <div className="absolute top-4 left-4">
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg">
                  <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">👤</span>
                  </div>
                  User Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}