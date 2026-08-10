import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export interface MapControllerProps {
  center?: [number, number];
  zoom?: number;
}

export const MapController: React.FC<MapControllerProps> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom ?? map.getZoom(), {
        duration: 1.5,
      });
    }
  }, [center, zoom, map]);

  return null;
};
