import EnergyProductionCard from "./EnergyProductionCard";
import Tab from "./Tab";
import { useState } from "react";

const SolarEnergyProduction = () => {
  const energyProductionData = [
    { day: "Mon", date: "Aug 18", production: 34.1, hasAnomaly: false },
    { day: "Tue", date: "Aug 19", production: 3.2, hasAnomaly: true },
    { day: "Wed", date: "Aug 20", production: 44.7, hasAnomaly: false },
    { day: "Thu", date: "Aug 21", production: 21.9, hasAnomaly: false },
    { day: "Fri", date: "Aug 22", production: 0, hasAnomaly: true },
    { day: "Sat", date: "Aug 23", production: 43, hasAnomaly: false },
    { day: "Sun", date: "Aug 24", production: 26.8, hasAnomaly: false },
  ];

  const tabs = [
    { label: "All", value: "all" },
    { label: "Anomaly", value: "anomaly" },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  const handleTabClick = (value) => {
    setSelectedTab(value);
  };

  const filteredEnergyProductionData = energyProductionData.filter((el) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
  });

  return (
    <section className="px-12 font-[Inter] py-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
        <p className="text-gray-600">Daily energy output for the past 7 days</p>
      </div>
      <div className="mt-4 flex items-center gap-x-4">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.value}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedTab === tab.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleTabClick(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-7 gap-4">
        {filteredEnergyProductionData.map((el) => {
          return (
            <EnergyProductionCard
              key={el.date}
              day={el.day}
              date={el.date}
              production={el.production}
              hasAnomaly={el.hasAnomaly}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SolarEnergyProduction;
