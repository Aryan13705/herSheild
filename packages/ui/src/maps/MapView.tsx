"use client";
import * as React from 'react';
import Map, { MapProps } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "mock_token";

export interface MapViewProps extends MapProps {
  children?: React.ReactNode;
  theme?: 'dark' | 'light';
}

export const MapView: React.FC<MapViewProps> = ({ children, theme = 'dark', ...props }) => {
  const mapStyle = theme === 'dark' ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11";

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 12
      }}
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100%' }}
      {...props}
    >
      {children}
    </Map>
  );
};
