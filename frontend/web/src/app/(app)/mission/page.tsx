"use client";

import React from "react";
import dynamic from "next/dynamic";

// Leaflet requires window to be defined, so we dynamically import it with ssr: false
const MissionMap = dynamic(() => import("@hershield/mission-map").then((mod) => mod.MissionMap), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-900 animate-pulse flex items-center justify-center text-gray-500">Loading Map Engine...</div>
});

export default function MissionPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-black text-[#F0F2FF] tracking-wide mb-1">Mission Control</h1>
        <p className="text-sm text-[#8892B0]">Live spatial intelligence engine</p>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
        <MissionMap />
      </div>
    </div>
  );
}
