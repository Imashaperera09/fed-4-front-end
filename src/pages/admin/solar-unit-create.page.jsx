import { CreateSolarUnitForm } from "./components/CreateSolarUnitForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SolarUnitCreatePage() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col gap-4">
        <Button
          variant="ghost"
          className="w-fit -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate("/admin/solar-units")}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Solar Units
        </Button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Add New Solar Unit</h1>
          <p className="text-muted-foreground mt-2 text-lg">Register a new unit to the monitoring system.</p>
        </div>
      </div>

      <div className="mt-4">
        <CreateSolarUnitForm />
      </div>
    </main>
  );
}
