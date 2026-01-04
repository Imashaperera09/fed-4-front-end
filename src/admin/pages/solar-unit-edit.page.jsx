import { useParams, useNavigate } from "react-router-dom";
import { EditSolarUnitForm } from "../components/EditSolarUnitForm";
import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function SolarUnitEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: solarUnit, isLoading, isError, error } = useGetSolarUnitByIdQuery(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center">
                <p className="text-destructive font-medium">Error: {error.message}</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard/admin/solar-units")}>
                    Back to Solar Units
                </Button>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex flex-col gap-4">
                <Button
                    variant="ghost"
                    className="w-fit -ml-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => navigate(`/dashboard/admin/solar-units/${id}`)}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Unit Details
                </Button>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Edit Solar Unit</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Updating unit <span className="font-semibold text-foreground">{solarUnit.serialNumber}</span>
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <EditSolarUnitForm solarUnit={solarUnit} />
            </div>
        </main>
    );
}
