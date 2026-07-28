'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@hershield/ui';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export const TravelPreferences: React.FC<Props> = ({ onNext, onSkip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md w-full flex flex-col gap-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Travel Preferences</h2>
        <p className="text-gray-400 text-sm">Help me understand how you travel.</p>
      </div>

      <Card className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-300 font-medium ml-2">What are you planning today?</label>
          <div className="flex flex-wrap gap-2">
            {['Daily Commute', 'Weekend Trip', 'Vacation', 'Business', 'Exploring'].map((tag) => (
              <button key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium hover:bg-[var(--color-brand-tertiary)] hover:text-[var(--color-surface-bg)] hover:border-transparent transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-300 font-medium ml-2">Preferred Transport</label>
          <div className="flex flex-wrap gap-2">
            {['Walking', 'Transit', 'Driving', 'Rideshare'].map((tag) => (
              <button key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium hover:bg-white/20 transition-all">
                {tag}
              </button>
            ))}
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
