'use client';

import { useState, useEffect, useCallback } from 'react';

export type LocationPermissionState = 'prompt' | 'granted' | 'denied' | 'unavailable' | 'unsupported';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

export interface UseLocationServiceReturn {
  location: LocationData | null;
  permissionState: LocationPermissionState;
  error: Error | null;
  requestPermission: () => Promise<void>;
  startTracking: () => void;
  stopTracking: () => void;
  isTracking: boolean;
}

export const useLocationService = (options?: PositionOptions): UseLocationServiceReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [permissionState, setPermissionState] = useState<LocationPermissionState>('prompt');
  const [error, setError] = useState<Error | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Check initial permission state
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setPermissionState('unsupported');
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionState(result.state as LocationPermissionState);
        result.onchange = () => {
          setPermissionState(result.state as LocationPermissionState);
        };
      }).catch(() => {
        // Fallback for browsers that don't support permission query fully
      });
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setPermissionState('unsupported');
      throw new Error('Geolocation is not supported by this browser.');
    }

    return new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPermissionState('granted');
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            heading: pos.coords.heading,
            speed: pos.coords.speed,
            timestamp: pos.timestamp,
          });
          resolve();
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setPermissionState('denied');
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            setPermissionState('unavailable');
          }
          setError(new Error(err.message));
          reject(err);
        },
        options || { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }, [options]);

  const startTracking = useCallback(() => {
    if (!('geolocation' in navigator)) return;
    
    setIsTracking(true);
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
          timestamp: pos.timestamp,
        });
        setError(null);
      },
      (err) => {
        setError(new Error(err.message));
        setIsTracking(false);
      },
      options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    setWatchId(id);
  }, [options]);

  const stopTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  }, [watchId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return {
    location,
    permissionState,
    error,
    requestPermission,
    startTracking,
    stopTracking,
    isTracking
  };
};
