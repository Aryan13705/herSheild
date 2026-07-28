'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapView, 
  MapMarker, 
  SearchBar, 
  CurrentLocationButton, 
  Compass, 
  useLocationService, 
  PlaceResult,
  StreetViewModal
} from '@hershield/feature-maps';
import { 
  SafetyLocationService, 
  SafetyMapLayer, 
  SafetyResource, 
  SafetyResourceType,
  SafetyCard
} from '@hershield/feature-safety';
import { ShieldAlert, Activity, Tent, Navigation } from 'lucide-react';
import { MapProvider, MapRef } from 'react-map-gl/maplibre';
import { LiveSafetyPanel } from '@/components/LiveSafetyPanel';

const DARK_MATTER_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export default function MapPage() {
  const { location, requestPermission, startTracking, isTracking } = useLocationService();
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const mapRef = useRef<MapRef>(null);
  const [hasFlownToLocation, setHasFlownToLocation] = useState(false);
  const [activeStreetView, setActiveStreetView] = useState<{lat: number, lng: number} | null>(null);
  
  // Safety Layer State
  const [safetyResources, setSafetyResources] = useState<SafetyResource[]>([]);
  const [activeTypes, setActiveTypes] = useState<SafetyResourceType[]>(['police', 'hospital', 'shelter']);
  const [selectedResource, setSelectedResource] = useState<SafetyResource | null>(null);
  const [isMissionActive, setIsMissionActive] = useState(false);

  const safetyService = useMemo(() => {
    return new SafetyLocationService(process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '');
  }, []);

  // Auto-detect location on mount
  useEffect(() => {
    requestPermission().then(() => {
      startTracking();
    }).catch((err) => {
      console.warn("Location permission denied or unavailable:", err.message || err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to location once it's detected for the first time
  useEffect(() => {
    if (location && !hasFlownToLocation) {
      mapRef.current?.flyTo({ center: [location.longitude, location.latitude], zoom: 15, duration: 2000 });
      setHasFlownToLocation(true);
    }
  }, [location, hasFlownToLocation]);

  // Fetch nearby resources when location changes
  useEffect(() => {
    async function fetchSafetyResources() {
      if (!location) return;
      const resources = await safetyService.searchNearby(
        location.latitude, 
        location.longitude, 
        10, 
        ['police', 'hospital', 'shelter']
      );
      setSafetyResources(resources);
    }
    fetchSafetyResources();
  }, [location, safetyService]);

  const toggleType = (type: SafetyResourceType) => {
    setActiveTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <MapProvider>
      {activeStreetView && (
        <StreetViewModal 
          latitude={activeStreetView.lat}
          longitude={activeStreetView.lng}
          onClose={() => setActiveStreetView(null)}
        />
      )}

      <div className="absolute inset-0 z-0 bg-[var(--color-surface-bg)]">
        <MapView
          ref={mapRef}
          initialLatitude={location?.latitude || 40.7128}
          initialLongitude={location?.longitude || -74.0060}
          initialZoom={13}
          mapStyle={DARK_MATTER_STYLE}
          className="w-full h-full opacity-90 mix-blend-screen"
        >
          {location && (
            <MapMarker 
              latitude={location.latitude} 
              longitude={location.longitude} 
              color="#00F0FF" // Guardian Cyan for self
            />
          )}
          
          {selectedPlace && !selectedResource && (
            <MapMarker 
              latitude={selectedPlace.center[1]} 
              longitude={selectedPlace.center[0]} 
              color="#9D4EDD" // Electric Purple for destination
            />
          )}

          <SafetyMapLayer 
            resources={safetyResources} 
            activeTypes={activeTypes} 
            onResourceClick={(res) => {
              setSelectedResource(res);
              mapRef.current?.flyTo({ center: [res.longitude, res.latitude], zoom: 15, duration: 1200 });
            }}
          />
        </MapView>

        {/* HUD Ambient Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 150px rgba(6,8,22,1)" }} />

        {/* Top Floating Control Panel (Mission HUD) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-10 flex flex-col gap-3">
          {!isMissionActive ? (
            <div className="relative z-20 w-full">
              <SearchBar 
                onSelect={(place) => {
                  setSelectedPlace(place);
                  setSelectedResource(null);
                  mapRef.current?.flyTo({ center: [place.center[0], place.center[1]], zoom: 13, duration: 1500 });
                }}
                proximity={location ? { longitude: location.longitude, latitude: location.latitude } : undefined}
                className="w-full shadow-2xl shadow-[var(--color-brand-primary)]/10 border-[var(--color-border-subtle)] bg-[var(--color-surface-glass)] backdrop-blur-3xl"
              />
            </div>
          ) : (
            <LiveSafetyPanel 
              missionId="active-mission" 
              etaMinutes={12} 
              batteryLevel={88} 
              safetyScore={98}
              onEmergency={() => alert("SOS Triggered!")} 
            />
          )}

          {/* Safety Layer HUD Toggles */}
          <div className="relative z-10 flex bg-[var(--color-surface-glass)] backdrop-blur-3xl border border-[var(--color-border-medium)] rounded-full p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.8)] mx-auto w-full max-w-sm">
            <button 
              onClick={() => toggleType('police')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                activeTypes.includes('police') 
                  ? 'bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] shadow-[0_0_24px_rgba(0,240,255,0.6)]' 
                  : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Police
            </button>
            <button 
              onClick={() => toggleType('hospital')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                activeTypes.includes('hospital') 
                  ? 'bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] shadow-[0_0_24px_rgba(0,240,255,0.6)]' 
                  : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Med
            </button>
            <button 
              onClick={() => toggleType('shelter')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                activeTypes.includes('shelter') 
                  ? 'bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] shadow-[0_0_24px_rgba(0,240,255,0.6)]' 
                  : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              <Tent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Safe
            </button>
          </div>
        </div>

        {/* Legend Pill HUD */}
        <div className="absolute bottom-32 left-4 z-10 flex flex-col gap-2 p-3 bg-[var(--color-surface-glass)] backdrop-blur-3xl border border-[var(--color-border-medium)] rounded-[1.5rem] shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-safety-safe)] shadow-[0_0_8px_var(--color-safety-safe)] animate-[pulseCyan_2s_infinite]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Safe Area</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-safety-warning)] shadow-[0_0_8px_var(--color-safety-warning)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-safety-danger)] shadow-[0_0_8px_var(--color-safety-danger)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Alert</span>
          </div>
        </div>

        {/* HUD Emergency FAB (Crimson pulse) */}
        <button className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 w-16 h-16 bg-[var(--color-safety-danger)] rounded-full flex items-center justify-center shadow-[0_0_32px_rgba(255,59,48,0.8)] animate-[breathe_2s_ease-in-out_infinite] hover:scale-110 active:scale-95 transition-transform border-2 border-white/20">
          <span className="text-xs font-bold text-white uppercase tracking-widest">SOS</span>
        </button>

        {/* Map Controls */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-2 z-10 bg-[var(--color-surface-glass)] backdrop-blur-3xl border border-[var(--color-border-medium)] rounded-full p-2 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          <Compass />
          <CurrentLocationButton 
            isTracking={isTracking}
            onClick={() => {
              if (!isTracking) startTracking();
              if (location) {
                mapRef.current?.flyTo({ center: [location.longitude, location.latitude], zoom: 15, duration: 1200 });
              }
            }}
          />
        </div>

        {/* Bottom Mission Summary HUD */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[var(--color-surface-glass)] backdrop-blur-[40px] border-t border-[var(--color-border-medium)] rounded-t-[2rem] pt-3 pb-6 px-6 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-brand-tertiary)] mb-1">Mission Log</p>
              <h3 className="text-white font-light tracking-wide text-lg">
                {safetyResources.length} <span className="font-bold">secure points</span> nearby
              </h3>
              <p className="text-[var(--color-text-secondary)] text-xs mt-1 tracking-wide">
                {safetyResources.length > 0 
                  ? `[ NEAREST ]: ${safetyResources[0].distance}m — ${safetyResources[0].name.toUpperCase()}`
                  : '[ STATUS ]: No safe zones detected in current grid'}
              </p>
            </div>
            {selectedPlace && !isMissionActive && (
              <button 
                onClick={() => setIsMissionActive(true)}
                className="ml-4 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 transition-transform"
              >
                <Navigation className="w-5 h-5" />
                START
              </button>
            )}
            {isMissionActive && (
              <button 
                onClick={() => setIsMissionActive(false)}
                className="ml-4 flex items-center justify-center px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                END
              </button>
            )}
          </div>
        </div>

        {/* Selected Resource Card Overlay HUD */}
        {selectedResource && (
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-[var(--color-surface-card)]/80 backdrop-blur-[40px] p-4 rounded-t-[2rem] border-t border-[var(--color-brand-primary)] shadow-[0_-20px_60px_rgba(157,78,221,0.2)]">
            <SafetyCard 
              resource={selectedResource} 
              onCall={(phone) => window.open(`tel:${phone}`)}
              onNavigate={(res) => console.log('Navigate to:', res.name)}
              onStreetView={(res) => setActiveStreetView({ lat: res.latitude, lng: res.longitude })}
            />
          </div>
        )}
      </div>
    </MapProvider>
  );
}
