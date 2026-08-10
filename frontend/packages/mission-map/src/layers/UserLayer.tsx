import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { createUserIcon } from '../icons/UserMarker';
import { useMapStore } from '../stores/useMapStore';

export const UserLayer: React.FC = React.memo(() => {
  const center = useMapStore((state) => state.center);
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    // Leaflet icon needs to be generated on the client
    setIcon(createUserIcon());
  }, []);

  if (!icon) return null;

  return (
    <Marker position={center} icon={icon} zIndexOffset={1000} />
  );
});

UserLayer.displayName = 'UserLayer';
