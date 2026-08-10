import React from "react";
import { EmergencyButton } from "./EmergencyButton";
import { OfflineBanner } from "./OfflineBanner";
import { SafetyScoreCard } from "./SafetyScoreCard";
import { Shield, ShieldAlert, Heart, MapPin, Search } from "lucide-react";

interface SafetyHubProps {
  isOffline: boolean;
  isEmergencyActive: boolean;
  onTriggerEmergency: () => void;
  safetyScore: number;
  safetyFactors: { name: string; impact: "positive" | "negative"; description: string }[];
  children?: React.ReactNode; // For passing in contacts, cards, centers
}

export function SafetyHub({
  isOffline,
  isEmergencyActive,
  onTriggerEmergency,
  safetyScore,
  safetyFactors,
  children
}: SafetyHubProps) {
  return (
    <div className="flex flex-col gap-6">
      <OfflineBanner isOffline={isOffline} lastSyncedAt={new Date()} />

      {/* Emergency Section */}
      <section className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#151B2B] to-[#0F1420] rounded-3xl border border-white/5 relative overflow-hidden">
        {/* Decorative Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
          <div className="mb-8 flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#E8537A]/10 border border-[#E8537A]/20">
            <ShieldAlert className="w-4 h-4 text-[#E8537A]" />
            <span className="text-xs font-bold text-[#E8537A] uppercase tracking-widest">Emergency Hub</span>
          </div>

          <EmergencyButton 
            isTriggered={isEmergencyActive}
            onTrigger={onTriggerEmergency}
          />
        </div>
      </section>

      <section>
        <SafetyScoreCard score={safetyScore} factors={safetyFactors} />
      </section>

      {children}
    </div>
  );
}
