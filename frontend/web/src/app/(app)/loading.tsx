import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full text-[var(--color-brand-primary)]">
      <Loader2 className="w-10 h-10 animate-spin mb-4" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading experience...</p>
    </div>
  );
}
