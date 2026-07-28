'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@hershield/ui';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export const PersonalProfile: React.FC<Props> = ({ onNext, onSkip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md w-full flex flex-col gap-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">About You</h2>
        <p className="text-gray-400 text-sm">Tell me a little about yourself.</p>
      </div>

      <Card className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col gap-4">
        {/* Dummy form fields for layout, real fields would use react-hook-form */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium ml-2">Full Name</label>
          <input type="text" className="bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-[var(--color-brand-tertiary)] focus:outline-none" placeholder="Jane Doe" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium ml-2">Location</label>
          <input type="text" className="bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-[var(--color-brand-tertiary)] focus:outline-none" placeholder="City, Country" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium ml-2">Blood Group (Optional)</label>
          <input type="text" className="bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-[var(--color-brand-tertiary)] focus:outline-none" placeholder="O+" />
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
