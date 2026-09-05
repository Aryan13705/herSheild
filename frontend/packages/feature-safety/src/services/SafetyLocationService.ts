import * as turf from '@turf/turf';
import { SafetyResource, SafetyResourceType } from '../types';
import { offlineStorage } from '@hershield/feature-offline';

export class SafetyLocationService {
  private mapboxToken: string;

  constructor(mapboxToken: string) {
    this.mapboxToken = mapboxToken;
  }

  /**
   * Search for nearby safety resources using Mapbox POI search
   * Maps Mapbox results to our SafetyResource interface and calculates distances.
   */
  public async searchNearby(
    lat: number,
    lng: number,
    radiusKm: number,
    types: SafetyResourceType[]
  ): Promise<SafetyResource[]> {
    // Mapbox token check removed as we use Nominatim OpenStreetMap API

    try {
      const results: SafetyResource[] = [];
      const buffer = radiusKm / 111.32; // Rough conversion from km to degrees (1 degree lat ~= 111.32 km)
      const viewbox = `${lng - buffer},${lat - buffer},${lng + buffer},${lat + buffer}`;

      for (const type of types) {
        const query = this.getQueryForType(type);
        
        // Nominatim API for POI search bounded by a viewbox
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&viewbox=${viewbox}&bounded=1&limit=10`;
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'HerShield-Safety-App'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch from Nominatim');
        
        const data = await response.json();
        
        data.forEach((feature: any) => {
          const plng = parseFloat(feature.lon);
          const plat = parseFloat(feature.lat);
          
          // Calculate precise distance using Turf.js
          const from = turf.point([lng, lat]);
          const to = turf.point([plng, plat]);
          const distanceKm = turf.distance(from, to, { units: 'kilometers' });

          if (distanceKm <= radiusKm) {
            results.push({
              id: feature.place_id.toString(),
              name: feature.name || feature.display_name.split(',')[0],
              type,
              latitude: plat,
              longitude: plng,
              distance: Math.round(distanceKm * 1000), // convert to meters
              address: feature.display_name,
              // phone: Nominatim doesn't easily return phone numbers in basic format without extentsions
            });
          }
        });
      }

      // Sort by closest first
      results.sort((a, b) => a.distance - b.distance);

      // Cache the results for offline use in IndexedDB
      await this.cacheResults(results);

      return results;
    } catch (error) {
      console.error('Error fetching safety resources:', error);
      return this.getOfflineCache();
    }
  }

  /**
   * Get the absolute nearest safe point regardless of type
   */
  public async getNearestSafePoint(lat: number, lng: number): Promise<SafetyResource | null> {
    const nearby = await this.searchNearby(lat, lng, 10, ['police', 'hospital', 'shelter']);
    return nearby.length > 0 ? nearby[0] : null;
  }

  private getQueryForType(type: SafetyResourceType): string {
    switch (type) {
      case 'police': return 'police station';
      case 'hospital': return 'hospital';
      case 'shelter': return 'women shelter';
      case 'emergency': return 'emergency room';
      default: return 'police station';
    }
  }

  private async cacheResults(resources: SafetyResource[]) {
    try {
      await offlineStorage.cacheSafetyResources(resources);
    } catch (e) {
      console.error('Failed to cache safety resources in IDB', e);
    }
  }

  private async getOfflineCache(): Promise<SafetyResource[]> {
    try {
      return await offlineStorage.getCachedSafetyResources();
    } catch (e) {
      console.error('Failed to read offline safety cache from IDB', e);
      return [];
    }
  }
}
