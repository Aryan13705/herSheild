import React from 'react';
import { Phone, Navigation, MapPin, Share2, BookmarkPlus, Clock, AlertTriangle } from 'lucide-react';
import { SafetyResource } from '../types';

interface SafetyCardProps {
  resource: SafetyResource;
  onNavigate?: (resource: SafetyResource) => void;
  onCall?: (phone: string) => void;
  onShare?: (resource: SafetyResource) => void;
  onSave?: (resource: SafetyResource) => void;
  onStreetView?: (resource: SafetyResource) => void;
}

export const SafetyCard: React.FC<SafetyCardProps> = ({ 
  resource, 
  onNavigate, 
  onCall, 
  onShare, 
  onSave,
  onStreetView
}) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'police': return <AlertTriangle className="w-5 h-5 text-[#34D399]" />;
      case 'hospital': return <div className="text-[var(--color-brand-primary)] font-bold text-lg">+</div>;
      case 'shelter': return <MapPin className="w-5 h-5 text-[var(--color-brand-secondary)]" />;
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-[#F4A347]" />;
      default: return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => resource.isOpen !== false ? '#34D399' : '#FF007F';
  
  return (
    <div 
      className="p-4 rounded-xl mb-3 flex flex-col gap-3 transition-all active:scale-[0.99] bg-transparent border-none"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold text-sm leading-tight">{resource.name}</h3>
            <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">{resource.address}</p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[var(--color-text-primary)] font-bold text-sm">
            {(resource.distance / 1000).toFixed(1)} km
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ background: getStatusColor() }} 
            />
            <span className="text-[10px]" style={{ color: getStatusColor() }}>
              {resource.isOpen !== false ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      {resource.eta && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
          <Clock className="w-3.5 h-3.5" />
          <span>ETA: {resource.eta}</span>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 mt-2">
        <button 
          onClick={() => onCall?.(resource.phone || '911')}
          className="flex flex-col items-center justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <Phone className="w-4 h-4 mb-1 text-[#34D399]" />
          <span className="text-[9px] uppercase tracking-wider">Call</span>
        </button>
        
        <button 
          onClick={() => onNavigate?.(resource)}
          className="flex flex-col items-center justify-center py-2 rounded-lg bg-[var(--color-brand-primary)]/10 hover:bg-[var(--color-brand-primary)]/20 text-[var(--color-text-primary)] transition-colors border border-[var(--color-brand-primary)]/30"
        >
          <Navigation className="w-4 h-4 mb-1 text-[var(--color-brand-primary)]" />
          <span className="text-[9px] uppercase tracking-wider text-[var(--color-brand-primary)]">Navigate</span>
        </button>

        <button 
          onClick={() => onStreetView?.(resource)}
          className="flex flex-col items-center justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--color-text-primary)] transition-colors"
        >
          <MapPin className="w-4 h-4 mb-1 text-[#F4A347]" />
          <span className="text-[9px] uppercase tracking-wider text-[#F4A347]">Walk</span>
        </button>

        <button 
          onClick={() => onShare?.(resource)}
          className="flex flex-col items-center justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--color-text-primary)] transition-colors"
        >
          <Share2 className="w-4 h-4 mb-1 text-[var(--color-text-secondary)]" />
          <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-secondary)]">Share</span>
        </button>

        <button 
          onClick={() => onSave?.(resource)}
          className="flex flex-col items-center justify-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--color-text-primary)] transition-colors"
        >
          <BookmarkPlus className="w-4 h-4 mb-1 text-[var(--color-brand-secondary)]" />
          <span className="text-[9px] uppercase tracking-wider text-[var(--color-brand-secondary)]">Save</span>
        </button>
      </div>
    </div>
  );
};
