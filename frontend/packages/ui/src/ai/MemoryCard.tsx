import React from 'react';

export const MemoryCard: React.FC = () => (
  <div className="p-4 bg-[var(--color-surface-glass)] border-[var(--color-border-subtle)] rounded-2xl flex justify-between items-center">
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-tertiary)]">Guardian Memory</h3>
      <p className="text-sm text-white">Memory fact placeholder.</p>
    </div>
    <button className="text-xs text-[var(--color-safety-danger)] uppercase tracking-widest hover:underline">Clear</button>
  </div>
);
