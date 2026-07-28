'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompanion } from '../context/CompanionContext';
import { ChevronDown, Send } from 'lucide-react';
import { Card } from '@hershield/ui';

export const ConversationPanel = () => {
  const { companionMode, closeCompanion, orbState, setOrbState } = useCompanion();
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: "Hello! I'm monitoring your route and weather. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setOrbState('thinking');
    
    setTimeout(() => {
      const normalizedInput = input.toLowerCase();
      let reply = "I'm analyzing the safest routes. I've noted heavy rainfall warnings in that region for the next 48 hours. I'll keep your emergency contacts on standby.";
      
      if (normalizedInput.includes('kerala') || normalizedInput.includes('kerela')) {
         reply = "Kerala is a beautiful destination! However, the Western Ghats region is currently experiencing heavy monsoon showers. I will proactively cache offline maps for Munnar and Wayanad, and monitor landslide warnings along your route.";
      } else if (normalizedInput.includes('itinerary') || normalizedInput.includes('itenary') || normalizedInput.includes('plan')) {
         reply = "Here is a safe itinerary suggestion:\n\nDay 1: Arrive in Kochi. Stay in fort area (low flood risk).\nDay 2: Travel to Munnar before 2 PM to avoid evening fog on the ghat roads.\nDay 3: Backwaters in Alleppey. I have verified the boat operators for safety compliance.\n\nWould you like me to book any of these safe transit options?";
      } else if (normalizedInput.includes('weather') || normalizedInput.includes('rain')) {
         reply = "Currently, there is a 85% chance of heavy thunderstorms along your path. I highly recommend delaying travel by 2 hours. Should I notify your emergency contacts of the delay?";
      }

      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
      setOrbState('safe');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {companionMode !== 'hidden' && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-[110] pointer-events-auto w-[400px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
        >
          <Card className="w-full h-full flex flex-col bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden rounded-[2rem]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full bg-[var(--color-brand-tertiary)] blur-md opacity-50 ${orbState === 'thinking' ? 'animate-pulse' : ''}`} />
                  <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">Guardian</h3>
                  <p className="text-xs text-emerald-400 font-medium">Context Synced</p>
                </div>
              </div>
              <button onClick={closeCompanion} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-gray-300">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`self-${msg.role === 'user' ? 'end' : 'start'} max-w-[85%]`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] rounded-tr-sm font-medium' 
                      : 'bg-white/10 border border-white/5 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {orbState === 'thinking' && (
                <div className="self-start bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-sm shadow-lg flex gap-2 items-center">
                   <div className="w-2 h-2 bg-[var(--color-brand-tertiary)] rounded-full animate-bounce" />
                   <div className="w-2 h-2 bg-[var(--color-brand-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                   <div className="w-2 h-2 bg-[var(--color-brand-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Guardian..." 
                  className="w-full bg-white/10 border border-white/10 rounded-full py-3 px-4 text-white text-sm focus:outline-none focus:border-[var(--color-brand-tertiary)] focus:ring-1 focus:ring-[var(--color-brand-tertiary)] transition-all placeholder-gray-500 pr-12"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-1.5 p-2 bg-[var(--color-brand-tertiary)] text-[var(--color-surface-bg)] rounded-full hover:scale-105 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
