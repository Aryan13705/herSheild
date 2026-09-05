'use client';

import React from 'react';
import { CompanionProvider, useCompanion } from '../context/CompanionContext';
import { GuardianOrb } from '../orb/GuardianOrb';
import { ConversationPanel } from '../chat/ConversationPanel';
import { CommandPalette } from '../palette/CommandPalette';

interface OverlayContentProps {
  children: React.ReactNode;
  userName?: string;
  getAuthHeaders?: () => Promise<Record<string, string>> | Record<string, string>;
}

const OverlayContent: React.FC<OverlayContentProps> = ({ children, userName, getAuthHeaders }) => {
  const { companionMode } = useCompanion();
  
  return (
    <>
      {children}
      <GuardianOrb userName={userName} />
      <ConversationPanel getAuthHeaders={getAuthHeaders} />
      <CommandPalette />
    </>
  );
};

export const GuardianOverlay: React.FC<{ children: React.ReactNode; userName?: string; getAuthHeaders?: () => Promise<Record<string, string>> | Record<string, string> }> = ({ children, userName, getAuthHeaders }) => {
  return (
    <CompanionProvider>
      <OverlayContent userName={userName} getAuthHeaders={getAuthHeaders}>
        {children}
      </OverlayContent>
    </CompanionProvider>
  );
};
