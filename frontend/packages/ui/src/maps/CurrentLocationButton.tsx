"use client";
import * as React from 'react';
import { useMap } from 'react-map-gl/mapbox';
import { Locate, LocateFixed, LocateOff } from 'lucide-react';
import { Button } from '../components/Button';

export const CurrentLocationButton: React.FC = () => {
  const { current: map } = useMap();
  const [permissionState, setPermissionState] = React.useState<PermissionState | null>(null);

  React.useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        setPermissionState(result.state);
        result.onchange = () => {
          setPermissionState(result.state);
        };
      });
    }
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 14,
        });
      },
      (error) => {
        console.error('Error fetching location', error);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleLocate}
      title="Current Location"
      className="bg-background shadow-md rounded-full w-10 h-10"
    >
      {permissionState === 'denied' ? (
        <LocateOff className="h-5 w-5 text-destructive" />
      ) : permissionState === 'granted' ? (
        <LocateFixed className="h-5 w-5 text-primary" />
      ) : (
        <Locate className="h-5 w-5" />
      )}
    </Button>
  );
};
