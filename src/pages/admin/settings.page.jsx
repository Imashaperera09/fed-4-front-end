import { SettingsTab } from "./components/SettingsTab";

export default function SettingsPage() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2 text-lg">Configure system and admin settings</p>
      </div>
      <div className="mt-4">
        <SettingsTab />
      </div>
    </main>
  );
}
