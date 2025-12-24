import { useState } from "react";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import SolarEnergyProduction from "@/components/SolarEnergyProduction";
import DataChart from "./components/DataChart";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user } = useUser();

  const solarUnitId = "68f27e4735af464f48833c71";

  // Lifted Anomaly Detection State
  const [detectionMethod, setDetectionMethod] = useState("window-average");
  const [threshold, setThreshold] = useState(40); // 40% for window average
  const [minKwh, setMinKwh] = useState(5); // 5 kWh for absolute threshold

  // Fetch energy data
  const { data, isLoading, isError, error } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: solarUnitId,
    groupBy: "date",
  });

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">Welcome back to your Solar Energy Production Dashboard</p>

      <div className="mt-8">
        <SolarEnergyProduction
          data={data}
          isLoading={isLoading}
          isError={isError}
          detectionMethod={detectionMethod}
          setDetectionMethod={setDetectionMethod}
          threshold={threshold}
          setThreshold={setThreshold}
          minKwh={minKwh}
          setMinKwh={setMinKwh}
        />
      </div>

      <div className="mt-8">
        <DataChart
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          detectionMethod={detectionMethod}
          threshold={threshold}
          minKwh={minKwh}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
