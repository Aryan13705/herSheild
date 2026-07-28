"use client";

import * as React from "react";

export function MinimalLayout({ children }: { children: React.ReactNode }) {
  // Used for Onboarding, Splash, or deep focus flows
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--color-surface-bg)] text-[var(--color-text-primary)]">
      <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-6 sm:p-8">
        {children}
      </main>
    </div>
  );
}
