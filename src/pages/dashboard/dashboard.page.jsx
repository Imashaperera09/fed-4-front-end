import { Card } from "@/components/ui/card";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";

const DashboardPage = () => {
  const { data, error, isLoading } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: "68f27e4735af464f48833c71",
    groupBy: "date",
  });

  const energyData = data?.data || [];
  
  return (
    <main className="px-12">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <div className="mt-8">
        <Card className="rounded-md p-4">
          <h2 className="text-xl font-medium text-foreground">Last 7 Days Energy Production</h2>
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading energy data...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading data. Please check if the backend server is running.</p>
            </div>
          )}
          {!isLoading && !error && (
            <div className="grid grid-cols-7 gap-4 mt-4">
              {energyData.slice(0, 7).map((record, index) => {
                const date = new Date(record.date);
                const formattedDate = date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                });
                return (
                  <div key={index} className="col-span-1 px-2 py-1 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-xs text-gray-500 font-medium">{formattedDate}</h3>
                      <p className="text-lg font-semibold text-foreground">{record.energy} kWh</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
