'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, RefreshCcw } from 'lucide-react';
import { syncService } from '@hershield/feature-offline';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncs, setPendingSyncs] = useState(0);

  useEffect(() => {
    // Initial state
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Poll for pending syncs if offline
    const interval = setInterval(async () => {
      const count = await syncService.getPendingCount();
      setPendingSyncs(count);
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (isOnline && pendingSyncs === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-2 pointer-events-none">
      <div 
        className="flex items-center gap-2 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md pointer-events-auto"
        style={{ background: isOnline ? 'rgba(52,211,153,0.9)' : 'rgba(232,83,122,0.9)', color: '#fff' }}
      >
        {!isOnline ? (
          <>
            <WifiOff className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Offline Mode</span>
            {pendingSyncs > 0 && (
              <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded-md bg-white/20">
                {pendingSyncs} Pending
              </span>
            )}
          </>
        ) : (
          <>
            <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
            <span className="text-xs font-semibold uppercase tracking-wider">Syncing Data...</span>
          </>
        )}
      </div>
    </div>
  );
};
