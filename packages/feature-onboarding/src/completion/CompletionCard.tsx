'use client';

import React from 'react';
import { Card, Button } from '@hershield/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CompletionCard = () => {
  // In reality, this data would come from the profile.router TRPC endpoint
  const percentage = 72;
  const remainingTasks = [
    'Add Emergency Contact',
    'Enable Location',
    'Verify Phone'
  ];

  if (percentage === 100) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-tertiary)] opacity-10 rounded-full blur-3xl -mr-10 -mt-10" />
      
      <div className="flex flex-col gap-4 relative z-10">
        <div>
          <h3 className="text-white font-semibold mb-1">Complete Your Guardian Profile</h3>
          <p className="text-gray-400 text-sm">I can protect you better when I know more about you.</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--color-brand-tertiary)]">{percentage}% Complete</span>
          </div>
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-brand-tertiary)] rounded-full" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-4 flex flex-col gap-3 border border-white/5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</p>
          {remainingTasks.map((task, i) => (
             <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
               <CheckCircle2 className="w-4 h-4 text-gray-600" />
               {task}
             </div>
          ))}
        </div>

        <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-full font-medium flex items-center justify-center gap-2 mt-2">
          Continue Setup <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
