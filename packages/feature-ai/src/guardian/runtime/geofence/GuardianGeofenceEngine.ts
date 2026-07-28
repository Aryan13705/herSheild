import { GuardianEventBus } from '../../events/GuardianEventBus';

export interface GeofenceZone {
  id: string;
  type: 'SAFE' | 'RISK' | 'HOSPITAL' | 'POLICE' | 'DESTINATION';
  lat: number;
  lng: number;
  radiusMeters: number;
}

export class GuardianGeofenceEngine {
  private zones: Map<string, GeofenceZone> = new Map();
  private activeZoneIds: Set<string> = new Set();

  constructor(private eventBus: GuardianEventBus) {}

  public registerZone(zone: GeofenceZone) {
    this.zones.set(zone.id, zone);
  }

  public checkLocation(lat: number, lng: number) {
    this.zones.forEach(zone => {
      const distance = this.calculateDistance(lat, lng, zone.lat, zone.lng);
      const isInside = distance <= zone.radiusMeters;
      const wasInside = this.activeZoneIds.has(zone.id);

      if (isInside && !wasInside) {
        this.activeZoneIds.add(zone.id);
        this.emitEnterEvent(zone);
      } else if (!isInside && wasInside) {
        this.activeZoneIds.delete(zone.id);
        this.emitExitEvent(zone);
      }
    });
  }

  private emitEnterEvent(zone: GeofenceZone) {
    if (zone.type === 'SAFE') {
      this.eventBus.publish({ type: 'ENTERED_SAFE_ZONE', payload: { zone }, timestamp: new Date() });
    } else if (zone.type === 'RISK') {
      this.eventBus.publish({ type: 'ENTERED_RISK_ZONE', payload: { zone }, timestamp: new Date() });
    }
  }

  private emitExitEvent(zone: GeofenceZone) {
    if (zone.type === 'SAFE') {
      this.eventBus.publish({ type: 'EXITED_SAFE_ZONE', payload: { zone }, timestamp: new Date() });
    } else if (zone.type === 'RISK') {
      this.eventBus.publish({ type: 'EXITED_RISK_ZONE', payload: { zone }, timestamp: new Date() });
    }
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    // Mock Haversine implementation
    return 10; 
  }
}
