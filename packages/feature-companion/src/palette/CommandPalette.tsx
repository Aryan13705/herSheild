'use client';

import React, { useEffect, useState } from 'react';
import { CompanionActionRegistry } from '../registry/CompanionActionRegistry';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex justify-center items-start pt-32 pointer-events-auto">
      <div className="w-full max-w-lg bg-[var(--color-surface-glass)] border border-white/20 rounded-2xl shadow-2xl p-4 overflow-hidden backdrop-blur-3xl" onClick={(e) => e.stopPropagation()}>
        <input 
          autoFocus
          placeholder="Search commands (e.g. 'Start Mission')"
          className="w-full bg-transparent text-white text-lg outline-none pb-4 border-b border-white/10 placeholder-gray-500"
        />
        <div className="pt-4 flex flex-col gap-2 max-h-64 overflow-y-auto">
          {CompanionActionRegistry.getAvailableActions().length === 0 && (
            <p className="text-gray-400 text-sm italic">No actions registered yet.</p>
          )}
          {CompanionActionRegistry.getAvailableActions().map(action => (
            <button 
              key={action.id} 
              onClick={() => {
                action.handler();
                setIsOpen(false);
              }}
              className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
            >
              <span className="font-bold">{action.name}</span>
              <p className="text-xs text-gray-400 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
