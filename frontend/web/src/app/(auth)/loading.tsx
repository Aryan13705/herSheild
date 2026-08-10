import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[400px] text-white">
      <Loader2 className="w-10 h-10 animate-spin mb-4" />
      <p className="text-sm font-medium text-white/60 animate-pulse">Please wait...</p>
    </div>
  );
}
