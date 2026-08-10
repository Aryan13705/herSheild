'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shield, Activity, Map, Users, LogOut, Bell } from 'lucide-react';
import { auth } from '@/lib/auth-client';
import { onAuthStateChanged, User } from 'firebase/auth';

const ADMIN_EMAIL = 'aryan13705@gmail.com';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (pathname === '/login') {
      if (user && user.email === ADMIN_EMAIL) {
        router.push('/');
      }
      return;
    }

    if (!user || user.email !== ADMIN_EMAIL) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Prevent flash of unauthorized content
  if (pathname !== '/login' && (!user || user.email !== ADMIN_EMAIL)) {
    return null;
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#1e293b] border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-[#0f172a]/50">
          <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.5)]">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight tracking-tight">HerShield Admin</h1>
            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">Command Center</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          <a href="/" className="flex items-center gap-3 px-4 py-3 bg-rose-500/10 text-rose-400 rounded-xl font-medium border border-rose-500/20 transition-all hover:bg-rose-500/20">
            <Activity className="w-5 h-5" />
            Live SOS Map
          </a>
          <a href="/safe-zones" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl font-medium transition-all">
            <Map className="w-5 h-5" />
            Safe Zones
          </a>
          <a href="/users" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl font-medium transition-all">
            <Users className="w-5 h-5" />
            Users & Analytics
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl font-medium transition-all">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen relative">
        <header className="h-20 bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-[#1e293b] rounded-full animate-pulse" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right">
                <p className="text-sm font-bold text-white">aryan13705</p>
                <p className="text-xs text-slate-400">Security Clearance Level 5</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                <Shield className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-8 bg-[#0f172a]">
          {children}
        </div>
      </main>
    </>
  );
}
