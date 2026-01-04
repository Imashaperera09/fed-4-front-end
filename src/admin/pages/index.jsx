import { Routes, Route, Navigate } from "react-router-dom";
import SettingsPage from "./settings.page.jsx";
import SolarUnitDetailPage from "./solar-unit-detail.page.jsx";
import AuthorizedLayout from "../layouts/authorized.layout.jsx";
import ProtectedLayout from "../../layouts/protected.layout.jsx";
import AdminPage from "./admin.page.jsx"; // Keeping this import as requested, though logic is handled here
import SolarUnitEditPage from "./solar-unit-edit.page.jsx";
import SolarUnitCreatePage from "./solar-unit-create.page.jsx";
import SolarUnitsPage from "./solar-units.page.jsx";
import AdminLayout from "../layouts/admin.layout.jsx";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedLayout />}>
                <Route element={<AuthorizedLayout />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<Navigate to="solar-units" replace />} />
                        <Route path="solar-units" element={<SolarUnitsPage />} />
                        <Route path="solar-units/create" element={<SolarUnitCreatePage />} />
                        <Route path="solar-units/:id" element={<SolarUnitDetailPage />} />
                        <Route path="solar-units/:id/edit" element={<SolarUnitEditPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
