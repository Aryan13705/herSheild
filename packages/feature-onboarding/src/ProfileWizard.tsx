'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '@hershield/ui';
import { X, Calendar, ChevronDown } from 'lucide-react';

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

export const ProfileWizard: React.FC<Props> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="fixed left-72 top-24 z-[100] w-[380px]"
    >
      <Card className="bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
        
        {/* Header */}
        <div className="p-6 pb-2 shrink-0">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Complete Your Profile</h2>
            <button onClick={onSkip} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Help Guardian protect you better</p>
          
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-400">Step {step} of {totalSteps}</p>
            <div className="flex gap-1 h-1.5 w-full">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`flex-1 rounded-full ${i <= step ? 'bg-[#34A853]' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
          
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-900">Personal Information</h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Full Name</label>
              <input type="text" defaultValue="Priya Kumar" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Date of Birth</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2002-05-12" 
                  className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer relative z-10 bg-transparent" 
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">City</label>
              <div className="relative">
                <select className="appearance-none w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all">
                  <option>New Delhi</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Occupation</label>
              <div className="relative">
                <select className="appearance-none w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all">
                  <option>Student</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">Emergency Contact</h3>
              <p className="text-xs text-gray-400">This person will be notified in case of emergency.</p>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Contact Name</label>
              <input type="text" defaultValue="Rohit Kumar" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Relationship</label>
              <div className="relative">
                <select className="appearance-none w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all">
                  <option>Brother</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Phone Number</label>
              <div className="relative flex">
                <div className="shrink-0 bg-white border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 flex items-center justify-center gap-1.5">
                  <span className="text-[10px]">🇮🇳</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <input type="text" defaultValue="+91 98765 43210" className="w-full bg-white border border-gray-200 rounded-r-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Email (Optional)</label>
              <input type="text" defaultValue="rohit.kumar@email.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#34A853] transition-all" />
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 pt-4 shrink-0 bg-white border-t border-gray-50 flex flex-col gap-3">
          <Button onClick={handleContinue} className="w-full bg-[#34A853] hover:bg-[#2c8f46] text-white rounded-xl py-6 font-medium shadow-sm">
            Continue
          </Button>
          <button onClick={onSkip} className="w-full py-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
            Skip for now
          </button>
        </div>

      </Card>
    </motion.div>
  );
};
