import { useEffect, useState } from 'react';
import { useMapStore } from '../stores/useMapStore';

export const useLiveTracking = (missionId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const setCenter = useMapStore(state => state.setCenter);

  useEffect(() => {
    if (!missionId) return;

    // Stub for WebSocket connection
    const ws = new WebSocket(`wss://api.hershield.com/v1/mission/${missionId}/stream`);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'USER_LOCATION_UPDATE') {
          setCenter([data.lat, data.lng]);
        }
      } catch (err) {
        console.error('Failed to parse realtime message', err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [missionId, setCenter]);

  return { isConnected };
};
