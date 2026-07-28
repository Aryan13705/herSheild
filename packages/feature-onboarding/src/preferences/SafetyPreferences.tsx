'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@hershield/ui';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export const SafetyPreferences: React.FC<Props> = ({ onNext, onSkip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md w-full flex flex-col gap-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Safety Preferences</h2>
        <p className="text-gray-400 text-sm">How should I react in an emergency?</p>
      </div>

      <Card className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col gap-6">
        
        <div className="flex items-center justify-between">
           <div>
             <h4 className="text-sm font-medium text-white">Auto Mission Detection</h4>
             <p className="text-xs text-gray-400">Automatically start monitoring when you travel.</p>
           </div>
           <div className="w-10 h-6 bg-[var(--color-brand-tertiary)] rounded-full relative">
             <div className="absolute right-1 top-1 w-4 h-4 bg-[var(--color-surface-bg)] rounded-full" />
           </div>
        </div>

        <div className="flex items-center justify-between">
           <div>
             <h4 className="text-sm font-medium text-white">Trusted Contact Sharing</h4>
             <p className="text-xs text-gray-400">Share live location with contacts automatically.</p>
           </div>
           <div className="w-10 h-6 bg-white/10 rounded-full relative">
             <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
           </div>
        </div>
        
      </Card>

      <div className="flex items-center justify-between mt-4">
        <button onClick={onSkip} className="text-sm text-gray-500 hover:text-white transition-colors">
          Skip
        </button>
        <Button onClick={onNext} className="bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] rounded-full px-8 font-medium">
          Continue
        </Button>
      </div>
    </motion.div>
  );
};
