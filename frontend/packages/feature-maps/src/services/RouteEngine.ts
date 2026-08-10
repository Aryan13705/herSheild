export type TravelMode = 'walking' | 'driving' | 'cycling' | 'driving-traffic';

export interface RouteOptions {
  profile?: TravelMode;
  alternatives?: boolean;
  geometries?: 'geojson' | 'polyline' | 'polyline6';
  steps?: boolean;
}

export interface RouteResult {
  distance: number; // in meters
  duration: number; // in seconds
  geometry: any;    // GeoJSON LineString
  legs: any[];
}

export class RouteEngine {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getRoute(
    origin: { longitude: number; latitude: number },
    destination: { longitude: number; latitude: number },
    options: RouteOptions = {}
  ): Promise<RouteResult[]> {
    const {
      profile = 'walking',
      alternatives = false,
      geometries = 'geojson',
      steps = false
    } = options;

    const coordinates = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?alternatives=${alternatives}&geometries=${geometries}&steps=${steps}&access_token=${this.accessToken}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Directions API error: ${response.statusText}`);
      }
      const data = await response.json();
      
      if (data.code !== 'Ok') {
        throw new Error(data.message || 'Failed to fetch route');
      }

      return data.routes;
    } catch (error) {
      console.error('Failed to get route:', error);
      throw error;
    }
  }
}
