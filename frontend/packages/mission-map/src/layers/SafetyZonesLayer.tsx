import React from 'react';
import { CircleMarker, Tooltip } from 'react-leaflet';
import { useLayerStore } from '../stores/useMapStore';

interface SafetyZone {
  id: string;
  lat: number;
  lng: number;
  type: 'SAFE' | 'CAUTION' | 'ALERT';
  name: string;
}

// Using mock data based near the default New Delhi center (28.7041, 77.1025)
const mockZones: SafetyZone[] = [
  { id: '1', lat: 28.7061, lng: 77.1005, type: 'SAFE', name: 'Safe Area - Metro Station' },
  { id: '2', lat: 28.7011, lng: 77.1045, type: 'CAUTION', name: 'Caution - Poor Lighting' },
  { id: '3', lat: 28.7081, lng: 77.1055, type: 'ALERT', name: 'Alert - Recent Incident' },
];

export const SafetyZonesLayer: React.FC = React.memo(() => {
  const activeLayers = useLayerStore((state) => state.activeLayers);

  return (
    <>
      {mockZones.map((zone) => {
        // Filter based on active layers
        if (zone.type === 'SAFE' && !activeLayers.safeZones) return null;
        if ((zone.type === 'CAUTION' || zone.type === 'ALERT') && !activeLayers.riskZones) return null;

        let color = '#10b981'; // Green for SAFE
        let radius = 12;

        if (zone.type === 'CAUTION') {
          color = '#f59e0b'; // Yellow for CAUTION
          radius = 16;
        } else if (zone.type === 'ALERT') {
          color = '#ef4444'; // Red for ALERT
          radius = 20;
        }

        return (
          <CircleMarker
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={radius}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.4,
              weight: 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="font-semibold">{zone.name}</div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </>
  );
});

SafetyZonesLayer.displayName = 'SafetyZonesLayer';
