import { useEffect, useState } from 'react';
import { useMapStore } from '../stores/useMapStore';

export const useLiveTracking = (missionId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const setCenter = useMapStore(state => state.setCenter);

  useEffect(() => {
    if (!missionId) return;

    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_DELAY = 10000;
    
    // Throttle state updates to max once per second
    let lastUpdate = 0;

    const connect = () => {
      ws = new WebSocket(`wss://api.hershield.com/v1/mission/${missionId}/stream`);

      ws.onopen = () => {
        setIsConnected(true);
        reconnectAttempts = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'USER_LOCATION_UPDATE') {
            const now = Date.now();
            if (now - lastUpdate > 1000) {
              setCenter([data.lat, data.lng]);
              lastUpdate = now;
            }
          }
        } catch (err) {
          console.error('Failed to parse realtime message', err);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Exponential backoff reconnect
        const delay = Math.min(1000 * Math.pow(1.5, reconnectAttempts), MAX_RECONNECT_DELAY);
        reconnectAttempts++;
        reconnectTimer = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) {
        ws.onclose = null; // Prevent reconnect on explicit unmount
        ws.close();
      }
    };
  }, [missionId, setCenter]);

  return { isConnected };
};
