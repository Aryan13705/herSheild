'use client';

import React from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Compass as CompassIcon } from 'lucide-react';

export interface CompassProps {
  className?: string;
  bearing?: number;
  onClick?: () => void;
}

export const Compass: React.FC<CompassProps> = ({
  className = '',
  bearing = 0,
  onClick,
}) => {
  const { current: map } = useMap();

  const handleResetNorth = () => {
    if (map) {
      map.flyTo({ bearing: 0, pitch: 0 });
    }
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleResetNorth}
      className={`
        flex items-center justify-center 
        w-10 h-10 rounded-full 
        bg-[var(--color-surface-glass)] backdrop-blur-2xl 
        border border-[var(--color-border-medium)] shadow-lg 
        transition-transform active:scale-95
        ${className}
      `}
      aria-label="Reset North"
      title="Reset North"
    >
      <CompassIcon 
        className="w-5 h-5 text-[var(--color-text-secondary)]"
        style={{ transform: `rotate(${-bearing}deg)`, transition: 'transform 0.1s ease-out' }}
      />
    </button>
  );
};
