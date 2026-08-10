"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Shield, Home, Compass, Map, ShieldAlert, Users, BookOpen, Settings } from "lucide-react";
import { trpc } from "../lib/trpc";

const navItems = [
  { name: "Home", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
  { name: "Trips", href: "/trips", icon: <Compass className="w-5 h-5" /> },
  { name: "Map", href: "/map", icon: <Map className="w-5 h-5" /> },
  { name: "Safety", href: "/safety", icon: <ShieldAlert className="w-5 h-5" /> },
  { name: "Network", href: "/network", icon: <Users className="w-5 h-5" /> },
  { name: "Resources", href: "/resources", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
];

function SOSBtn({ userId }: { userId: string }) {
  const [loading, setLoading] = React.useState(false);
  const utils = trpc.useUtils();
  const triggerSOS = trpc.safety.incident.triggerSOS.useMutation({
    onSuccess: () => {
      alert("SOS Triggered! Admin command center notified.");
      utils.safety.incident.getActiveIncidents.invalidate();
    },
    onError: (err) => {
      alert("Failed to trigger SOS: " + err.message);
    }
  });

  const handleSOS = () => {
    if (window.confirm("Are you sure you want to trigger an SOS?")) {
      setLoading(true);
      // Mock coordinates for demo (New York roughly)
      triggerSOS.mutate(
        { userId, lat: 40.7128 + (Math.random() * 0.01), lng: -74.0060 + (Math.random() * 0.01), description: "Emergency SOS triggered from sidebar." },
        { onSettled: () => setLoading(false) }
      );
    }
  };

  return (
    <button 
      onClick={handleSOS}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white border border-red-100 text-red-500 font-medium text-sm shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      <div className={`w-2 h-2 rounded-full bg-red-500 ${loading ? 'animate-ping' : 'animate-pulse'}`} />
      {loading ? 'Sending...' : 'SOS'}
    </button>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-12 h-12 border-4 border-[#34A853] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-[100dvh] bg-[#F7F9FA] text-gray-900 font-sans">
      
      {/* ══════════════ DESKTOP SIDEBAR ══════════════ */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[240px] z-40 bg-white border-r border-gray-100 shadow-[2px_0_24px_rgba(0,0,0,0.02)]">
        
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-900">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <p className="font-bold text-lg tracking-tight">HerShield</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-[#eef8f1] text-[#34A853]" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 flex flex-col gap-4">
          <SOSBtn userId={user.id} />
          
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
               <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=34A853&color=fff`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-gray-900">{user.name || "User"}</p>
              <p className="text-[10px] text-[#34A853] font-medium">View Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-[100dvh] relative z-10">
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
