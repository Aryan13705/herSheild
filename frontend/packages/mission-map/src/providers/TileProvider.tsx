import React from 'react';
import { TileLayer } from 'react-leaflet';

type MapTheme = 'dark' | 'light' | 'satellite';

interface TileProviderProps {
  theme?: MapTheme;
}

export const TileProvider: React.FC<TileProviderProps> = ({ theme = 'dark' }) => {
  const getUrl = () => {
    switch (theme) {
      case 'dark':
        // CartoDB Dark Matter
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      case 'light':
        // CartoDB Positron
        return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      case 'satellite':
        // Esri World Imagery (example)
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      default:
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    }
  };

  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      url={getUrl()}
    />
  );
};
