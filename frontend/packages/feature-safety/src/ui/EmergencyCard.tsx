import React from "react";
import { User, Activity, AlertCircle, Phone, FileText } from "lucide-react";

interface EmergencyCardProps {
  cardData: {
    name: string;
    bloodGroup?: string;
    medicalConditions?: string;
    allergies?: string;
    nationality?: string;
    insuranceNumber?: string;
  };
  primaryContact?: { name: string; phone: string; relationship: string };
}

export function EmergencyCard({ cardData, primaryContact }: EmergencyCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#E8537A] to-[#D4406A] p-1 rounded-3xl shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Activity className="w-24 h-24 text-white" />
      </div>

      <div className="bg-[#0F1420] rounded-[22px] p-5 relative z-10 h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#F0F2FF] font-black text-xl tracking-wide flex items-center gap-2">
            <User className="w-5 h-5 text-[#E8537A]" />
            EMERGENCY ID
          </h2>
          <div className="px-3 py-1 bg-[#E8537A]/20 rounded-full border border-[#E8537A]/30">
            <span className="text-[#E8537A] font-bold text-sm tracking-widest">{cardData.bloodGroup || "UNKNOWN"}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[#4A5568] text-[10px] font-bold uppercase tracking-wider mb-0.5">Full Name</p>
            <p className="text-[#F0F2FF] font-semibold text-lg leading-tight">{cardData.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cardData.nationality && (
              <div>
                <p className="text-[#4A5568] text-[10px] font-bold uppercase tracking-wider mb-0.5">Nationality</p>
                <p className="text-[#F0F2FF] text-sm">{cardData.nationality}</p>
              </div>
            )}
            {cardData.insuranceNumber && (
              <div>
                <p className="text-[#4A5568] text-[10px] font-bold uppercase tracking-wider mb-0.5">Insurance No.</p>
                <p className="text-[#F0F2FF] text-sm font-mono">{cardData.insuranceNumber}</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-[#FBBF24]" />
              <span className="text-[#FBBF24] font-bold text-xs uppercase tracking-wider">Medical Notes</span>
            </div>
            {cardData.medicalConditions || cardData.allergies ? (
              <div className="space-y-2">
                {cardData.medicalConditions && (
                  <p className="text-[#F0F2FF] text-sm"><span className="text-[#8892B0] mr-1">Conditions:</span> {cardData.medicalConditions}</p>
                )}
                {cardData.allergies && (
                  <p className="text-[#F0F2FF] text-sm"><span className="text-[#8892B0] mr-1">Allergies:</span> {cardData.allergies}</p>
                )}
              </div>
            ) : (
              <p className="text-[#8892B0] text-sm italic">No known medical conditions or allergies.</p>
            )}
          </div>

          {primaryContact && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[#4A5568] text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                <Phone className="w-3 h-3" /> Emergency Contact
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#F0F2FF] font-semibold text-sm">{primaryContact.name}</p>
                  <p className="text-[#8892B0] text-xs">{primaryContact.relationship}</p>
                </div>
                <p className="text-[#F0F2FF] font-mono text-sm">{primaryContact.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
