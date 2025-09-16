import imgWindTurbine from "./wind-turbine.png";
import { Sailboat, Shield, Triangle, Wind } from "lucide-react";
import EnergyProductionCard from "../EnergyProductionCard";

export default function HeroSection() {
  return (
    <div className="bg-white px-12 font-[Inter]">
      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center justify-between py-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 sm:h-12 sm:w-12">
            <Wind className="h-5 w-5 text-black sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Solar Energy
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-12 sm:w-12">
            <Sailboat className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Home Dashboard
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 sm:h-12 sm:w-12">
            <Triangle className="h-5 w-5 fill-current text-black sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Real-Time Monitoring
          </span>
        </div>

        <div className="hidden flex-col items-center gap-2 sm:flex sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-12 sm:w-12">
            <Shield className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Anomaly Detection
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 py-4 md:px-6 md:py-16">
        <div>
          {/* Hero Section */}
          <div className="mb-12 md:mb-24">
            <h1 className="text-4xl leading-tight font-bold text-black sm:text-5xl sm:leading-20 md:text-7xl md:leading-32 xl:text-8xl">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <Triangle className="h-5 w-5 fill-current text-white sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </div>
              </div>
            </h1>
            
            {/* Solar Energy Production Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
              <p className="text-gray-600 mb-6">Daily energy output for the past 7 days</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                <EnergyProductionCard day="Mon" date="Sep 09" production="45.2" />
                <EnergyProductionCard day="Tue" date="Sep 10" production="38.7" />
                <EnergyProductionCard day="Wed" date="Sep 11" production="52.3" />
                <EnergyProductionCard day="Thu" date="Sep 12" production="29.6" />
                <EnergyProductionCard day="Fri" date="Sep 13" production="47.8" />
                <EnergyProductionCard day="Sat" date="Sep 14" production="51.1" />
                <EnergyProductionCard day="Sun" date="Sep 15" production="33.4" />
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
            <div className="bg-gradient-to-br from-purple-400 via-blue-400 to-green-300 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Solar Energy Generation</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
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
            <div className="bg-gradient-to-br from-green-300 via-teal-300 to-blue-300 rounded-2xl p-8">
              <div className="mb-6">
                <div className="mb-4">
                  <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    Problem
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Home solar systems can face reduced efficiency and missed savings due to panel shading, dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly alerts.
                </h2>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Panel shading detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Output drop alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Inverter issue monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 text-sm">Dirt & maintenance alerts</span>
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
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <div className="mb-4">
                  <div className="inline-block bg-green-400 text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
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
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-blue-100 text-sm">Real-time solar panel monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-blue-100 text-sm">Instant anomaly alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-blue-100 text-sm">Energy usage optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-blue-100 text-sm">Maximum savings tracking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Goals and Needs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side - Goals and Needs */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Goals:</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Maximize solar energy savings.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Detect and resolve issues early.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Track daily, weekly, and monthly output.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Get notified of anomalies instantly.</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Needs:</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">A simple dashboard for real-time monitoring.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Instant alerts for system anomalies.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Easy access to historical performance data.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">Clear, actionable insights for better energy management.</span>
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
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 text-xs font-bold">👤</span>
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