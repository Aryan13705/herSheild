import { LiveMissionEngine } from '../mission/LiveMissionEngine';

export class GuardianTrackingEngine {
  private watchId: number | null = null;

  constructor(private missionEngine: LiveMissionEngine) {}

  /**
   * Uses navigator.geolocation.watchPosition for continuous background tracking.
   */
  public startTracking() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      console.warn('[TrackingEngine] Geolocation API not available.');
      return;
    }

    if (this.watchId !== null) return;

    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.handlePositionUpdate(position),
      (error) => console.error('[TrackingEngine] Location error:', error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
    console.log('[TrackingEngine] Live tracking started.');
  }

  public stopTracking() {
    if (this.watchId !== null && typeof navigator !== 'undefined') {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      console.log('[TrackingEngine] Live tracking stopped.');
    }
  }

  private handlePositionUpdate(position: GeolocationPosition) {
    const session = this.missionEngine.getActiveSession();
    if (!session) return;

    session.lastKnownLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      timestamp: new Date(position.timestamp)
    };
    
    // In production, emit LOCATION_UPDATED event to GuardianEventBus
  }
}
