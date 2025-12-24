import { ChartLine, LayoutDashboard, TriangleAlert, Users, Wind } from "lucide-react";
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
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({ name: "John Doe", email: "john@email.com" });
  const [usersOpen, setUsersOpen] = useState(false);

  // Fix: usersList should be an array, not an object
  const usersList = useMemo(() => ([
    { name: "Alice", email: "alice@email.com", url: "/dashboard" },
    { name: "Alexander", email: "alexander@email.com", url: "/dashboard/alexander" },
    { name: "John Doe", email: "john@email.com", url: "/dashboard" },
  ]), []);

  const initials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

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

              {/* Users selector tab (opens sheet instead of navigating) */}
              <SidebarMenuItem>
                <Sheet open={usersOpen} onOpenChange={setUsersOpen}>
                  <SheetTrigger asChild>
                    <SidebarMenuButton className="relative w-full justify-start text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Users className="w-4 h-4" />
                        <span>Users</span>
                        <SidebarMenuBadge className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
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
                      <div className="mt-3 text-xs text-gray-500">Current: {selectedUser.name} ({selectedUser.email})</div>
                    </div>
                  </SheetContent>
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 mt-auto p-4">
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
              <span className="text-xs text-gray-500">{selectedUser.email}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
