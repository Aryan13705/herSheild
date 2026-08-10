"use client";
import * as React from 'react';
import { Marker, MarkerProps } from 'react-map-gl/mapbox';

export interface MapMarkerProps extends MarkerProps {
  children?: React.ReactNode;
  color?: string;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ children, color = '#E6007A', ...props }) => {
  return (
    <Marker color={color} {...props}>
      {children}
    </Marker>
  );
};
