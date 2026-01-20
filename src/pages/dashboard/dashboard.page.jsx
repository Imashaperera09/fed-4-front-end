import { useState } from "react";
import {
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetWeatherDataQuery,
  useGetCapacityFactorQuery,
  useGetSolarUnitForUserQuery
} from "@/lib/redux/query";
import SolarEnergyProduction from "@/components/SolarEnergyProduction";
import DataChart from "./components/DataChart";
import WeatherConditions from "./components/WeatherConditions";
import CapacityFactorChart from "./components/CapacityFactorChart";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ShieldCheck, User as UserIcon, TriangleAlert } from "lucide-react";

const DashboardPage = () => {
  const { user } = useUser();

  // Fetch user's solar unit
  const {
    data: solarUnit,
    isLoading: isUnitLoading,
    isError: isUnitError
  } = useGetSolarUnitForUserQuery();

  const solarUnitId = solarUnit?._id;

  // Lifted Anomaly Detection State
  const [detectionMethod, setDetectionMethod] = useState("window-average");
  const [threshold, setThreshold] = useState(40); // 40% for window average
  const [minKwh, setMinKwh] = useState(5); // 5 kWh for absolute threshold

  // Fetch energy data
  const { data, isLoading, isError, error } = useGetEnergyGenerationRecordsBySolarUnitQuery(
    { id: solarUnitId, groupBy: "date" },
    { skip: !solarUnitId }
  );

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
  } = useGetCapacityFactorQuery(solarUnitId, { skip: !solarUnitId });

  return (
    <main className="mt-4 pb-12">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
          <p className="text-muted-foreground mt-2">Welcome back to your Solar Energy Production Dashboard</p>
        </div>

        {/* Role Selection UI */}
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow-lg border-2 border-primary transition-all hover:scale-105"
          >
            <UserIcon size={20} />
            <div className="text-left">
              <div className="text-xs opacity-80 font-medium">Viewing as</div>
              <div className="font-bold">User</div>
            </div>
          </Link>

          {(user?.publicMetadata?.role === "admin" || user?.primaryEmailAddress?.emailAddress === "imashachamodi0609@gmail.com") && (
            <Link
              to="/dashboard/admin"
              className="flex items-center gap-3 px-6 py-3 bg-card text-card-foreground rounded-xl shadow-md border-2 border-transparent transition-all hover:border-orange-500 hover:scale-105"
            >
              <ShieldCheck size={20} className="text-orange-500" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground font-medium">Switch to</div>
                <div className="font-bold">Admin Portal</div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {isUnitLoading ? (
        <div className="p-8 text-center">Loading your solar unit...</div>
      ) : isUnitError || !solarUnit ? (
        <div className="p-8 text-center text-red-500 bg-card rounded-xl border border-destructive/20">
          <TriangleAlert className="mx-auto mb-4 text-destructive" size={48} />
          <h2 className="text-xl font-bold mb-2">Solar Unit Not Found</h2>
          <p>Could not find a solar unit for your account. Please ensure your unit is correctly linked.</p>
          <p className="text-sm mt-4 text-muted-foreground">If you are an administrator, you can manage units in the Admin Portal.</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
};

export default DashboardPage;
