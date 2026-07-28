import React from "react";
import { Navigation, Phone, Clock, WifiOff, MapPin } from "lucide-react";
import { SafetyResource } from "../types";

interface SafetyCenterCardProps {
  resource: SafetyResource;
  onNavigate?: () => void;
  onCall?: () => void;
}

export function SafetyCenterCard({ resource, onNavigate, onCall }: SafetyCenterCardProps) {
  const getIconAndColor = () => {
    switch (resource.type) {
      case "police": return { icon: "🚓", color: "#34D399" };
      case "hospital": return { icon: "🏥", color: "#E8537A" };
      case "shelter": return { icon: "⛺", color: "#9B6DFF" };
      default: return { icon: "📍", color: "#8892B0" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="bg-[#0F1420] border border-white/5 rounded-2xl p-4 shadow-md flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 bg-opacity-20"
            style={{ backgroundColor: `${color}20` }}
          >
            {icon}
          </div>
          <div>
            <h4 className="text-[#F0F2FF] font-semibold text-sm leading-tight">{resource.name}</h4>
            <p className="text-[#8892B0] text-[11px] mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {resource.address}
            </p>
          </div>
        </div>
        {resource.distance && (
          <div className="bg-white/5 px-2 py-1 rounded text-[#F0F2FF] text-xs font-mono font-semibold shrink-0">
            {resource.distance < 1 ? `${(resource.distance * 1000).toFixed(0)}m` : `${resource.distance.toFixed(1)}km`}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-medium">
        <div className="flex gap-3">
          {resource.phone && (
            <span className="flex items-center gap-1 text-[#4ade80]">
              <Phone className="w-3.5 h-3.5" />
              Available
            </span>
          )}
          {resource.isOpen24x7 ? (
            <span className="flex items-center gap-1 text-[#34D399]">
              <Clock className="w-3.5 h-3.5" />
              24×7
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[#FBBF24]">
              <Clock className="w-3.5 h-3.5" />
              Check Hours
            </span>
          )}
        </div>
        {resource.isOfflineCached && (
          <span className="flex items-center gap-1 text-[#8892B0] text-[10px] uppercase tracking-wider">
            <WifiOff className="w-3 h-3" /> Cached
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-1">
        {onCall && resource.phone && (
          <button 
            onClick={onCall}
            className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors bg-white/5 hover:bg-white/10 text-white"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Center
          </button>
        )}
        {onNavigate && (
          <button 
            onClick={onNavigate}
            className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            <Navigation className="w-3.5 h-3.5" />
            Navigate
          </button>
        )}
      </div>
    </div>
  );
}
