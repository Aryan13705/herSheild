'use client';

import React from 'react';
import { CompanionProvider, useCompanion } from '../context/CompanionContext';
import { GuardianOrb } from '../orb/GuardianOrb';
import { ConversationPanel } from '../chat/ConversationPanel';
import { CommandPalette } from '../palette/CommandPalette';

const OverlayContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { companionMode } = useCompanion();
  
  return (
    <>
      {children}
      <GuardianOrb />
      <ConversationPanel />
      <CommandPalette />
    </>
  );
};

export const GuardianOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CompanionProvider>
      <OverlayContent>
        {children}
      </OverlayContent>
    </CompanionProvider>
  );
};
