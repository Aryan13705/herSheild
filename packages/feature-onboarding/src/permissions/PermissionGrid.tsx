'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@hershield/ui';
import { MapPin, Bell, Mic, Camera } from 'lucide-react';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export const PermissionGrid: React.FC<Props> = ({ onNext, onSkip }) => {
  const permissions = [
    { id: 'location', title: 'Location', desc: 'Allows Guardian to track your mission and find safe zones.', icon: MapPin },
    { id: 'notifications', title: 'Notifications', desc: 'Required for critical alerts and check-ins.', icon: Bell },
    { id: 'mic', title: 'Microphone', desc: 'Enable voice commands and audio distress triggers.', icon: Mic },
    { id: 'camera', title: 'Camera', desc: 'Required for secure contact verification.', icon: Camera }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md w-full flex flex-col gap-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Permissions</h2>
        <p className="text-gray-400 text-sm">Guardian needs these to protect you.</p>
      </div>

      <div className="flex flex-col gap-3">
        {permissions.map((p) => (
           <Card key={p.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <p.icon className="w-5 h-5 text-gray-300" />
             </div>
             <div className="flex-1">
               <h4 className="text-sm font-medium text-white">{p.title}</h4>
               <p className="text-xs text-gray-400 leading-snug">{p.desc}</p>
             </div>
             <button className="text-xs font-medium text-[var(--color-brand-tertiary)] hover:text-white transition-colors">
               Enable
             </button>
           </Card>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button onClick={onSkip} className="text-sm text-gray-500 hover:text-white transition-colors">
          Skip
        </button>
        <Button onClick={onNext} className="bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] rounded-full px-8 font-medium">
          Finish Setup
        </Button>
      </div>
    </motion.div>
  );
};
