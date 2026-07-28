import React from "react";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface SafetyScoreCardProps {
  score: number;
  factors: { name: string; impact: "positive" | "negative"; description: string }[];
}

export function SafetyScoreCard({ score, factors }: SafetyScoreCardProps) {
  // Score is out of 100
  const getScoreData = () => {
    if (score >= 80) return { color: "#34D399", label: "Safe", icon: ShieldCheck };
    if (score >= 50) return { color: "#FBBF24", label: "Caution", icon: Shield };
    return { color: "#E8537A", label: "High Risk", icon: ShieldAlert };
  };

  const data = getScoreData();
  const Icon = data.icon;

  return (
    <div className="bg-[#0F1420] border border-white/5 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[#F0F2FF] font-bold text-lg">Area Safety Score</h3>
          <p className="text-[#8892B0] text-xs mt-1">Based on real-time intelligence</p>
        </div>
        <div 
          className="w-16 h-16 rounded-full flex flex-col items-center justify-center border-4"
          style={{ borderColor: data.color, background: `${data.color}15` }}
        >
          <span className="text-xl font-black" style={{ color: data.color }}>{score}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg" style={{ background: `${data.color}15` }}>
        <Icon className="w-5 h-5" style={{ color: data.color }} />
        <span className="text-sm font-semibold" style={{ color: data.color }}>
          Status: {data.label}
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-semibold text-[#4A5568] uppercase tracking-widest">Key Factors</p>
        {factors.map((factor, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full ${factor.impact === "positive" ? "bg-[#34D399]" : "bg-[#E8537A]"}`} />
            <div>
              <p className="text-sm font-medium text-[#F0F2FF]">{factor.name}</p>
              <p className="text-xs text-[#8892B0] leading-relaxed">{factor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
