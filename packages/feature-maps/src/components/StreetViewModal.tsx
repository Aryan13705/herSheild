'use client';

import React, { useState, useEffect } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { X, Navigation } from 'lucide-react';

export interface StreetViewModalProps {
  latitude: number;
  longitude: number;
  onClose: () => void;
}

// Inner component to handle the street view panorama instance
const StreetViewPanorama = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    const panorama = new google.maps.StreetViewPanorama(
      map.getDiv(),
      {
        position: { lat, lng },
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
        visible: true,
        addressControl: false,
        fullscreenControl: false,
        motionTracking: false,
        motionTrackingControl: false,
      }
    );
    
    map.setStreetView(panorama);
    
    return () => {
      panorama.setVisible(false);
    };
  }, [map, lat, lng]);
  
  return null;
};

export const StreetViewModal: React.FC<StreetViewModalProps> = ({
  latitude,
  longitude,
  onClose
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const [hasError, setHasError] = useState(!apiKey);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#0F1420]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <Navigation className="w-4 h-4 text-[#34D399]" />
          <span className="text-sm font-medium text-white">Live Street View</span>
        </div>
        <button 
          onClick={onClose}
          className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 w-full h-full relative">
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Navigation className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Street View Unavailable</h3>
            <p className="text-gray-400 max-w-md">
              Google Maps API Key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables to enable real-time street view.
            </p>
            <button 
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={{ lat: latitude, lng: longitude }}
              defaultZoom={18}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              className="w-full h-full"
            >
              <StreetViewPanorama lat={latitude} lng={longitude} />
            </Map>
          </APIProvider>
        )}
      </div>
    </div>
  );
};
