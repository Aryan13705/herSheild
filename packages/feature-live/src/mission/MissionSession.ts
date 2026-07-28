export type MissionState = 'PENDING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export interface MissionSession {
  id: string;
  userId: string;
  state: MissionState;
  startTime: Date;
  endTime?: Date;
  destination?: { lat: number; lng: number; address?: string };
  routeSegments: any[]; // Placeholder for route data
  lastKnownLocation?: { lat: number; lng: number; timestamp: Date };
  offlineMode: boolean;
}
