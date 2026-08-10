import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { createGuardianIcon } from '../icons/GuardianMarker';

interface Guardian {
  id: string;
  lat: number;
  lng: number;
  initials: string;
  isOnline: boolean;
}

// Mock data for guardians
const mockGuardians: Guardian[] = [
  { id: '1', lat: 28.7051, lng: 77.1015, initials: 'AM', isOnline: true },
  { id: '2', lat: 28.7031, lng: 77.1035, initials: 'SJ', isOnline: false },
];

export const GuardianLayer: React.FC = React.memo(() => {
  const [icons, setIcons] = useState<Record<string, any>>({});

  useEffect(() => {
    const newIcons: Record<string, any> = {};
    mockGuardians.forEach(g => {
      newIcons[g.id] = createGuardianIcon(g.initials, g.isOnline);
    });
    setIcons(newIcons);
  }, []);

  return (
    <>
      {mockGuardians.map((g) => {
        if (!icons[g.id]) return null;
        return (
          <Marker 
            key={g.id} 
            position={[g.lat, g.lng]} 
            icon={icons[g.id]} 
            zIndexOffset={500} 
          />
        );
      })}
    </>
  );
});

GuardianLayer.displayName = 'GuardianLayer';
