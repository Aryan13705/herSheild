'use client';

import React from 'react';
import { Marker, MarkerProps } from 'react-map-gl';

export interface MapMarkerProps extends Omit<MarkerProps, 'longitude' | 'latitude'> {
  latitude: number;
  longitude: number;
  children?: React.ReactNode;
  color?: string;
  onClick?: (e: mapboxgl.MapLayerMouseEvent) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  latitude,
  longitude,
  children,
  color = '#E8537A', // Default to brand Rose Gold
  onClick,
  ...props
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      color={color}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </Marker>
  );
};
