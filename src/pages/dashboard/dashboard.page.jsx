import { Card } from "@/components/ui/card";
import { useGetSolarUnitQuery } from "@/lib/redux/query";

const DashboardPage = () => {

const { data, error: _error, isLoading: _isLoading } = useGetSolarUnitQuery("68f27e4735af464f48833c71");

  console.log(data); 
  return (
    <main className="px-12">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <div className="mt-8">
      <Card className="rounded-md p-4">
        <h2 className="text-xl font-medium text-foreground">Last 7 Days Energy Production</h2>
    <div className="grid grid-cols-7 gap-4 mt-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="col-span-1 px-2 py-1 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xs text-gray-500 font-medium">19 Oct</h3>
            <p className="text-lg font-semibold text-foreground">100 kWh</p>
          </div>
        </div>
      ))}
    </div>
      </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
