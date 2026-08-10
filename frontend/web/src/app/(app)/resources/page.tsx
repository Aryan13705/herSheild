'use client';

import React from 'react';
import { Card } from '@hershield/ui';
import { BookOpen, Map, ShieldAlert, Phone, FileText, Download, ArrowRight, Compass, Navigation, Users } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-[#34A853]" />
          Travel Safety Resources
        </h1>
        <p className="text-gray-500 mt-2 text-lg max-w-2xl">
          Everything you need for a secure solo journey. Access safe itineraries, offline maps, and local emergency guides.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Itineraries (The focus) */}
        <div className="md:col-span-8 flex flex-col gap-8">
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#34A853]" />
                Curated Safe Itineraries
              </h2>
              <Link href="/trips" className="text-sm font-semibold text-[#34A853] hover:underline">
                View Your Trips
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Itinerary Card 1 */}
              <Card className="group bg-white p-1 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#34A853]/30 transition-all cursor-pointer overflow-hidden">
                <div className="h-40 w-full rounded-[1.25rem] bg-gray-100 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop" alt="Delhi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                     <span className="px-2.5 py-1 rounded-md bg-[#34A853] text-white text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Verified Safe Route</span>
                     <h3 className="text-white font-bold text-lg leading-tight">Delhi Weekend Explorer</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    A curated 3-day itinerary covering central Delhi with pre-verified safe transit points and highly rated women-only hostels.
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-xs font-medium text-gray-400">12 Stops • 3 Days</span>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eef8f1] text-[#34A853] group-hover:bg-[#34A853] group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>

              {/* Itinerary Card 2 */}
              <Card className="group bg-white p-1 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-500/30 transition-all cursor-pointer overflow-hidden">
                <div className="h-40 w-full rounded-[1.25rem] bg-gray-100 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop" alt="Kerala" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                     <span className="px-2.5 py-1 rounded-md bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Nature & Retreat</span>
                     <h3 className="text-white font-bold text-lg leading-tight">Kerala Backwaters</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    Relaxing 5-day escape through Alleppey and Munnar. Includes emergency contact list for local boat operators and medical centers.
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-xs font-medium text-gray-400">8 Stops • 5 Days</span>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Essential Guides
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Women\'s Helpline Directory (India)', desc: 'Complete list of state-wise emergency numbers for women.', icon: Phone, color: 'text-rose-500', bg: 'bg-rose-50' },
                { title: 'Local Customs & Dress Codes', desc: 'State-by-state breakdown of cultural expectations to blend in safely.', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
                { title: 'Legal Rights for Solo Travelers', desc: 'Know your rights regarding hotel check-ins and police interactions.', icon: ShieldAlert, color: 'text-blue-500', bg: 'bg-blue-50' },
              ].map((guide, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${guide.bg}`}>
                      <guide.icon className={`w-6 h-6 ${guide.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-[#34A853] transition-colors">{guide.title}</h4>
                      <p className="text-sm text-gray-500">{guide.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#34A853] transition-colors transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Downloads & Quick Tools */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Card className="bg-[#131B2C] p-6 rounded-3xl border border-white/10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Map className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Map className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Offline Maps</h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                Download city maps and safe-zone data to your device so you never get lost, even without cell service.
              </p>
              
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm group-hover:text-[#00F0FF] transition-colors">Delhi NCR</span>
                    <span className="text-[10px] text-gray-400">145 MB • Updated today</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#00F0FF]" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm group-hover:text-[#00F0FF] transition-colors">Mumbai</span>
                    <span className="text-[10px] text-gray-400">210 MB • Updated 2d ago</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-[#00F0FF]" />
                </button>
              </div>
              
              <button className="w-full mt-6 py-3 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] font-bold text-sm hover:bg-[#00F0FF]/20 transition-colors">
                Browse All Regions
              </button>
            </div>
          </Card>
          
          <Card className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 bg-[#eef8f1] text-[#34A853] rounded-full flex items-center justify-center mb-4">
               <Navigation className="w-8 h-8" />
             </div>
             <h3 className="font-bold text-gray-900 mb-2">Need a custom plan?</h3>
             <p className="text-sm text-gray-500 mb-6">Ask your Guardian AI to generate a personalized, safety-first itinerary for your next destination.</p>
             <button className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all hover:shadow-lg">
               Ask Guardian
             </button>
          </Card>
        </div>

      </div>
    </div>
  );
}
