import React from 'react';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

interface GuardianMarkerProps {
  initials: string;
  isOnline?: boolean;
}

export const GuardianMarkerIcon: React.FC<GuardianMarkerProps> = ({ initials, isOnline = true }) => (
  <div className="relative flex items-center justify-center w-8 h-8">
    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center text-xs font-bold text-white bg-indigo-600`}>
      {initials}
    </div>
    {isOnline && (
      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
    )}
  </div>
);

export const createGuardianIcon = (initials: string, isOnline: boolean = true) => {
  return L.divIcon({
    html: renderToString(<GuardianMarkerIcon initials={initials} isOnline={isOnline} />),
    className: 'custom-guardian-marker bg-transparent border-none',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};
