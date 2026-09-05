import React from 'react';
import { useLayerStore } from '../stores/useMapStore';

import { UserLayer } from './UserLayer';
import { GuardianLayer } from './GuardianLayer';
import { SafetyZonesLayer } from './SafetyZonesLayer';

interface LayerManagerProps {
  children?: React.ReactNode;
}

export const LayerManager: React.FC<LayerManagerProps> = ({ children }) => {
  const user = useLayerStore((state) => state.activeLayers.user);
  const guardians = useLayerStore((state) => state.activeLayers.guardians);

  return (
    <>
      {user && <UserLayer />}
      {guardians && <GuardianLayer />}
      <SafetyZonesLayer />
      {children}
    </>
  );
};
