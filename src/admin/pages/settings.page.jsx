import { SettingsTab } from "../components/SettingsTab";
import { Settings, Bell, Lock, Database, Save, X, ShieldCheck, History } from "lucide-react";

export default function SettingsPage() {
  const icons = {
    Settings,
    Bell,
    Lock,
    Database,
    Save,
    X,
    ShieldCheck,
    History,
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2 text-lg">Configure system and admin settings</p>
      </div>
      <div className="mt-4">
        <SettingsTab icons={icons} />
      </div>
    </main>
  );
}
