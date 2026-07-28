import React from 'react';
import { Card, Badge } from '@hershield/ui';
import { IconMapPin, IconBattery, IconWifiOff, IconShieldCheck, IconAlertTriangle } from '@tabler/icons-react';

export interface LiveSafetyPanelProps {
  missionId?: string;
  etaMinutes?: number;
  batteryLevel?: number;
  isOffline?: boolean;
  safetyScore?: number;
  onEmergency?: () => void;
}

/**
 * A minimal, reusable HUD for the Guardian Live Assistance Platform.
 * Displays live tracking context, ETA, and emergency escalation.
 */
export function LiveSafetyPanel({
  missionId,
  etaMinutes = 15,
  batteryLevel = 100,
  isOffline = false,
  safetyScore = 98,
  onEmergency
}: LiveSafetyPanelProps) {
  // Only render when an active mission is taking place
  if (!missionId) return null;

  return (
    <Card className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50 bg-black/70 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 flex flex-col gap-3 rounded-2xl overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.8)] rounded-b-full"></div>

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="text-emerald-400 w-5 h-5" />
          <span className="text-white font-semibold text-sm tracking-wide">Guardian Active</span>
        </div>
        <div className="flex gap-2">
          {isOffline && (
            <Badge variant="destructive" className="bg-red-500/20 text-red-400 border border-red-500/50">
              <IconWifiOff className="w-3 h-3 mr-1" /> Offline
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/10 text-white border border-white/20">
            <IconBattery className="w-3 h-3 mr-1" /> {batteryLevel}%
          </Badge>
        </div>
      </div>

      <div className="flex justify-between items-end mt-2 z-10">
        <div>
          <p className="text-gray-400 text-xs mb-1 font-medium">ETA to Destination</p>
          <div className="text-white font-bold text-3xl flex items-baseline gap-1">
            {etaMinutes} <span className="text-sm font-medium text-gray-400">min</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-gray-400 text-xs mb-1 font-medium">Safety Score</p>
          <div className="text-emerald-400 font-bold text-2xl">
            {safetyScore}%
          </div>
        </div>
      </div>

      <button 
        onClick={onEmergency}
        className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-[0.98] z-10"
      >
        <IconAlertTriangle className="w-5 h-5" />
        SOS / Escalate
      </button>
    </Card>
  );
}
