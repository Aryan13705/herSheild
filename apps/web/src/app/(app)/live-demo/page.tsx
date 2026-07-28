'use client';

import React, { useState } from 'react';
import { Card, Badge } from '@hershield/ui';
import { Battery, WifiOff, ShieldCheck, TriangleAlert } from 'lucide-react';

export default function LiveDemoPage() {
  const [eta, setEta] = useState(15);
  const [battery, setBattery] = useState(82);
  const [offline, setOffline] = useState(false);
  const [score, setScore] = useState(98);

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden font-sans">
      {/* Mock Map Background to simulate the main Map screen */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-74.006,40.7128,13/1440x900?access_token=YOUR_MAPBOX_TOKEN')] bg-cover bg-center" />
      
      {/* 
        This is the LiveSafetyPanel component we built in Phase 9.
        It is rendered here in isolation so you can interact with it.
      */}
      <Card className="absolute top-8 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50 bg-black/70 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 flex flex-col gap-3 rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.8)] rounded-b-full"></div>

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400 w-5 h-5" />
            <span className="text-white font-semibold text-sm tracking-wide">Guardian Active</span>
          </div>
          <div className="flex gap-2">
            {offline && (
              <Badge variant="destructive" className="bg-red-500/20 text-red-400 border border-red-500/50">
                <WifiOff className="w-3 h-3 mr-1" /> Offline
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/10 text-white border border-white/20">
              <Battery className="w-3 h-3 mr-1" /> {battery}%
            </Badge>
          </div>
        </div>

        <div className="flex justify-between items-end mt-2 z-10">
          <div>
            <p className="text-gray-400 text-xs mb-1 font-medium">ETA to Destination</p>
            <div className="text-white font-bold text-3xl flex items-baseline gap-1">
              {eta} <span className="text-sm font-medium text-gray-400">min</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1 font-medium">Safety Score</p>
            <div className="text-emerald-400 font-bold text-2xl">
              {score}%
            </div>
          </div>
        </div>

        <button 
          onClick={() => alert("SOS Triggered! Escorting session data to emergency contacts.")}
          className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-[0.98] z-10"
        >
          <TriangleAlert className="w-5 h-5" />
          SOS / Escalate
        </button>
      </Card>

      {/* Simulator Controls (For Demo Purposes) */}
      <div className="relative z-10 mt-72 bg-black/80 p-6 rounded-2xl border border-white/10 text-white backdrop-blur-xl">
        <h3 className="text-lg font-bold mb-4 text-emerald-400">Guardian Live Simulator</h3>
        <p className="text-sm text-gray-400 mb-4 max-w-sm">
          Simulate real-time events that the Guardian Tracking Engine and Safety Monitor would catch during a live mission.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setEta(e => Math.max(0, e - 1))} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm">Walk Faster (-1 ETA)</button>
          <button onClick={() => setBattery(b => Math.max(0, b - 10))} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm">Drain Battery</button>
          <button onClick={() => setOffline(!offline)} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm">Subway (Toggle Offline)</button>
          <button onClick={() => setScore(s => Math.max(0, s - 5))} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm">Route Deviation (-5 Score)</button>
        </div>
      </div>
    </div>
  );
}
