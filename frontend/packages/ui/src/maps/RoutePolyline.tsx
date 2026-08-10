"use client";
import * as React from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';

export interface RoutePolylineProps {
  id: string;
  coordinates: [number, number][];
  color?: string;
  lineWidth?: number;
}

export const RoutePolyline: React.FC<RoutePolylineProps> = ({ id, coordinates, color = '#3b82f6', lineWidth = 4 }) => {
  const data: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates
    }
  };

  return (
    <Source id={`${id}-source`} type="geojson" data={data}>
      <Layer
        id={`${id}-layer`}
        type="line"
        source={`${id}-source`}
        layout={{
          'line-join': 'round',
          'line-cap': 'round'
        }}
        paint={{
          'line-color': color,
          'line-width': lineWidth
        }}
      />
    </Source>
  );
};
