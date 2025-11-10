import { ChartLine, LayoutDashboard, TriangleAlert, Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContext,
} from "./ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

function SidebarMenuItem_({ item, isOpen }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={item.url} className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 group">
          <item.icon className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const context = useContext(SidebarContext);
  const isOpen = context?.isOpen !== false; // Default to true if context is not available
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-gray-800 mb-6 px-3">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem_ key={item.title} item={item} isOpen={isOpen} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
