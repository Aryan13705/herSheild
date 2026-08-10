'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Phone, Navigation, AlertTriangle, Loader2 } from 'lucide-react';
import { useLocationService } from '@hershield/feature-maps';
import { SafetyLocationService, SafetyResource } from '@hershield/feature-safety';

export const DashboardSafetyWidget = () => {
  const { location, isTracking } = useLocationService();
  const [nearestSafePoint, setNearestSafePoint] = useState<SafetyResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize service with mapbox token
  const safetyService = useMemo(() => {
    return new SafetyLocationService(process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '');
  }, []);

  useEffect(() => {
    async function fetchNearest() {
      if (!location) return;
      setIsLoading(true);
      try {
        const point = await safetyService.getNearestSafePoint(location.latitude, location.longitude);
        setNearestSafePoint(point);
      } catch (e) {
        console.error('Failed to get nearest safe point', e);
      } finally {
        setIsLoading(false);
      }
    }

    if (location) {
      fetchNearest();
    } else if (!isTracking) {
      // If we're not tracking and don't have location, stop loading
      setIsLoading(false);
    }
  }, [location, safetyService, isTracking]);

  if (isLoading) {
    return (
      <div className="rounded-2xl p-4 flex items-center justify-center min-h-[120px]" style={{ background: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#34D399]" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="rounded-2xl p-4" style={{ background: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5">
            <AlertTriangle className="w-5 h-5 text-[#8892B0]" />
          </div>
          <div>
            <h4 className="font-bold text-base text-[#F0F2FF]">Location Required</h4>
            <p className="text-sm text-[#8892B0] mt-0.5">Enable GPS to find nearest safe zones</p>
          </div>
        </div>
      </div>
    );
  }

  if (!nearestSafePoint) {
    return (
      <div className="rounded-2xl p-4" style={{ background: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm text-[#8892B0]">No safety resources found within 10km.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-4 transition-all active:scale-[0.99]" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(15,20,32,1))", border: "1px solid rgba(52,211,153,0.2)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #34D399, #10B981)" }}>
            <AlertTriangle className="w-5 h-5 text-[#0F1420]" />
          </div>
          <div>
            <h4 className="font-bold text-base text-[#F0F2FF] leading-tight">
              {nearestSafePoint.name}
            </h4>
            <p className="text-sm text-[#8892B0] mt-0.5">
              Nearest {nearestSafePoint.type === 'police' ? 'Police Station' : nearestSafePoint.type === 'hospital' ? 'Hospital' : 'Safe Zone'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#34D399]">
            {(nearestSafePoint.distance / 1000).toFixed(1)} km
          </p>
          <span className="text-[10px] text-[#34D399]">Away</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button 
          onClick={() => nearestSafePoint.phone && window.open(`tel:${nearestSafePoint.phone}`)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
        >
          <Phone className="w-4 h-4 text-[#34D399]" />
          <span className="text-xs font-semibold uppercase tracking-wide">Quick Call</span>
        </button>
        <button 
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-[#0F1420] transition-colors font-semibold uppercase tracking-wide text-xs"
          style={{ background: "#34D399" }}
        >
          <Navigation className="w-4 h-4" />
          Navigate
        </button>
      </div>
    </div>
  );
};
