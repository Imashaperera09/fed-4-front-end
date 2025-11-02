import { useSelector } from "react-redux";
import EnergyProductionCards from "./EnergyProductionCards";
import Tab from "./Tab";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { format } from "date-fns";
import { toDate } from "date-fns";

const SolarEnergyProduction = () => {
  const tabs = [
    { label: "All", value: "all" },
    { label: "Anomaly", value: "anomaly" },
  ];

  const selectedTab = useSelector((state) => state.ui.selectedHomeTab);

  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({id:"68f27e4735af464f48833c71", groupBy: "date"});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Error: {error?.message || "Something went wrong"}</div>;
  }

  const newEnergyProductionData = data.slice(0, 7).map((el) => {
    return {
      day: format(toDate(el._id.date), "EEE"),
      date: format(toDate(el._id.date), "MMM d"),
      production: el.totalEnergy,
      hasAnomaly: false, // Explicitly set to false to remove red styling
    };
  });

  const filteredEnergyProductionData = newEnergyProductionData.filter((el) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
  });

  console.log(filteredEnergyProductionData);

  return (
    <section className="px-12 font-[Inter] py-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
        <p className="text-gray-600">Daily energy output for the past 7 days</p>
      </div>
      <div className="mt-4 flex items-center gap-x-4">
        {tabs.map((tab) => {
          return <Tab key={tab.value} tab={tab} />;
        })}
      </div>
      {/* <div className="mt-4">
        <Button onClick={handleGetData}>Get Data</Button>
      </div> */}
      <EnergyProductionCards
        energyProductionData={filteredEnergyProductionData}
      />
    </section>
  );
};

export default SolarEnergyProduction;

