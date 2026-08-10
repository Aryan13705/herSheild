import React from 'react';
import { CircleMarker, Tooltip } from 'react-leaflet';
import { SafetyResource, SafetyResourceType } from '../types';

interface LeafletSafetyMapLayerProps {
  resources: SafetyResource[];
  onResourceClick?: (resource: SafetyResource) => void;
  activeTypes: SafetyResourceType[];
}

export const LeafletSafetyMapLayer: React.FC<LeafletSafetyMapLayerProps> = ({ 
  resources, 
  onResourceClick, 
  activeTypes 
}) => {
  const getMarkerColor = (type: SafetyResourceType) => {
    switch (type) {
      case 'police': return '#34D399'; // Emerald
      case 'hospital': return '#E8537A'; // Rose Gold
      case 'shelter': return '#9B6DFF'; // Purple
      case 'emergency': return '#F4A347'; // Orange
      default: return '#8892B0';
    }
  };

  const visibleResources = resources.filter(r => activeTypes.includes(r.type));

  return (
    <>
      {visibleResources.map(resource => {
        const color = getMarkerColor(resource.type);
        return (
          <CircleMarker
            key={resource.id}
            center={[resource.latitude, resource.longitude]}
            radius={8}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 1,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onResourceClick?.(resource),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="font-semibold text-xs">{resource.name}</div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </>
  );
};
