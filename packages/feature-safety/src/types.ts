export type SafetyResourceType = 'police' | 'hospital' | 'shelter' | 'emergency';

export interface SafetyResource {
  id: string;
  name: string;
  type: SafetyResourceType;
  latitude: number;
  longitude: number;
  distance: number; // in meters
  eta?: string; // e.g., "5 mins"
  phone?: string;
  isOpen?: boolean;
  address?: string;
}
