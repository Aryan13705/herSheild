import { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import { useDebounce } from '../useDebounce'; // Assuming there's a useDebounce hook, I'll provide a basic one if not

export function useMapSearch(options?: { proximity?: [number, number]; limit?: number; types?: string }) {
  const [query, setQuery] = useState('');
  // Custom simple debounce implementation inline since useDebounce might not exist
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading, error } = trpc.maps.searchPlaces.useQuery(
    { 
      query: debouncedQuery, 
      proximity: options?.proximity, 
      limit: options?.limit,
      types: options?.types
    },
    {
      enabled: debouncedQuery.length > 2,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    }
  );

  return {
    query,
    setQuery,
    results: data?.features || [],
    isLoading,
    error,
  };
}
