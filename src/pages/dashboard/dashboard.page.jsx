import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import DataChart from "./components/DataChart";
import WeatherConditions from "./components/WeatherConditions";
import RealTimePower from "./components/RealTimePower";

const DashboardPage = () => {
  const { data, isLoading, isError, error } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: "68f27e4735af464f48833c71",
    groupBy: "date",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message || "Failed to load data"}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <p className="text-gray-600 mt-2">Welcome back to your Solar Energy Production Dashboard</p>

      {/* Top section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherConditions temperature={12} windSpeed={8.5} />
        <RealTimePower power={332} avgWind={7.8} avgPower={2804.8} peakPower={332.1} totalEnergy={4.0} />
      </div>

      <div className="mt-8">
        <DataCard
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          title="Last 7 Days Energy Production"
        />
      </div>
      <div className="mt-8">
        <DataChart
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
