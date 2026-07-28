'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Map as MapIcon, HardDrive, Trash2 } from 'lucide-react';

// Mock data for downloaded regions
const MOCK_REGIONS = [
  { id: 1, name: 'Delhi NCR', size: '145 MB', downloadedAt: '2 days ago' },
  { id: 2, name: 'Mumbai Suburbs', size: '210 MB', downloadedAt: '1 week ago' },
];

export default function DownloadsPage() {
  const router = useRouter();
  const [regions, setRegions] = useState(MOCK_REGIONS);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setRegions([
        { id: Date.now(), name: 'Current Location', size: '85 MB', downloadedAt: 'Just now' },
        ...regions
      ]);
    }, 3000);
  };

  const handleDelete = (id: number) => {
    setRegions(regions.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#080B14] pb-24">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4 sticky top-0 bg-[#080B14]/80 backdrop-blur-md z-10 border-b border-white/5">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Offline Maps</h1>
          <p className="text-[#8892B0] text-xs">Manage downloaded regions</p>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Storage Usage */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#34D399]/20 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-[#34D399]" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Storage Usage</h3>
              <p className="text-[#8892B0] text-xs">Available space: 2.4 GB</p>
            </div>
          </div>
          
          <div className="w-full bg-[#0F1420] rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-[#34D399] h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-[#8892B0]">
            <span>Maps: 455 MB</span>
            <span>App Data: 12 MB</span>
          </div>
        </div>

        {/* Download New Region */}
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full bg-gradient-to-r from-[#E8537A] to-[#9B6DFF] rounded-2xl p-5 flex items-center justify-between transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
        >
          <div className="flex items-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MapIcon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Download Current Area</h3>
              <p className="text-white/80 text-sm">~85 MB • Includes Safety Resources</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-[#080B14] flex items-center justify-center shadow-lg">
            {isDownloading ? (
              <div className="w-5 h-5 border-2 border-[#080B14] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </div>
        </button>

        {/* Downloaded Regions List */}
        <div>
          <h3 className="text-sm font-semibold text-[#8892B0] uppercase tracking-wider mb-4">Downloaded Regions</h3>
          {regions.length === 0 ? (
            <p className="text-[#8892B0] text-sm text-center py-8">No regions downloaded yet.</p>
          ) : (
            <div className="space-y-3">
              {regions.map((region) => (
                <div key={region.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{region.name}</h4>
                    <p className="text-[#8892B0] text-xs mt-1">{region.size} • {region.downloadedAt}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(region.id)}
                    className="p-2 rounded-full hover:bg-[#E8537A]/20 text-[#8892B0] hover:text-[#E8537A] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
