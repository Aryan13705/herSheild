import React from "react";
import { Phone, MessageSquare, Star, MoreVertical } from "lucide-react";

interface EmergencyContactCardProps {
  name: string;
  relationship: string;
  phone: string;
  isPrimary?: boolean;
  onCall?: () => void;
  onMessage?: () => void;
}

export function EmergencyContactCard({ name, relationship, phone, isPrimary, onCall, onMessage }: EmergencyContactCardProps) {
  return (
    <div className="bg-[#0F1420] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-[#151B2B] transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9B6DFF] to-[#6B46C1] flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
          {isPrimary && (
            <div className="absolute -bottom-1 -right-1 bg-[#E8537A] rounded-full p-1 border-2 border-[#0F1420]">
              <Star className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-[#F0F2FF] font-semibold flex items-center gap-2">
            {name}
            {isPrimary && <span className="text-[9px] bg-[#E8537A]/20 text-[#E8537A] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Primary</span>}
          </h4>
          <p className="text-[#8892B0] text-xs mb-0.5">{relationship}</p>
          <p className="text-[#F0F2FF] text-sm font-mono opacity-80">{phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onMessage}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#8892B0]" />
        </button>
        <button 
          onClick={onCall}
          className="w-10 h-10 rounded-full bg-[#E8537A]/10 hover:bg-[#E8537A]/20 flex items-center justify-center transition-colors"
        >
          <Phone className="w-4 h-4 text-[#E8537A]" />
        </button>
        <button className="w-8 h-10 flex items-center justify-center text-[#4A5568] hover:text-[#8892B0] transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
