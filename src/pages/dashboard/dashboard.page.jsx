import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import DataChart from "./components/DataChart";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user } = useUser();

  const solarUnitId = "68f27e4735af464f48833c71";

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
