import * as React from "react";
import Link from "next/link";
import { Button } from "@hershield/ui";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 text-center">
      {/* ── Full-Screen Background Image ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(135deg, rgba(8,11,20,0.7) 0%, rgba(8,11,20,0.5) 50%, rgba(8,11,20,0.75) 100%)" }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center pt-10">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm mb-8 backdrop-blur-md">
          <span className="flex w-2 h-2 rounded-full bg-[var(--color-brand-primary)] mr-2 animate-pulse"></span>
        HerShield Beta is now live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
        Travel with a <span className="text-[var(--color-brand-primary)]">guardian</span>,<br /> always.
      </h1>
      
      <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl">
        HerShield is the AI-powered safety platform built for women. We monitor your routes in real-time, check in on you, and instantly alert your trusted circle if anything feels off.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button size="lg" asChild className="h-14 px-8 text-lg w-full sm:w-auto">
          <Link href="/register">Get Started Free</Link>
        </Button>
        <Button size="lg" variant="secondary" asChild className="h-14 px-8 text-lg w-full sm:w-auto">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
    </div>
  );
}
