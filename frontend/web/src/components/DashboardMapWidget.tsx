'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation } from 'lucide-react';
import dynamic from 'next/dynamic';

const WidgetMap = dynamic(() => import('react-leaflet').then(async (mod) => {
  const { MapContainer, TileLayer, CircleMarker } = mod;
  
  // Fix Leaflet issues dynamically
  await import('leaflet');
  import('leaflet/dist/leaflet.css');

  const Component = ({ lat, lng }: { lat: number, lng: number }) => (
    <MapContainer 
      center={[lat, lng]} 
      zoom={11} 
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      attributionControl={false}
      className="w-full h-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <CircleMarker
        center={[lat, lng]}
        radius={8}
        pathOptions={{
          color: '#E8537A',
          fillColor: '#E8537A',
          fillOpacity: 1,
          weight: 2
        }}
      />
    </MapContainer>
  );
  Component.displayName = 'WidgetMapComponent';
  return Component;
}), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1A1A1A] animate-pulse" />
});

export const DashboardMapWidget = () => {
  // Dummy coordinates for Paris, France
  const destLat = 48.8566;
  const destLng = 2.3522;

  return (
    <div className="rounded-2xl overflow-hidden relative transition-all active:scale-[0.99]" style={{ background: "#0F1420", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="h-40 w-full relative">
        <WidgetMap lat={destLat} lng={destLng} />
        
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-transparent to-transparent pointer-events-none z-10" />
      </div>

      <div className="p-4 relative z-20 -mt-6">
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
