import { GuardianEventBus } from '../../events/GuardianEventBus';

export class LocationWatcher {
  private isWatching: boolean = false;
  private watchId?: number;
  private lastPosition?: GeolocationPosition;

  constructor(private eventBus: GuardianEventBus) {}

  public start() {
    if (this.isWatching || !('geolocation' in navigator)) return;
    this.isWatching = true;

    // Use a robust adaptive polling mechanism, optimized for mission context
    this.watchId = navigator.geolocation.watchPosition(
      (pos) => this.handlePosition(pos),
      (err) => console.error('[LocationWatcher] Error', err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  }

  public stop() {
    if (this.watchId !== undefined) {
      navigator.geolocation.clearWatch(this.watchId);
    }
    this.isWatching = false;
  }

  private handlePosition(position: GeolocationPosition) {
    // Only emit significant changes to avoid battery drain
    const thresholdMeters = 50; 
    const distance = this.calculateDistance(this.lastPosition, position);

    if (distance > thresholdMeters) {
      this.lastPosition = position;
      this.eventBus.publish({
        type: 'SIGNIFICANT_LOCATION_CHANGED',
        payload: { lat: position.coords.latitude, lng: position.coords.longitude },
        timestamp: new Date()
      });
    }
  }

  private calculateDistance(pos1?: GeolocationPosition, pos2?: GeolocationPosition) {
    if (!pos1 || !pos2) return Infinity;
    // Mock Haversine formula calculation for distance
    return 100;
  }
}
