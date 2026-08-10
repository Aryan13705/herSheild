import React from 'react';
import { useLayerStore } from '../stores/useMapStore';

export const MissionLegend: React.FC = () => {
  const { activeLayers, toggleLayer } = useLayerStore();

  const layers = [
    { id: 'user', label: 'My Location', color: 'bg-[#E8537A]' },
    { id: 'guardians', label: 'Guardians', color: 'bg-indigo-600' },
    { id: 'navigation', label: 'Safe Route', color: 'bg-sky-400' },
    { id: 'safeZones', label: 'Safe Zones', color: 'bg-emerald-500' },
    { id: 'riskZones', label: 'Risk Areas', color: 'bg-rose-600' },
  ];

  return (
    <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-[1000] shadow-2xl">
      <h3 className="text-white text-sm font-bold mb-3 tracking-wide uppercase">Map Layers</h3>
      <div className="space-y-2">
        {layers.map((layer) => (
          <label key={layer.id} className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={activeLayers[layer.id as keyof typeof activeLayers] || false}
                onChange={() => toggleLayer(layer.id)}
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                activeLayers[layer.id as keyof typeof activeLayers] 
                  ? 'border-transparent bg-white' 
                  : 'border-gray-500 bg-transparent group-hover:border-gray-400'
              }`}>
                {activeLayers[layer.id as keyof typeof activeLayers] && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${layer.color}`}></div>
              <span className={`text-sm ${activeLayers[layer.id as keyof typeof activeLayers] ? 'text-white' : 'text-gray-400'}`}>
                {layer.label}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
