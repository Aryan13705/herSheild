'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@hershield/ui';
import { Bell, Sun, MapPin, Map, ShieldAlert, Mic, Users, CalendarDays, CheckCircle2, BatteryWarning, ArrowRight } from 'lucide-react';
import { ProfileWizard } from '@hershield/feature-onboarding';
import { useCurrentUser } from '@/context/CurrentUserContext';

export default function DashboardPage() {
  const { user } = useCurrentUser();
  const [showWizard, setShowWizard] = useState(true);

  if (!user) return null;

  return (
    <div className="p-8 max-w-[1200px] mx-auto min-h-screen relative">
      {/* Onboarding Wizard Overlay */}
      {showWizard && <ProfileWizard onComplete={() => setShowWizard(false)} onSkip={() => setShowWizard(false)} />}
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sun className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            Good morning, {user.name.split(' ')[0] || 'User'}
          </h1>
          <p className="text-gray-500 mt-1">You&apos;ve got a plan. We&apos;ve got your back.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm cursor-pointer relative">
             <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=34A853&color=fff`} alt="Profile" fill className="object-cover" />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Top Stat Cards */}
        <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm flex flex-col justify-between h-[160px]">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
             <ShieldAlert className="w-4 h-4 text-[#34A853]" /> Safety Score
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-bold text-gray-900 tracking-tight">92<span className="text-xl text-gray-400 font-medium">/100</span></div>
              <p className="text-sm text-[#34A853] font-medium mt-1">You&apos;re in a safe zone</p>
            </div>
            {/* Mock Sparkline */}
            <svg className="w-24 h-12 stroke-[#34A853] fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 40 Q 10 35, 20 38 T 40 25 T 60 20 T 80 10 L 90 5" />
              <circle cx="90" cy="5" r="3" className="fill-[#34A853]" />
            </svg>
          </div>
        </Card>

        <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm flex flex-col justify-between h-[160px]">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
             Guardian Status
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight">
                <div className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                Active
              </div>
              <p className="text-sm text-gray-500 mt-1">Always watching over you</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#eef8f1] flex items-center justify-center relative">
               <div className="w-10 h-10 rounded-full bg-[#c8e6c9] flex items-center justify-center animate-ping absolute" />
               <div className="w-8 h-8 rounded-full bg-[#34A853] z-10" />
            </div>
          </div>
        </Card>

        <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm flex flex-col justify-between h-[160px]">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
             <Map className="w-4 h-4 text-[#34A853]" /> Next Trip
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 tracking-tight">Delhi Weekend Trip</div>
            <p className="text-sm text-gray-500 mt-0.5">18 - 20 May 2025</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600 mt-3">
              <CalendarDays className="w-3.5 h-3.5" /> 2 days to go
            </div>
          </div>
        </Card>

        {/* Current Mission - Span 2 */}
        <Card className="md:col-span-2 bg-white p-6 border border-gray-100 rounded-3xl shadow-sm flex flex-col justify-between h-[280px]">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Current Mission</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#34A853] flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13.73 21a2 2 0 0 1-3.46 0" /><path d="M18.63 13A17.89 17.89 0 0 1 18 8" /><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" /><path d="M18 8a6 6 0 0 0-9.33-5" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">Walking Home</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#eef8f1] text-[#34A853] tracking-wide">LIVE</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" /> Connaught Place, Delhi <ArrowRight className="w-3.5 h-3.5" /> Home
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 font-medium">ETA</p>
                <p className="text-xl font-bold text-gray-900">20 min</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Distance</p>
                <p className="text-xl font-bold text-gray-900">3.2 km</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Check-in</p>
                <p className="text-xl font-bold text-gray-900">12 min ago</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex items-center justify-between relative">
              <div className="absolute left-0 top-0 bottom-0 bg-[#34A853] rounded-full" style={{ width: '70%' }} />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 mr-2 z-10">70%</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
             <button className="text-sm font-semibold text-[#34A853] flex items-center gap-1 hover:text-[#2c8f46] transition-colors">
               View Live Map <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm h-[280px]">
          <h3 className="text-sm font-semibold text-gray-700 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            {[
              { icon: MapPin, label: 'Share Live\nLocation', color: 'text-[#34A853]', bg: 'bg-[#eef8f1]' },
              { icon: ShieldAlert, label: 'Start\nCheck-in', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Users, label: 'Emergency\nContacts', color: 'text-red-500', bg: 'bg-red-50' },
              { icon: ShieldAlert, label: 'Safety\nToolkit', color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Mic, label: 'Record\nAudio', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: Map, label: 'Find Safe\nPlaces', color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${action.bg} transition-transform group-hover:scale-105`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <span className="text-[10px] font-medium text-gray-600 text-center whitespace-pre-line leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Trusted Network */}
        <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm h-[220px]">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-semibold text-gray-700">Trusted Network</h3>
             <button className="text-xs font-semibold text-[#34A853]">View all</button>
           </div>
           <div className="flex flex-col gap-4">
             {[
               { name: 'Mom', phone: '+91 98765 43210', badge: 'Primary', badgeColor: 'bg-[#eef8f1] text-[#34A853]' },
               { name: 'Rohit (Brother)', phone: '+91 91234 56789', badge: 'Secondary', badgeColor: 'bg-blue-50 text-blue-600' },
               { name: 'Ananya (Friend)', phone: '+91 99876 54321', badge: 'Emergency', badgeColor: 'bg-red-50 text-red-600' },
             ].map((contact, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0 relative">
                     <Image src={`https://ui-avatars.com/api/?name=${contact.name.replace(/\s/g, '+')}&background=random`} alt={contact.name} fill className="object-cover" />
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                     <p className="text-xs text-gray-500">{contact.phone}</p>
                   </div>
                 </div>
                 <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${contact.badgeColor}`}>{contact.badge}</span>
               </div>
             ))}
           </div>
           <button className="w-full text-xs font-semibold text-[#34A853] mt-4 text-center hover:underline">+ Add New Contact</button>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm h-[220px]">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-semibold text-gray-700">Recent Alerts</h3>
             <button className="text-xs font-semibold text-[#34A853]">View all</button>
           </div>
           <div className="flex flex-col gap-4">
             {[
               { icon: CheckCircle2, title: 'Entered Safe Zone', desc: 'Connaught Place, Delhi', color: 'text-[#34A853]', bg: 'bg-[#eef8f1]' },
               { icon: BatteryWarning, title: 'Battery Low', desc: 'Below 20%', color: 'text-orange-500', bg: 'bg-orange-50' },
               { icon: CheckCircle2, title: 'Check-in Completed', desc: "All good! You're on track.", color: 'text-blue-500', bg: 'bg-blue-50' },
             ].map((alert, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${alert.bg}`}>
                   <alert.icon className={`w-4 h-4 ${alert.color}`} />
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                   <p className="text-xs text-gray-500">{alert.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </Card>

      </div>
    </div>
  );
}

