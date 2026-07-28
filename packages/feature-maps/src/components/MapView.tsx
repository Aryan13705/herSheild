'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Map, { 
  NavigationControl, 
  GeolocateControl,
  MapRef,
  ViewStateChangeEvent,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface MapViewProps {
  children?: React.ReactNode;
  initialLatitude?: number;
  initialLongitude?: number;
  initialZoom?: number;
  mapStyle?: any;
  onMove?: (e: ViewStateChangeEvent) => void;
  className?: string;
  showNavigationControls?: boolean;
  interactive?: boolean;
  padding?: { top: number; bottom: number; left: number; right: number };
}

// Default style using OpenStreetMap free tiles (No API Key Required)
const DEFAULT_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom: 19
    }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }
  ]
};

export const MapView = React.forwardRef<MapRef, MapViewProps>(
  (
    { 
      children, 
      initialLatitude = 0, 
      initialLongitude = 0, 
      initialZoom = 2,
      mapStyle = DEFAULT_STYLE,
      onMove,
      className = '',
      showNavigationControls = false,
      interactive = true,
      padding
    }, 
    ref
  ) => {
    const [viewState, setViewState] = useState({
      latitude: initialLatitude,
      longitude: initialLongitude,
      zoom: initialZoom,
      bearing: 0,
      pitch: 0
    });

    const handleMove = useCallback((evt: ViewStateChangeEvent) => {
      setViewState(evt.viewState);
      if (onMove) {
        onMove(evt);
      }
    }, [onMove]);

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Map
          ref={ref}
          {...viewState}
          onMove={handleMove}
          mapStyle={mapStyle}
          interactive={interactive}
          padding={padding}
          style={{ width: '100%', height: '100%' }}
          reuseMaps
        >
          {children}
          
          {showNavigationControls && (
            <div className="absolute right-4 bottom-24 z-10">
              <NavigationControl showCompass={false} />
            </div>
          )}
        </Map>
      </div>
    );
  }
);

MapView.displayName = 'MapView';
