import { useState } from "react";
import {
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetWeatherDataQuery,
  useGetCapacityFactorQuery
} from "@/lib/redux/query";
import SolarEnergyProduction from "@/components/SolarEnergyProduction";
import DataChart from "./components/DataChart";
import WeatherConditions from "./components/WeatherConditions";
import CapacityFactorChart from "./components/CapacityFactorChart";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user } = useUser();

  const solarUnitId = "694bdfb6ba06aedb2ca56922";

  // Lifted Anomaly Detection State
  const [detectionMethod, setDetectionMethod] = useState("window-average");
  const [threshold, setThreshold] = useState(40); // 40% for window average
  const [minKwh, setMinKwh] = useState(5); // 5 kWh for absolute threshold

  // Fetch energy data
  const { data, isLoading, isError, error } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: solarUnitId,
    groupBy: "date",
  });

  // Fetch weather data (Berlin coordinates as default)
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError
  } = useGetWeatherDataQuery({ lat: 52.52, lon: 13.41 });

  // Fetch capacity factor data
  const {
    data: capacityFactorData,
    isLoading: isCapacityLoading,
    isError: isCapacityError
  } = useGetCapacityFactorQuery(solarUnitId);

  return (
    <main className="mt-4 pb-12">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
        <p className="text-muted-foreground mt-2">Welcome back to your Solar Energy Production Dashboard</p>
      </div>

      {/* Main Content Grid - Weather and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Solar Energy Production */}
        <div className="lg:col-span-2 space-y-6">
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

        {/* Right Column - Weather Widget and Capacity Factor */}
        <div className="space-y-6">
          <WeatherConditions
            weatherData={weatherData}
            isLoading={isWeatherLoading}
            isError={isWeatherError}
          />
          <CapacityFactorChart
            data={capacityFactorData}
            isLoading={isCapacityLoading}
            isError={isCapacityError}
          />
        </div>
      </div>

      {/* Energy Production Chart - Full Width */}
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
