import { Users, Activity, MessageSquare, AlertTriangle, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Admin() {
  const [flags, setFlags] = useState({
    chatEnabled: true,
    storiesEnabled: true,
    bookingEnabled: false
  });

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`Toggled module ${key}`);
  };

  const stats = [
    { label: "Active Users", value: "2,405", icon: Users },
    { label: "Rooms Open", value: "34", icon: MessageSquare },
    { label: "Reported Content", value: "12", icon: AlertTriangle, alert: true },
    { label: "Platform Health", value: "99.8%", icon: Activity },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage platform settings, modules, and moderation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`p-5 rounded-xl border ${stat.alert ? "border-destructive bg-destructive/5" : "border-border bg-card"} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-medium ${stat.alert ? "text-destructive" : "text-muted-foreground"}`}>{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.alert ? "text-destructive" : "text-muted-foreground"}`} />
            </div>
            <p className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Module Flags Area */}
        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-6">Feature Modules</h3>
          <div className="space-y-4">
            {Object.entries(flags).map(([key, enabled]) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border border-border/50 rounded-lg bg-muted/20">
                <div>
                  <span className="text-sm font-medium capitalize block">{key.replace("Enabled", "")} Module</span>
                  <span className="text-xs text-muted-foreground">Turn visibility on or off platform-wide</span>
                </div>
                <button onClick={() => toggleFlag(key as keyof typeof flags)}>
                  {enabled ? (
                    <ToggleRight className="w-8 h-8 text-primary transition-colors" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-muted-foreground transition-colors" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Moderation Setup */}
        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-6">Reported Content</h3>
          <div className="space-y-3">
             <div className="p-3 border border-border rounded-lg flex items-start gap-3">
               <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
               <div className="flex-1">
                 <p className="text-sm font-medium">Post flagged: "Anonym23"</p>
                 <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Suspicious link shared in anxiety thread.</p>
               </div>
               <button className="text-[10px] uppercase font-semibold text-muted-foreground hover:text-foreground">Review</button>
             </div>
             
             <div className="p-3 border border-border rounded-lg flex items-start gap-3">
               <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
               <div className="flex-1">
                 <p className="text-sm font-medium">Room locked: "Test room 123"</p>
                 <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Violated community standards (hostile behavior).</p>
               </div>
               <button className="text-[10px] uppercase font-semibold text-muted-foreground hover:text-foreground">Review</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
