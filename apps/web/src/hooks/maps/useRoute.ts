import { trpc } from '../../lib/trpc';

export function useRoute(
  coordinates: [number, number][],
  profile: 'driving' | 'walking' | 'cycling' | 'driving-traffic' = 'driving',
  options?: { enabled?: boolean }
) {
  const { data, isLoading, error } = trpc.maps.getRoute.useQuery(
    { coordinates, profile },
    {
      enabled: coordinates.length >= 2 && (options?.enabled ?? true),
      staleTime: 1000 * 60 * 30, // 30 minutes cache for routes
    }
  );

  return {
    route: data?.routes?.[0] || null,
    isLoading,
    error,
  };
}
