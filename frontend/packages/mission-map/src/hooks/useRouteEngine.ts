import { useState, useEffect } from 'react';
import * as turf from '@turf/turf';

interface RouteOptions {
  profile?: 'driving' | 'walking' | 'cycling';
  waypoints: [number, number][]; // [lng, lat]
}

export const useRouteEngine = (options: RouteOptions) => {
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      if (options.waypoints.length < 2) return;
      
      setLoading(true);
      setError(null);
      try {
        const { profile = 'walking', waypoints } = options;
        const coordinates = waypoints.map(wp => `${wp[0]},${wp[1]}`).join(';');
        
        // Use OSRM public API for the prototype
        const response = await fetch(`https://router.project-osrm.org/route/v1/${profile}/${coordinates}?overview=full&geometries=geojson`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch route');
        }

        const data = await response.json();
        if (data.code === 'Ok' && data.routes.length > 0) {
          setRoute(data.routes[0]);
        } else {
          throw new Error('No route found');
        }
      } catch (err: any) {
        setError(err.message || 'Routing failed');
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [options.profile, JSON.stringify(options.waypoints)]);

  return { route, loading, error };
};
