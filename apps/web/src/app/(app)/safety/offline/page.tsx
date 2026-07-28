"use client";

import React, { useState, useEffect } from "react";
import { 
  EmergencyButton,
  OfflineBanner,
  EmergencyCard,
  SafetyCenterCard
} from "@hershield/feature-safety";
import { useCurrentUser } from "../../../../context/CurrentUserContext";
import { getOfflineData } from "@hershield/feature-safety/src/offline/safetyStorage";

export default function OfflineSafetyPage() {
  const { user } = useCurrentUser();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [cachedCenters, setCachedCenters] = useState<any[]>([]);

  useEffect(() => {
    // Load cached centers if offline
    getOfflineData<any[]>("cached_safety_locations").then((data) => {
      if (data) setCachedCenters(data);
    });
  }, []);

  const handleTriggerEmergency = () => {
    setIsEmergencyActive(true);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
    // Send SMS as fallback since we are offline
    const message = encodeURIComponent("EMERGENCY! I need help. Last known location attached.");
    window.location.href = `sms:?&body=${message}`;
  };

  return (
    <div className="pb-10 min-h-screen bg-[#080B14]">
      <OfflineBanner isOffline={true} lastSyncedAt={new Date()} />

      <div className="p-6 mt-4">
        <h1 className="text-2xl font-black text-[#E8537A] tracking-wide mb-8 text-center">EMERGENCY MODE</h1>
        
        <div className="flex justify-center mb-10">
          <EmergencyButton 
            isTriggered={isEmergencyActive}
            onTrigger={handleTriggerEmergency}
          />
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-bold text-[#F0F2FF] mb-3 uppercase tracking-widest border-b border-white/10 pb-2">Your ID</h3>
            <EmergencyCard 
              cardData={{
                name: user?.name || "Unknown",
                bloodGroup: "O+",
              }}
            />
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#F0F2FF] mb-3 uppercase tracking-widest border-b border-white/10 pb-2">Cached Safe Zones</h3>
            <div className="grid gap-3">
              {cachedCenters.length > 0 ? (
                cachedCenters.map((center, idx) => (
                  <SafetyCenterCard key={idx} resource={center} />
                ))
              ) : (
                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs text-[#8892B0]">No safety centers were cached for this area.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
