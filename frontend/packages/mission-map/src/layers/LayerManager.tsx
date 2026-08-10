import React from 'react';
import { useLayerStore } from '../stores/useMapStore';

import { UserLayer } from './UserLayer';
import { GuardianLayer } from './GuardianLayer';
import { SafetyZonesLayer } from './SafetyZonesLayer';

interface LayerManagerProps {
  children?: React.ReactNode;
}

export const LayerManager: React.FC<LayerManagerProps> = ({ children }) => {
  const activeLayers = useLayerStore((state) => state.activeLayers);

  return (
    <>
      {activeLayers.user && <UserLayer />}
      {activeLayers.guardians && <GuardianLayer />}
      <SafetyZonesLayer />
      {children}
    </>
  );
};
