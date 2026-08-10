'use client';

import React, { createContext, useContext, useState } from 'react';

export type OrbState = 'safe' | 'listening' | 'thinking' | 'scanning' | 'emergency';
export type CompanionMode = 'hidden' | 'compact' | 'medium' | 'full';

interface CompanionContextType {
  orbState: OrbState;
  setOrbState: (state: OrbState) => void;
  companionMode: CompanionMode;
  setCompanionMode: (mode: CompanionMode) => void;
  openCompanion: () => void;
  closeCompanion: () => void;
}

const CompanionContext = createContext<CompanionContextType | undefined>(undefined);

export const CompanionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orbState, setOrbState] = useState<OrbState>('safe');
  const [companionMode, setCompanionMode] = useState<CompanionMode>('hidden');

  const openCompanion = () => setCompanionMode('medium');
  const closeCompanion = () => setCompanionMode('hidden');

  return (
    <CompanionContext.Provider value={{
      orbState, setOrbState,
      companionMode, setCompanionMode,
      openCompanion, closeCompanion
    }}>
      {children}
    </CompanionContext.Provider>
  );
};

export const useCompanion = () => {
  const context = useContext(CompanionContext);
  if (!context) throw new Error("useCompanion must be used within GuardianOverlay");
  return context;
};
