'use client';

import React, { useEffect } from 'react';
import { MapContainer } from 'react-leaflet';
import { TileProvider } from '../providers/TileProvider';
import { LayerManager } from '../layers/LayerManager';
import { MissionLegend } from './MissionLegend';
import 'leaflet/dist/leaflet.css';

interface MissionMapProps {
  className?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
  children?: React.ReactNode;
}

export const MissionMap: React.FC<MissionMapProps> = ({
  className = "relative w-full h-full min-h-[400px]",
  initialCenter = [28.7041, 77.1025], // Default to New Delhi for testing
  initialZoom = 13,
  children,
}) => {
  // Fix for React Leaflet missing icon issues
  useEffect(() => {
    // We will use custom divIcons, but just in case, clean up default styles
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
      iconUrl: require('leaflet/dist/images/marker-icon.png').default,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    });
  }, []);

  return (
    <div className={className}>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        zoomControl={false} // We will build custom zoom controls
        className="w-full h-full z-0"
      >
        <TileProvider theme="dark" />
        <LayerManager />
        {children}
      </MapContainer>
      <MissionLegend />
    </div>
  );
};
