import React from 'react';

export const RiskIndicator: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 rounded-full bg-[var(--color-safety-safe)] animate-pulse" />
    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Safe Zone</span>
  </div>
);
