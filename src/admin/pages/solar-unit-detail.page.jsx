import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Zap, Calendar, Gauge, Trash2, LineChart } from "lucide-react";
import { format } from "date-fns";
import { useGetSolarUnitByIdQuery, useDeleteSolarUnitMutation } from "@/lib/redux/query";

export default function SolarUnitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: solarUnit, isLoading: isLoadingSolarUnit, isError: isErrorSolarUnit, error: errorSolarUnit } = useGetSolarUnitByIdQuery(id);
  const [deleteSolarUnit, { isLoading: isDeleting }] = useDeleteSolarUnitMutation();

  if (isLoadingSolarUnit) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isErrorSolarUnit) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive font-medium">Error: {errorSolarUnit.message}</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard/admin/solar-units")}>
          Back to Solar Units
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/dashboard/admin/solar-units/${solarUnit._id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this solar unit? This action cannot be undone.")) {
      try {
        await deleteSolarUnit(solarUnit._id).unwrap();
        navigate("/dashboard/admin/solar-units");
      } catch (error) {
        console.error("Failed to delete solar unit:", error);
        alert("Failed to delete solar unit. Please try again.");
      }
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4">
        <Button
          variant="ghost"
          className="w-fit -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate("/dashboard/admin/solar-units")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            {solarUnit.serialNumber}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            View and manage solar unit details and performance
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Status</h2>
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${solarUnit.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {solarUnit.status}
                </div>
              </div>
              <Separator className="bg-border/50 mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                {solarUnit.status === "ACTIVE"
                  ? "This solar unit is currently operational and generating energy."
                  : "This solar unit is currently inactive and not generating energy."}
              </p>
            </CardContent>
          </Card>

          {/* Technical Specifications Card */}
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Separator className="bg-border/50 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Capacity</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    {(solarUnit.capacity / 1000).toFixed(1)} kW
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Serial Number</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground tracking-tight font-mono">
                    {solarUnit.serialNumber}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Information Card */}
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Installation Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Separator className="bg-border/50 mb-8" />
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Installation Date</span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {format(new Date(solarUnit.installationDate), "MMMM d, yyyy")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Unit ID</p>
                    <p className="text-sm font-mono text-muted-foreground bg-background/50 p-2 rounded border border-border/50 break-all">
                      {solarUnit._id}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">User ID</p>
                    <p className="text-sm font-mono text-muted-foreground bg-background/50 p-2 rounded border border-border/50 break-all">
                      {solarUnit.userId ?? "No User Assigned"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="lg:sticky lg:top-8">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              <Button onClick={handleEdit} className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold py-6">
                Edit Details
              </Button>
              <Button variant="outline" className="w-full border-border/50 hover:bg-accent transition-all py-6">
                <LineChart className="w-4 h-4 mr-2" />
                View Performance
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full border-border/50 text-red-500 hover:text-red-600 hover:bg-red-50 transition-all py-6"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Unit"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
