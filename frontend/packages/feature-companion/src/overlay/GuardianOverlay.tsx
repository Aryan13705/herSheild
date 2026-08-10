'use client';

import React from 'react';
import { CompanionProvider, useCompanion } from '../context/CompanionContext';
import { GuardianOrb } from '../orb/GuardianOrb';
import { ConversationPanel } from '../chat/ConversationPanel';
import { CommandPalette } from '../palette/CommandPalette';

interface OverlayContentProps {
  children: React.ReactNode;
  userName?: string;
}

const OverlayContent: React.FC<OverlayContentProps> = ({ children, userName }) => {
  const { companionMode } = useCompanion();
  
  return (
    <>
      {children}
      <GuardianOrb userName={userName} />
      <ConversationPanel />
      <CommandPalette />
    </>
  );
};

export const GuardianOverlay: React.FC<{ children: React.ReactNode; userName?: string }> = ({ children, userName }) => {
  return (
    <CompanionProvider>
      <OverlayContent userName={userName}>
        {children}
      </OverlayContent>
    </CompanionProvider>
  );
};
