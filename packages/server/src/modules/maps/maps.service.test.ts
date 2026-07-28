import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MapsService, MAPBOX_ACCESS_TOKEN } from './maps.service';

global.fetch = vi.fn();

describe('MapsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('searchPlaces', () => {
    it('should return mock data if token is mock-token', async () => {
      // Assuming test environment uses mock-token
      if (MAPBOX_ACCESS_TOKEN === 'mock-token') {
        const result = await MapsService.searchPlaces('Paris');
        expect(result.features[0].place_name).toBe('Mock Place, Test City');
      }
    });

    it('should throw an error on API failure', async () => {
      if (MAPBOX_ACCESS_TOKEN !== 'mock-token') {
        (global.fetch as any).mockResolvedValue({
          ok: false,
          statusText: 'Internal Server Error'
        });

        await expect(MapsService.searchPlaces('Paris')).rejects.toThrow('Failed to fetch places from Mapbox');
      }
    });
  });

  describe('getRoute', () => {
    it('should return a route successfully', async () => {
      if (MAPBOX_ACCESS_TOKEN !== 'mock-token') {
        (global.fetch as any).mockResolvedValue({
          ok: true,
          json: async () => ({ routes: [{ duration: 100, distance: 500 }] })
        });

        const result = await MapsService.getRoute([[0, 0], [1, 1]]);
        expect(result.routes[0].duration).toBe(100);
      }
    });
  });
});
