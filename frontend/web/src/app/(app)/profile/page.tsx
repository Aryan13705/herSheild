"use client";

import * as React from "react";
import { User, Shield, Settings } from "lucide-react";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { useCurrentUser } from "../../../context/CurrentUserContext";
import { auth } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useCurrentUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-[var(--color-surface-bg)] min-h-screen relative">
      
      {/* Background HUD elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: "radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-3xl mx-auto space-y-6 relative z-10 pt-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-brand-tertiary)] mb-1">Operative Details</p>
            <h1 className="text-3xl font-light tracking-widest uppercase text-white">Profile & <span className="font-bold text-[var(--color-brand-primary)]">Settings</span></h1>
          </div>
          <button 
             onClick={handleSignOut}
             className="px-4 py-2 rounded-full border border-[var(--color-border-subtle)] text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        {/* User Information HUD Panel */}
        <div className="bg-[var(--color-surface-glass)] backdrop-blur-[40px] border border-[var(--color-border-medium)] rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_32px_rgba(0,240,255,0.05)]">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center border border-[var(--color-brand-tertiary)] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <User className="h-8 w-8 text-[var(--color-brand-tertiary)]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white tracking-wide uppercase">
                {user?.displayName || "Guardian Traveler"}
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[var(--color-brand-tertiary)] opacity-80 mt-1">ID: {user?.email || "UNVERIFIED"}</p>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-lg border border-[var(--color-brand-primary)] text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors">
                  Update Clearance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts HUD Panel */}
        <div className="bg-[var(--color-surface-glass)] backdrop-blur-[40px] border border-[var(--color-border-medium)] rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_32px_rgba(0,240,255,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--color-safety-safe-bg)] rounded-lg border border-[var(--color-safety-safe)]">
              <Shield className="h-5 w-5 text-[var(--color-safety-safe)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Emergency Contacts</h3>
              <p className="text-[10px] tracking-widest text-[var(--color-text-secondary)]">Guardian Alert Network</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-bg)] border border-[var(--color-border-subtle)]">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">Alpha Primary (Mom)</p>
                <p className="text-[10px] font-mono tracking-widest text-[var(--color-text-secondary)] mt-1">+1 (555) 123-4567</p>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-tertiary)] hover:text-white transition-colors">
                Edit
              </button>
            </div>
            
            <button className="w-full py-3 rounded-xl border border-dashed border-[var(--color-border-medium)] text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
              + Add Node
            </button>
          </div>
        </div>

        {/* System Settings HUD Panel */}
        <div className="bg-[var(--color-surface-glass)] backdrop-blur-[40px] border border-[var(--color-border-medium)] rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_32px_rgba(0,240,255,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--color-surface-elevated)] rounded-lg border border-[var(--color-brand-primary)]">
              <Settings className="h-5 w-5 text-[var(--color-brand-primary)]" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">System Config</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">Visual Mode</p>
                <p className="text-[10px] tracking-widest text-[var(--color-text-secondary)] mt-1">Light / Dark</p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Help Center & Danger Zone */}
        <div className="bg-[var(--color-surface-glass)] backdrop-blur-[40px] border border-[var(--color-border-medium)] rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_32px_rgba(0,240,255,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--color-surface-elevated)] rounded-lg border border-[var(--color-border-medium)]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Security & Help</h3>
              <p className="text-[10px] tracking-widest text-[var(--color-text-secondary)]">Manage protocols</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <details className="group border border-[var(--color-border-subtle)] rounded-xl bg-[var(--color-surface-bg)] overflow-hidden">
              <summary className="flex items-center justify-between p-4 font-bold uppercase tracking-widest text-[10px] cursor-pointer list-none hover:bg-white/5 transition-colors">
                <span className="text-[var(--color-safety-danger)]">Danger Zone</span>
                <span className="text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/50">
                <div className="flex flex-col gap-4">
                  <p className="text-[10px] uppercase tracking-wide leading-relaxed text-[var(--color-safety-danger)]">
                    Warning: Initiating protocol will permanently purge operative data. Irreversible.
                  </p>
                  <button className="self-start px-4 py-2 rounded-lg bg-[var(--color-safety-danger)] text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_16px_rgba(255,59,48,0.4)] hover:bg-red-600 transition-colors">
                    Purge Account
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}
