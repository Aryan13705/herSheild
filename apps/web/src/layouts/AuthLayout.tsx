"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname?.includes("/login");

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--color-surface-bg)] text-[var(--color-text-primary)]">
      {/* Left Pane - Branding/Visual (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-[var(--color-surface-card)] border-r border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="font-bold text-2xl tracking-tight text-white flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            HerShield
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md mt-auto">
          <h1 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome back." : "Travel with a guardian, always."}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            HerShield watches your route, checks in on you, and alerts your circle if something feels off.
          </p>
        </div>
        
        {/* Subtle background element */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[var(--color-brand-primary)]/10 rounded-full blur-[100px]" />
      </div>

      {/* Right Pane - Form Container */}
      <div className="flex flex-col justify-center p-6 sm:p-12 lg:p-24 h-full relative">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 flex justify-center">
            <Link href="/" className="w-12 h-12 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
