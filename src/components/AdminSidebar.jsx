import { Settings, Zap, Receipt, TriangleAlert } from "lucide-react";
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
    title: "Invoices",
    url: "/dashboard/admin/invoices",
    icon: <Receipt className="w-8 h-8" size={32} />,
  },
  {
    title: "Anomalies",
    url: "/dashboard/admin/anomalies",
    icon: <TriangleAlert className="w-8 h-8" size={32} />,
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
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={`
          relative w-full justify-start text-sm font-medium transition-colors rounded-md
          ${isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
          }
        `}
      >
        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
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
          <SidebarGroupLabel className="h-32 flex items-center px-4 mb-2">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-20 h-20 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <img src="/assests/logo.png" alt="SolarNova Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter flex items-center">
                <span className="text-orange-500">Solar</span>
                <span className="text-blue-600">Nova</span>
              </span>
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
