import React from 'react';
import { GeoJSON } from 'react-leaflet';

interface RouteLayerProps {
  routeGeoJSON: any; // GeoJSON geometry from OSRM
  color?: string;
}

export const RouteLayer: React.FC<RouteLayerProps> = React.memo(({ routeGeoJSON, color = '#38bdf8' }) => {
  if (!routeGeoJSON) return null;

  return (
    <GeoJSON 
      data={routeGeoJSON}
      style={{
        color: color,
        weight: 6,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round',
      }}
    />
  );
});

RouteLayer.displayName = 'RouteLayer';
