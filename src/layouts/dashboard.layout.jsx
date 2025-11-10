import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/AppSidebar";
import {SidebarProvider, SidebarTrigger} from "../components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-white">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold text-gray-900">Alice's House</h1>
          </div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
