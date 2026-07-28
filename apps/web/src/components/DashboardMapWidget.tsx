'use client';

import React from 'react';
import { MapView, MapMarker } from '@hershield/feature-maps';
import Link from 'next/link';
import { MapPin, Navigation } from 'lucide-react';

export const DashboardMapWidget = () => {
  // Dummy coordinates for Paris, France
  const destLat = 48.8566;
  const destLng = 2.3522;

  return (
    <div className="rounded-2xl overflow-hidden relative transition-all active:scale-[0.99]" style={{ background: "#0F1420", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="h-40 w-full relative">
        <MapView
          initialLatitude={destLat}
          initialLongitude={destLng}
          initialZoom={11}
          interactive={false} // Disable dragging for widget
        >
          <MapMarker latitude={destLat} longitude={destLng} color="#E8537A" />
        </MapView>
        
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-4 relative z-10 -mt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-bold text-base" style={{ color: "#F0F2FF" }}>
              Solo Paris Getaway
            </h4>
            <p className="text-sm mt-0.5" style={{ color: "#8892B0" }}>
              Aug 10, 2026 · 25 days away
            </p>
          </div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#131B2C]/90 backdrop-blur-md"
            style={{ color: "#F4A347", border: "1px solid rgba(244,163,71,0.3)" }}
          >
            Upcoming
          </span>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#8892B0]" />
            <span className="text-xs" style={{ color: "#8892B0" }}>Paris, France</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-[#8892B0]" />
            <span className="text-xs" style={{ color: "#8892B0" }}>Distance: 3,450 km</span>
          </div>
        </div>

        <Link href="/map" className="mt-4 block w-full text-center text-xs font-semibold py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white border border-white/10">
          Open Full Map
        </Link>
      </div>
    </div>
  );
};
