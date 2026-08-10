import { Firestore, doc, setDoc, GeoPoint, serverTimestamp, collection } from 'firebase/firestore';
import { LocationData } from '../hooks/useLocationService';

export class RealtimeSyncService {
  private db: Firestore;
  private userId: string;
  private isOnline: boolean = true;
  private offlineQueue: LocationData[] = [];

  constructor(db: Firestore, userId: string) {
    this.db = db;
    this.userId = userId;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  public destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
    }
  }

  private handleOnline = async () => {
    this.isOnline = true;
    await this.flushOfflineQueue();
  };

  private handleOffline = () => {
    this.isOnline = false;
  };

  private async flushOfflineQueue() {
    if (this.offlineQueue.length === 0) return;
    
    // In a full implementation, we might batch these or just send the most recent.
    // For now, let's just send the latest one to recover state quickly.
    const latest = this.offlineQueue[this.offlineQueue.length - 1];
    this.offlineQueue = [];
    await this.syncLocation(latest);
  }

  public async syncLocation(location: LocationData) {
    if (!this.isOnline) {
      this.offlineQueue.push(location);
      // Keep queue small
      if (this.offlineQueue.length > 50) {
        this.offlineQueue.shift();
      }
      return;
    }

    try {
      const locationRef = doc(collection(this.db, 'live_locations'), this.userId);
      await setDoc(locationRef, {
        coordinate: new GeoPoint(location.latitude, location.longitude),
        accuracy: location.accuracy,
        heading: location.heading,
        speed: location.speed,
        timestamp: serverTimestamp(),
        deviceTimestamp: location.timestamp,
        status: 'active'
      }, { merge: true });
    } catch (error) {
      console.error('Failed to sync realtime location:', error);
      this.offlineQueue.push(location);
    }
  }
}
