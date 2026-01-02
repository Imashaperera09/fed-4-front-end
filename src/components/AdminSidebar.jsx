import { Settings, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items for admin navigation.
const items = [
  {
    title: "Solar Units",
    url: "/dashboard/admin/solar-units",
    icon: <Zap className="w-8 h-8" size={32} />,
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: <Settings className="w-8 h-8" size={32} />,
  },
];

const AdminSideBarTab = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-16 flex items-center px-4 mb-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img src="/assests/logo.png" alt="SolarNova Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">SolarNova</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => (
                <AdminSideBarTab key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
