import { useState, useEffect } from 'react';

export function useLocationPermissions() {
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        setPermissionState(result.state);
        result.onchange = () => {
          setPermissionState(result.state);
        };
      });
    }
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError);
      return;
    }
    
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return {
    permissionState,
    location,
    error,
    isLoading,
    requestLocation,
    isDenied: permissionState === 'denied',
    isGranted: permissionState === 'granted',
  };
}
