'use client';

import React from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Locate, LocateFixed } from 'lucide-react';

export interface CurrentLocationButtonProps {
  className?: string;
  isTracking?: boolean;
  onClick?: () => void;
}

export const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  className = '',
  isTracking = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center 
        w-10 h-10 rounded-full 
        bg-[var(--color-surface-glass)] backdrop-blur-2xl 
        border border-[var(--color-border-medium)] shadow-lg 
        transition-all active:scale-95
        ${className}
      `}
      aria-label="Find my location"
    >
      {isTracking ? (
        <LocateFixed className="w-5 h-5 text-[var(--color-brand-primary)]" />
      ) : (
        <Locate className="w-5 h-5 text-[var(--color-text-secondary)]" />
      )}
    </button>
  );
};
