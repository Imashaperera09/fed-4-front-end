import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Lock, Database, Save, X, ShieldCheck, History } from "lucide-react";

export function SettingsTab() {
  const [settings, setSettings] = useState({
    appName: "SolarNova Admin",
    maintenanceMode: false,
    emailNotifications: true,
    logRetention: "30",
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save settings
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* General Settings */}
      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500 delay-75">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">General Settings</CardTitle>
              <CardDescription>Configure basic application information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <Separator className="bg-border/50 mb-6" />
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Application Name
              </label>
              <Input
                value={settings.appName}
                onChange={(e) => handleChange("appName", e.target.value)}
                placeholder="Enter application name"
                className="bg-background/50 border-border/50 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-background/30 border border-border/30 group hover:bg-background/50 transition-all">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">
                  Disable access for regular users during updates
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  handleChange("maintenanceMode", e.target.checked)
                }
                className="w-5 h-5 rounded border-border/50 text-primary focus:ring-primary/20 cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500 delay-150">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Notifications</CardTitle>
              <CardDescription>Manage how you receive system alerts</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <Separator className="bg-border/50 mb-6" />
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-background/30 border border-border/30 group hover:bg-background/50 transition-all">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive instant email alerts for critical system events
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleChange("emailNotifications", e.target.checked)
                }
                className="w-5 h-5 rounded border-border/50 text-primary focus:ring-primary/20 cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Settings */}
      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500 delay-225">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Data Management</CardTitle>
              <CardDescription>Control system logs and data retention</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <Separator className="bg-border/50 mb-6" />
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Log Retention (days)
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={settings.logRetention}
                  onChange={(e) => handleChange("logRetention", e.target.value)}
                  placeholder="Enter days"
                  className="bg-background/50 border-border/50 focus:ring-primary/20 max-w-[200px]"
                />
                <p className="text-xs text-muted-foreground italic">
                  Logs older than this will be purged automatically
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500 delay-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Security</CardTitle>
              <CardDescription>Protect your admin panel and access</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <Separator className="bg-border/50 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-border/50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
              <ShieldCheck className="w-5 h-5" />
              <span>Reset Admin Passwords</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-border/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
              <History className="w-5 h-5" />
              <span>View Audit Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end items-center gap-4 pt-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-500">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all px-8 py-6 h-auto font-bold">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
