import { useState, useEffect, useCallback } from "react";
import { getOfflineData, setOfflineData } from "../offline/safetyStorage";

export function useSafetySync<T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const syncData = useCallback(async () => {
    setIsLoading(true);
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      // Offline mode
      setIsOffline(true);
      const cached = await getOfflineData<T>(key);
      if (cached) setData(cached);
      setIsLoading(false);
      return;
    }

    setIsOffline(false);
    try {
      const freshData = await fetchFn();
      setData(freshData);
      setLastSyncedAt(new Date());
      await setOfflineData(key, freshData);
      await setOfflineData(`${key}_timestamp`, new Date().toISOString());
    } catch (err) {
      // Fallback to cache on error
      setIsOffline(true);
      const cached = await getOfflineData<T>(key);
      if (cached) setData(cached);
    } finally {
      setIsLoading(false);
    }
  }, [key, ...dependencies]);

  useEffect(() => {
    syncData();

    const handleOnline = () => syncData();
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial load of cached timestamp
    getOfflineData<string>(`${key}_timestamp`).then((ts) => {
      if (ts) setLastSyncedAt(new Date(ts));
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [syncData]);

  return { data, isOffline, lastSyncedAt, isLoading, forceSync: syncData };
}
