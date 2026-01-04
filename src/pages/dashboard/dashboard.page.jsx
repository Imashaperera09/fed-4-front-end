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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
          <p className="text-muted-foreground mt-2">Welcome back to your Solar Energy Production Dashboard</p>
        </div>
        <div className="w-full md:w-80">
          <WeatherConditions
            weatherData={weatherData}
            isLoading={isWeatherLoading}
            isError={isWeatherError}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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
        <div>
          <CapacityFactorChart
            data={capacityFactorData}
            isLoading={isCapacityLoading}
            isError={isCapacityError}
          />
        </div>
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
