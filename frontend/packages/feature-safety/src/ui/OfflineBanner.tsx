import React from "react";
import { WifiOff, DownloadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OfflineBannerProps {
  isOffline: boolean;
  lastSyncedAt?: Date;
  onSync?: () => void;
}

export function OfflineBanner({ isOffline, lastSyncedAt, onSync }: OfflineBannerProps) {
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-[#E8537A]/10 border border-[#E8537A]/30 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8537A]/20 flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4 text-[#E8537A]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#E8537A]">Offline Emergency Mode</p>
              <p className="text-xs text-[#8892B0]">
                Using cached data. SMS fallback is active.
                {lastSyncedAt && ` Last synced: ${lastSyncedAt.toLocaleTimeString()}`}
              </p>
            </div>
          </div>

          {onSync && (
            <button
              onClick={onSync}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#F0F2FF] transition-colors border border-white/10"
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              Try Sync
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
