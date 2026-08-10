export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_SECRET_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "mock-token";

export class MapsService {
  static async searchPlaces(query: string, options?: { proximity?: [number, number], limit?: number, types?: string }) {
    if (MAPBOX_ACCESS_TOKEN === "mock-token") {
      return { 
        type: "FeatureCollection", 
        features: [{ id: "mock-1", place_name: "Mock Place, Test City", center: [0, 0] }] 
      };
    }
    const params = new URLSearchParams({
      access_token: MAPBOX_ACCESS_TOKEN,
      autocomplete: "true",
    });
    if (options?.proximity) params.append("proximity", options.proximity.join(","));
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.types) params.append("types", options.types);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch places from Mapbox");
    return res.json();
  }

  static async getRoute(coordinates: [number, number][], profile: 'driving' | 'walking' | 'cycling' | 'driving-traffic' = 'driving') {
    if (MAPBOX_ACCESS_TOKEN === "mock-token") {
      return { routes: [{ duration: 1000, distance: 5000, geometry: { coordinates } }] };
    }
    const coordsString = coordinates.map(c => `${c[0]},${c[1]}`).join(";");
    const params = new URLSearchParams({
      access_token: MAPBOX_ACCESS_TOKEN,
      geometries: "geojson",
      overview: "full",
    });
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordsString}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch route from Mapbox");
    return res.json();
  }
}
