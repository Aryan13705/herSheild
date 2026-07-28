import { offlineStorage } from './IndexedDBStorage';

type MutationType = 'SAVE_PLACE' | 'UPDATE_TRIP_NOTE' | 'DELETE_PLACE';

interface SyncMutation {
  id?: number;
  type: MutationType;
  payload: any;
  timestamp: number;
  status: 'pending' | 'syncing' | 'failed';
}

export class OfflineSyncService {
  private isOnline: boolean;
  private isSyncing = false;

  constructor() {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
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

  private handleOnline = () => {
    this.isOnline = true;
    console.log('[OfflineSync] Back online! Triggering background sync.');
    this.sync();
  };

  private handleOffline = () => {
    this.isOnline = false;
    console.log('[OfflineSync] Gone offline. Mutations will be queued.');
  };

  /**
   * Queue a mutation for sync. If online, tries to sync immediately.
   */
  public async queueMutation(type: MutationType, payload: any) {
    await offlineStorage.enqueueMutation({ type, payload });
    if (this.isOnline) {
      this.sync();
    }
  }

  public async getPendingCount(): Promise<number> {
    const pending = await offlineStorage.getPendingMutations();
    return pending.length;
  }

  public async sync() {
    if (this.isSyncing || !this.isOnline) return;
    this.isSyncing = true;

    try {
      const pendingMutations = await offlineStorage.getPendingMutations();
      
      for (const mutation of pendingMutations) {
        if (!mutation.id) continue;
        
        try {
          // Process the mutation (this should ideally call trpc or fetch)
          // For now, we simulate success
          await this.processMutation(mutation);
          
          // On success, remove from queue
          await offlineStorage.removeMutation(mutation.id);
        } catch (err) {
          console.error(`[OfflineSync] Failed to sync mutation ${mutation.id}`, err);
          // Leaves it in the queue for next retry
        }
      }
    } finally {
      this.isSyncing = false;
    }
  }

  private async processMutation(mutation: SyncMutation): Promise<void> {
    console.log(`[OfflineSync] Processing ${mutation.type}`, mutation.payload);
    // TODO: Connect this to actual backend endpoints (trpc client) when wired.
    return Promise.resolve();
  }
}

export const syncService = new OfflineSyncService();
