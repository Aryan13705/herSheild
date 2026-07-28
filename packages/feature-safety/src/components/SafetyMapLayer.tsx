import React, { useState } from 'react';
import { MapMarker } from '@hershield/feature-maps';
import { SafetyResource, SafetyResourceType } from '../types';

interface SafetyMapLayerProps {
  resources: SafetyResource[];
  onResourceClick?: (resource: SafetyResource) => void;
  activeTypes: SafetyResourceType[];
}

export const SafetyMapLayer: React.FC<SafetyMapLayerProps> = ({ 
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
      {visibleResources.map(resource => (
        <MapMarker
          key={resource.id}
          latitude={resource.latitude}
          longitude={resource.longitude}
          color={getMarkerColor(resource.type)}
          onClick={() => onResourceClick?.(resource)}
        />
      ))}
    </>
  );
};
