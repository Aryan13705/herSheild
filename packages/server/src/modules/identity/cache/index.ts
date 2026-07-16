export interface ICacheStore<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

// Prepare interfaces for future Redis implementation
export interface ISessionCache extends ICacheStore<any> {}
export interface IPermissionCache extends ICacheStore<string[]> {}
export interface IUserCache extends ICacheStore<any> {}

// In-memory fallback (for development/testing before Redis)
export class InMemoryCache<T> implements ICacheStore<T> {
  private store = new Map<string, { value: T; expiresAt: number }>();

  async get(key: string): Promise<T | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

export const sessionCache = new InMemoryCache<any>();
export const permissionCache = new InMemoryCache<string[]>();
export const userCache = new InMemoryCache<any>();
