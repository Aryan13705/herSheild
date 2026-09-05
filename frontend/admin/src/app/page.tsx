/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { AlertTriangle, MapPin, Phone, Users, Clock, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { trpc } from '@/lib/trpc';

interface MissionMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: any[];
  onMarkerClick?: (id: string) => void;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
}

// Dynamically import the map component so it doesn't run on the server
const MissionMap = dynamic<MissionMapProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => import('@hershield/mission-map').then((mod) => mod.MissionMap as any) as any,
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Loading Map...</div> }
);

export default function AdminDashboard() {
  const utils = trpc.useUtils();
  
  // Fetch active incidents using TRPC, polling every 3 seconds for real-time effect
  const { data: activeIncidents = [], isLoading } = trpc.safety.incident.getActiveIncidents.useQuery(undefined, {
    refetchInterval: 3000,
  });

  const resolveIncident = trpc.safety.incident.resolveIncident.useMutation({
    onSuccess: () => {
      utils.safety.incident.getActiveIncidents.invalidate();
    }
  });

  const handleResolve = (id: string) => {
    if (window.confirm("Mark this incident as RESOLVED?")) {
      resolveIncident.mutate({ incidentId: id });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-20">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 text-rose-500 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">Active SOS Alerts</span>
          </div>
          <span className="text-4xl font-bold text-white">{activeIncidents.length}</span>
        </div>
        <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <Users className="w-5 h-5" />
            <span className="font-bold">Active Safe Trips</span>
          </div>
          <span className="text-4xl font-bold text-white">1,248</span>
        </div>
        <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">Safe Zones Online</span>
          </div>
          <span className="text-4xl font-bold text-white">43</span>
        </div>
        <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-bold">Avg Response Time</span>
          </div>
          <span className="text-4xl font-bold text-white">1.2m</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Map */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-800 flex flex-col overflow-hidden h-[600px] shadow-2xl relative">
          <div className="p-4 border-b border-slate-800 bg-[#0f172a]/50 flex items-center justify-between z-10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              Global Incident Map
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SYSTEM ONLINE
              </span>
            </div>
          </div>
          <div className="flex-1 relative z-0">
            <MissionMap
              center={[20, 0]}
              zoom={2}
              markers={activeIncidents.map((inc: any) => ({
                id: inc.id,
                position: (inc.locationApprox as [number, number]) || [0, 0],
                title: 'SOS Alert',
                type: 'danger'
              }))}
            />
          </div>
        </div>

        {/* Right Column: Alert Queue */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-800 flex flex-col overflow-hidden h-[600px] shadow-2xl">
          <div className="p-4 border-b border-slate-800 bg-[#0f172a]/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Priority Incident Queue
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {isLoading ? (
              <div className="text-center text-slate-500 py-10 animate-pulse">Loading live incidents...</div>
            ) : activeIncidents.length === 0 ? (
              <div className="text-center text-slate-500 py-10">No active incidents. Systems normal.</div>
            ) : (
              activeIncidents.map((incident: any) => (
                <div key={incident.id} className="bg-[#0f172a] rounded-xl border border-rose-500/30 p-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white uppercase tracking-wider">
                          SOS TRIGGERED
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(incident.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-lg">User ID: {incident.userId.substring(0, 8)}...</h4>
                    </div>
                    <button 
                      onClick={() => handleResolve(incident.id)}
                      disabled={resolveIncident.isPending}
                      className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 transition-colors"
                      title="Mark Resolved"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-4">{incident.description}</p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Track Live
                    </button>
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700">
                      <Phone className="w-4 h-4" />
                      Dispatch
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
