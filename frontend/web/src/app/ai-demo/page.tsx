'use client';

import React from 'react';
import { 
  MissionBriefing, 
  MissionDebrief, 
  InsightCard, 
  RecommendationCard, 
  RiskIndicator, 
  WeatherCard, 
  TravelSummary, 
  VoicePanel, 
  GuardianTimeline, 
  MemoryCard 
} from '@hershield/ui/src/ai';

export default function AIDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-bg)] p-8 overflow-y-auto">
      
      {/* Background HUD elements */}
      <div className="absolute inset-0 pointer-events-none fixed">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-[var(--color-brand-primary)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-[var(--color-brand-tertiary)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-light tracking-widest uppercase text-white mb-2">
            Phase 8 <span className="font-bold text-[var(--color-brand-tertiary)]">Guardian UI</span>
          </h1>
          <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-text-secondary)]">
            Visual verification of newly scaffolded AI Intelligence HUD components.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">Core Briefings</h2>
          <MissionBriefing 
            destination="Central Station" 
            weather="Heavy Rain Expected in 30m" 
            battery={45} 
            offlineReady={true} 
            onAcknowledge={() => console.log('Acknowledged')} 
          />
          <MissionDebrief />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">Contextual Cards</h2>
            <InsightCard />
            <RecommendationCard />
            <WeatherCard />
            <TravelSummary />
            <MemoryCard />
          </div>
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">Real-time Monitors</h2>
            <div className="p-4 bg-[var(--color-surface-glass)] border border-[var(--color-border-medium)] rounded-[2rem]">
              <h3 className="text-white font-bold uppercase text-xs mb-4 tracking-widest">Risk Level</h3>
              <RiskIndicator />
            </div>
            <GuardianTimeline />
            <VoicePanel />
          </div>
        </section>
      </div>
    </div>
  );
}
