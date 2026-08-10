import React from 'react';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

export const UserMarkerIcon = () => (
  <div className="relative flex items-center justify-center w-8 h-8">
    <div className="absolute inset-0 bg-[#E8537A] rounded-full opacity-30 animate-ping"></div>
    <div className="relative w-4 h-4 bg-[#E8537A] rounded-full border-2 border-white shadow-[0_0_15px_rgba(232,83,122,0.8)]"></div>
  </div>
);

export const createUserIcon = () => {
  return L.divIcon({
    html: renderToString(<UserMarkerIcon />),
    className: 'custom-user-marker bg-transparent border-none',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};
