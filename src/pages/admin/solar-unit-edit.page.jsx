import { useParams } from "react-router-dom";
import { EditSolarUnitForm } from "./components/EditSolarUnitForm";
import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";

export default function SolarUnitEditPage() {
    const { id } = useParams();
    const { data: solarUnit, isLoading, isError, error } = useGetSolarUnitByIdQuery(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main className="mt-4">
            <h1 className="text-4xl font-bold text-foreground">Edit Solar Unit</h1>
            <p className="text-gray-600 mt-2">Edit solar unit {solarUnit.serialNumber}</p>
            <div className="mt-8">
                <EditSolarUnitForm solarUnit={solarUnit} />
            </div>
        </main>
    );
}
