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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMemo, useState } from "react";

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
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({ name: "Imasha", email: "imasha@example.com" });
  const [usersOpen, setUsersOpen] = useState(false);

  // Fix: usersList should be an array, not an object
  const usersList = useMemo(() => ([
    { name: "Imasha", email: "imasha@example.com", url: "/dashboard" },
    { name: "Alexander", email: "alexander@email.com", url: "/dashboard/alexander" },
  ]), []);

  const initials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

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

              {/* Users selector tab (opens sheet instead of navigating) */}
              <SidebarMenuItem>
                <Sheet open={usersOpen} onOpenChange={setUsersOpen}>
                  <SheetTrigger asChild>
                    <SidebarMenuButton className="relative w-full justify-start text-sm font-medium rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/50">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Users className="w-4 h-4" />
                        <span>Users</span>
                        <SidebarMenuBadge className="ml-auto bg-sidebar-accent text-sidebar-foreground/60 text-xs px-2 py-0.5 rounded-full font-medium">
                          Select
                        </SidebarMenuBadge>
                      </div>
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                    <SheetHeader>
                      <SheetTitle>Select User</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <Select
                        value={selectedUser.name}
                        onValueChange={(val) => {
                          const u = usersList.find((u) => u.name === val);
                          if (u) {
                            setSelectedUser(u);
                            if (u.url) navigate(u.url);
                          }
                          setUsersOpen(false);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose user" />
                        </SelectTrigger>
                        <SelectContent>
                          {usersList.map((u) => (
                            <SelectItem key={u.name} value={u.name}>
                              {u.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-3 text-xs text-sidebar-foreground/60">Current: {selectedUser.name} ({selectedUser.email})</div>
                    </div>
                  </SheetContent>
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border mt-auto p-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{initials(selectedUser.name)}</span>
          </div>
          <div className="flex-1">
            <Select
              value={selectedUser.name}
              onValueChange={(val) => {
                const u = usersList.find((u) => u.name === val);
                if (u) {
                  setSelectedUser(u);
                  if (u.url) navigate(u.url);
                }
              }}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {usersList.map((u) => (
                  <SelectItem key={u.name} value={u.name}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-1">
              <span className="text-xs text-sidebar-foreground/60">{selectedUser.email}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
