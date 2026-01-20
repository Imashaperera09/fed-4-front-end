import { ChartLine, LayoutDashboard, TriangleAlert, Users, Wind, Receipt } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

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
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: <Receipt className="w-4 h-4" />,
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
            ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
          }
        `}
      >
        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
          {item.icon}
          <span>{item.title}</span>
          {item.badge && (
            <SidebarMenuBadge className="ml-auto bg-sidebar-accent text-sidebar-foreground/60 text-xs px-2 py-0.5 rounded-full font-medium">
              {item.badge}
            </SidebarMenuBadge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  const { user } = useUser();

  const userName = user?.fullName || user?.firstName || "User";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  const initials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  };

  return (
    <Sidebar className="w-64 border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="h-32 border-b border-sidebar-border flex items-center px-4">
        <div className="flex items-center gap-4 group">
          <div className="w-20 h-20 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <img src="/assests/logo.png" alt="SolarNova Logo" className="w-full h-full object-contain" />
          </div>
          <Link to="/" className="text-2xl font-extrabold tracking-tighter flex items-center">
            <span className="text-orange-500">Solar</span>
            <span className="text-blue-600">Nova</span>
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

        <SidebarGroup className="mt-4">
          <div className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider">
            User Views
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="relative w-full justify-start text-sm font-medium transition-colors rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                >
                  <Link to="/dashboard/alexander" className="flex items-center gap-3 px-3 py-2">
                    <Users className="w-4 h-4" />
                    <span>Alexander's Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border mt-auto p-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">{initials(userName)}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate text-sidebar-foreground">
              {userName}
            </span>
            <span className="text-xs text-sidebar-foreground/60 truncate">
              {userEmail}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

