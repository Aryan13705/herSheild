'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@hershield/ui';
import { Plus } from 'lucide-react';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

export const EmergencyContacts: React.FC<Props> = ({ onNext, onSkip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md w-full flex flex-col gap-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Emergency Contacts</h2>
        <p className="text-gray-400 text-sm">Who should I contact if you need help?</p>
      </div>

      <Card className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col gap-4">
        <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-white/20 rounded-2xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">Add Contact</span>
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">I recommend adding at least 2 contacts.</p>
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
