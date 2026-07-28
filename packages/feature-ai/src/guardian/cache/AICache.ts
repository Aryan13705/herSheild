export class AICache {
  private cache: Map<string, { value: any, expiresAt: number }> = new Map();

  public set(key: string, value: any, ttlMs: number = 3600000) {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }

  public get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }
}
