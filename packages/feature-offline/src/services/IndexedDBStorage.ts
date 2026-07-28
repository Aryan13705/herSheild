import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'hershield_offline_db';
const DB_VERSION = 1;

export class IndexedDBStorage {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private initDB() {
    if (typeof window === 'undefined') {
      return Promise.resolve(null as any);
    }
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('safety_resources')) {
          db.createObjectStore('safety_resources', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('trips')) {
          db.createObjectStore('trips', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('route_cache')) {
          db.createObjectStore('route_cache', { keyPath: 'id' });
        }
      },
    });
  }

  // Generic Operations
  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    const db = await this.dbPromise;
    if (!db) return undefined;
    return db.get(storeName, key);
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.dbPromise;
    if (!db) return [];
    return db.getAll(storeName);
  }

  async put(storeName: string, value: any): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;
    await db.put(storeName, value);
  }

  async delete(storeName: string, key: string): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;
    await db.delete(storeName, key);
  }

  async clear(storeName: string): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;
    await db.clear(storeName);
  }

  // Safety Specific
  async cacheSafetyResources(resources: any[]) {
    const db = await this.dbPromise;
    if (!db) return;
    const tx = db.transaction('safety_resources', 'readwrite');
    // Clear old cache to avoid stale data accumulating infinitely
    await tx.objectStore('safety_resources').clear();
    for (const res of resources) {
      await tx.objectStore('safety_resources').put(res);
    }
    await tx.done;
  }

  async getCachedSafetyResources() {
    return this.getAll('safety_resources');
  }

  // Sync Queue Specific
  async enqueueMutation(mutation: any) {
    const db = await this.dbPromise;
    if (!db) return;
    await db.add('sync_queue', {
      ...mutation,
      timestamp: Date.now(),
      status: 'pending'
    });
  }

  async getPendingMutations() {
    const db = await this.dbPromise;
    if (!db) return [];
    const all = await db.getAll('sync_queue');
    return all.filter(m => m.status === 'pending');
  }

  async removeMutation(id: number) {
    await this.delete('sync_queue', id.toString());
  }
}

export const offlineStorage = new IndexedDBStorage();
