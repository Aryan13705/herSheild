"use client";

import React, { useState } from "react";
import { 
  SafetyHub, 
  EmergencyContactCard, 
  SafetyCenterCard, 
  EmergencyCard,
  useSafetySync
} from "@hershield/feature-safety";
import { useCurrentUser } from "../../../context/CurrentUserContext";

export default function SafetyPage() {
  const { user } = useCurrentUser();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  // Mock safety sync data for now (will be connected to tRPC backend)
  const { isOffline } = useSafetySync("safety_dashboard_data", async () => {
    return { status: "ok" };
  });

  const handleTriggerEmergency = () => {
    setIsEmergencyActive(true);
    // In real app: vibrate device, start audio recording, send location to backend, notify emergency contacts
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 500]);
    }
  };

  if (!user) return null;

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#F0F2FF] tracking-wide mb-1">Safety Intelligence</h1>
        <p className="text-sm text-[#8892B0]">Your personal security command center</p>
      </div>

      <SafetyHub
        isOffline={isOffline}
        isEmergencyActive={isEmergencyActive}
        onTriggerEmergency={handleTriggerEmergency}
        safetyScore={85}
        safetyFactors={[
          { name: "High Police Presence", impact: "positive", description: "3 stations within 5km" },
          { name: "Well Lit Areas", impact: "positive", description: "Main roads have functioning lights" },
          { name: "Recent Reports", impact: "negative", description: "2 harassment reports nearby this week" },
        ]}
      >
        <div className="mt-8 space-y-6">
          
          <section>
            <h3 className="text-lg font-bold text-[#F0F2FF] mb-4">Emergency ID</h3>
            <EmergencyCard 
              cardData={{
                name: user.name || "Unknown",
                bloodGroup: "O+",
                medicalConditions: "None",
                allergies: "Penicillin",
                nationality: "Global",
              }}
              primaryContact={{
                name: "Mom",
                phone: "+1 234 567 8900",
                relationship: "Mother",
              }}
            />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#F0F2FF]">Emergency Contacts</h3>
              <button className="text-xs font-bold text-[#E8537A] uppercase tracking-widest hover:text-white transition-colors">Manage</button>
            </div>
            <div className="grid gap-3">
              <EmergencyContactCard 
                name="Mom" 
                relationship="Mother" 
                phone="+1 234 567 8900" 
                isPrimary 
              />
              <EmergencyContactCard 
                name="Local Authorities" 
                relationship="Police Station" 
                phone="100" 
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-[#F0F2FF] mb-4">Nearest Safety Centers</h3>
            <div className="grid gap-3">
              <SafetyCenterCard 
                resource={{
                  id: "1",
                  name: "Central Mahila Police Station",
                  type: "police",
                  latitude: 0,
                  longitude: 0,
                  address: "123 Safe St.",
                  isOpen24x7: true,
                  phone: "1091",
                  distance: 1.2,
                  isOfflineCached: true,
                }}
              />
              <SafetyCenterCard 
                resource={{
                  id: "2",
                  name: "City Women's Hospital",
                  type: "hospital",
                  latitude: 0,
                  longitude: 0,
                  address: "456 Health Ave.",
                  isOpen24x7: true,
                  phone: "102",
                  distance: 3.5,
                  isOfflineCached: true,
                }}
              />
            </div>
          </section>

        </div>
      </SafetyHub>
    </div>
  );
}
