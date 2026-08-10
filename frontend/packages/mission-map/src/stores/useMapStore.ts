import { create } from 'zustand';

interface MapState {
  center: [number, number];
  zoom: number;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: [28.7041, 77.1025], // Default to New Delhi
  zoom: 13,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
}));

interface LayerState {
  activeLayers: Record<string, boolean>;
  toggleLayer: (layerId: string) => void;
  setLayerVisible: (layerId: string, visible: boolean) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  activeLayers: {
    user: true,
    guardians: true,
    navigation: true,
    safeZones: true,
    riskZones: true,
    community: false,
  },
  toggleLayer: (layerId) =>
    set((state) => ({
      activeLayers: {
        ...state.activeLayers,
        [layerId]: !state.activeLayers[layerId],
      },
    })),
  setLayerVisible: (layerId, visible) =>
    set((state) => ({
      activeLayers: {
        ...state.activeLayers,
        [layerId]: visible,
      },
    })),
}));
