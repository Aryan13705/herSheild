import React from 'react';
import { Shield, Battery, CloudRain, Map } from 'lucide-react';

interface MissionBriefingProps {
  destination: string;
  weather: string;
  battery: number;
  offlineReady: boolean;
  onAcknowledge: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({
  destination, weather, battery, offlineReady, onAcknowledge
}) => {
  return (
    <div className="bg-[var(--color-surface-glass)] backdrop-blur-[40px] border border-[var(--color-border-medium)] rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_32px_rgba(0,240,255,0.05)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[var(--color-surface-elevated)] rounded-lg border border-[var(--color-brand-primary)]">
          <Shield className="h-5 w-5 text-[var(--color-brand-primary)]" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Mission Briefing</h3>
          <p className="text-[10px] font-mono tracking-widest text-[var(--color-text-secondary)] mt-1">
            TARGET: {destination.toUpperCase()}
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-bg)] border border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3">
            <CloudRain className="h-4 w-4 text-[var(--color-brand-tertiary)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Weather Impact</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-secondary)]">{weather}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-bg)] border border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3">
            <Battery className={`h-4 w-4 ${battery < 20 ? 'text-[var(--color-safety-danger)]' : 'text-[var(--color-safety-safe)]'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Battery Status</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-secondary)]">{battery}%</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-bg)] border border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3">
            <Map className="h-4 w-4 text-[var(--color-brand-primary)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Offline Maps</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-secondary)]">
            {offlineReady ? 'SYNCED' : 'REQUIRED'}
          </span>
        </div>
      </div>
      
      <button 
        onClick={onAcknowledge}
        className="w-full py-3 rounded-xl border border-[var(--color-brand-tertiary)] text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-tertiary)] hover:bg-[var(--color-brand-tertiary)] hover:text-[var(--color-surface-bg)] hover:shadow-[0_0_24px_rgba(0,240,255,0.6)] transition-all"
      >
        Acknowledge Briefing
      </button>
    </div>
  );
};
