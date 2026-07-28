'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Clock } from 'lucide-react';

export interface PlaceResult {
  id: string;
  text: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  context?: any[];
}

export interface SearchBarProps {
  onSelect?: (place: PlaceResult) => void;
  placeholder?: string;
  className?: string;
  proximity?: { longitude: number; latitude: number };
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  placeholder = "Search places, cities, safe zones...",
  className = '',
  proximity
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        // Nominatim OpenStreetMap Geocoding API
        let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`;
        if (proximity) {
          // Nominatim uses viewbox for proximity. We'll add a rough viewbox around the proximity.
          const buffer = 0.5; // roughly 50km
          url += `&viewbox=${proximity.longitude - buffer},${proximity.latitude - buffer},${proximity.longitude + buffer},${proximity.latitude + buffer}`;
        }

        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            // Nominatim requires a user-agent to identify requests
            'User-Agent': 'HerShield-Safety-App'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Map Nominatim results to the PlaceResult interface
          const mappedResults: PlaceResult[] = data.map((item: any) => ({
            id: item.place_id.toString(),
            text: item.name || item.display_name.split(',')[0],
            place_name: item.display_name,
            center: [parseFloat(item.lon), parseFloat(item.lat)]
          }));
          setResults(mappedResults);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, proximity]);

  const handleSelect = (place: PlaceResult) => {
    setQuery(place.text);
    setIsOpen(false);
    if (onSelect) onSelect(place);
  };

  return (
    <div ref={wrapperRef} className={`relative z-50 ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[var(--color-surface-glass)] backdrop-blur-2xl border border-[var(--color-border-medium)] rounded-full py-3 pl-12 pr-10 text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] shadow-[0_0_32px_rgba(255,0,127,0.15)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-all"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-4 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface-card)] border border-[var(--color-border-medium)] rounded-[2rem] shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_32px_rgba(255,0,127,0.15)] overflow-hidden py-2 backdrop-blur-2xl">
          {isLoading ? (
            <div className="px-4 py-3 text-gray-400 text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-t-[var(--color-brand-primary)] border-[var(--color-brand-primary)]/30 rounded-full animate-spin" />
              Searching...
            </div>
          ) : (
            <ul>
              {results.map((place) => (
                <li key={place.id}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3"
                    onClick={() => handleSelect(place)}
                  >
                    <MapPin className="w-5 h-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[var(--color-text-primary)] font-medium">{place.text}</p>
                      <p className="text-[var(--color-text-secondary)] text-sm truncate w-[90%]">
                        {place.place_name}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
