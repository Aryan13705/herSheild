"use client";

import React from "react";
import { Users, Shield, UserPlus } from "lucide-react";

export default function NetworkPage() {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#F0F2FF] tracking-wide mb-2">Guardian Network</h1>
        <p className="text-[#8892B0]">Manage your trusted contacts and community safety zones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trusted Guardians Card */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Trusted Guardians</h2>
            </div>
            <button className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              <UserPlus className="w-4 h-4" />
              Add Guardian
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-center py-8 border-2 border-dashed border-gray-800 rounded-xl">
              <p className="text-gray-500 mb-2">You haven&apos;t added any guardians yet.</p>
              <p className="text-sm text-gray-600">Guardians are notified instantly if you trigger an SOS.</p>
            </div>
          </div>
        </div>

        {/* Community Network Card */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Local Community</h2>
          </div>
          
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <div>
                  <h3 className="font-semibold text-gray-200">Neighborhood Watch</h3>
                  <p className="text-sm text-gray-500">24 active members nearby</p>
                </div>
                <button className="text-sm font-medium text-purple-400 hover:text-purple-300">Join</button>
             </div>
             <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <div>
                  <h3 className="font-semibold text-gray-200">Commuter Safety Group</h3>
                  <p className="text-sm text-gray-500">12 active members nearby</p>
                </div>
                <button className="text-sm font-medium text-purple-400 hover:text-purple-300">Join</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
