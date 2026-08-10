'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@hershield/ui';

interface Props {
  onContinue: () => void;
  onSkip: () => void;
}

export const GuardianWelcome: React.FC<Props> = ({ onContinue, onSkip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md w-full flex flex-col items-center text-center gap-8"
    >
      <div className="w-24 h-24 rounded-full bg-[var(--color-brand-tertiary)]/20 flex items-center justify-center relative">
         <div className="absolute inset-0 rounded-full bg-[var(--color-brand-tertiary)] blur-xl opacity-30 animate-pulse" />
         <div className="w-8 h-8 bg-white rounded-full shadow-[0_0_20px_white]" />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Welcome to HerShield.</h1>
        <h2 className="text-xl text-[var(--color-brand-tertiary)] font-medium">I'm Guardian.</h2>
        <p className="text-gray-400 leading-relaxed text-sm">
          I'll help you travel safely wherever you go. 
          Let's take a moment to set up your profile so I can personalize your protection.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full mt-4">
        <Button onClick={onContinue} size="lg" className="w-full bg-white text-black hover:bg-gray-100 rounded-full font-medium">
          Get Started
        </Button>
        <button onClick={onSkip} className="text-sm text-gray-500 hover:text-white transition-colors">
          Skip for Now
        </button>
      </div>
    </motion.div>
  );
};
