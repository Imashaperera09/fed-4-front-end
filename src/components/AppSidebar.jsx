import { ChartLine, LayoutDashboard, TriangleAlert, Users, Wind } from "lucide-react";
import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    title: "Anomaly",
    url: "/dashboard/anomaly",
    icon: <TriangleAlert className="w-4 h-4" />,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartLine className="w-4 h-4" />,
    badge: "NEW",
  },
  {
    title: "Users",
    url: "/users",
    icon: <Users className="w-4 h-4" />,
    badge: "NEW",
  },
];

const SideBarTab = ({ item }) => {
  let location = useLocation();
  let isActive = location.pathname === item.url;

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        className={`
          relative w-full justify-start text-sm font-medium transition-colors rounded-md
          ${isActive 
            ? 'bg-blue-50 text-blue-700 hover:bg-blue-50' 
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
          {item.icon}
          <span>{item.title}</span>
          {item.badge && (
            <SidebarMenuBadge className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
              {item.badge}
            </SidebarMenuBadge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className="w-64 border-r border-gray-200 bg-white">
      <SidebarHeader className="h-16 border-b border-gray-100 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
            <Wind className="w-5 h-5 text-black" />
          </div>
          <Link to="/" className="text-lg font-semibold text-gray-900">
            Aelora
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SideBarTab key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 mt-auto p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <span className="text-xs text-gray-500">john@email.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
