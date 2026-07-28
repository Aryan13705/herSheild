"use client";
import * as React from 'react';
import { NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl/mapbox';

export interface MapControlsProps {
  showNavigation?: boolean;
  showFullscreen?: boolean;
  showScale?: boolean;
  showGeolocate?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const MapControls: React.FC<MapControlsProps> = ({
  showNavigation = true,
  showFullscreen = false,
  showScale = true,
  showGeolocate = false,
  position = 'top-right'
}) => {
  return (
    <>
      {showFullscreen && <FullscreenControl position={position} />}
      {showNavigation && <NavigationControl position={position} />}
      {showGeolocate && (
        <GeolocateControl
          position={position}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      )}
      {showScale && <ScaleControl />}
    </>
  );
};
