import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "../../pages/home/Footer/Footer";

export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className="p-4 w-full bg-background transition-colors duration-300 flex flex-col min-h-screen">
          <div className="flex-1">
            <SidebarTrigger className="block" />
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}
