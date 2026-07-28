import React from 'react';
import { Card, Badge } from '@hershield/ui';
import { Battery, WifiOff, ShieldCheck, TriangleAlert } from 'lucide-react';

export interface LiveSafetyPanelProps {
  missionId?: string;
  etaMinutes?: number;
  batteryLevel?: number;
  isOffline?: boolean;
  safetyScore?: number;
  onEmergency?: () => void;
}

export function LiveSafetyPanel({
  missionId,
  etaMinutes = 15,
  batteryLevel = 100,
  isOffline = false,
  safetyScore = 98,
  onEmergency
}: LiveSafetyPanelProps) {
  if (!missionId) return null;

  return (
    <Card className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50 bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-3 rounded-2xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,1)] rounded-b-full"></div>

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-emerald-400 w-5 h-5 animate-pulse" />
          <span className="text-white font-semibold text-sm tracking-wide">Guardian Active</span>
        </div>
        <div className="flex gap-2">
          {isOffline && (
            <Badge variant="destructive" className="bg-red-500/20 text-red-400 border border-red-500/50">
              <WifiOff className="w-3 h-3 mr-1" /> Offline
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/10 text-white border border-white/20">
            <Battery className="w-3 h-3 mr-1" /> {batteryLevel}%
          </Badge>
        </div>
      </div>

      <div className="flex justify-between items-end mt-2 z-10">
        <div>
          <p className="text-gray-400 text-xs mb-1 font-medium tracking-wide">ETA to Destination</p>
          <div className="text-white font-bold text-3xl flex items-baseline gap-1 drop-shadow-md">
            {etaMinutes} <span className="text-sm font-medium text-gray-400">min</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-gray-400 text-xs mb-1 font-medium tracking-wide">Safety Score</p>
          <div className="text-emerald-400 font-bold text-2xl drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            {safetyScore}%
          </div>
        </div>
      </div>

      <button 
        onClick={onEmergency}
        className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 bg-red-600/90 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-[0.98] z-10"
      >
        <TriangleAlert className="w-5 h-5" />
        SOS / Escalate
      </button>
    </Card>
  );
}
