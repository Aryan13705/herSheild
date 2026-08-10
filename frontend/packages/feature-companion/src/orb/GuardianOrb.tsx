'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@hershield/ui';
import { Minus, Send } from 'lucide-react';

interface GuardianOrbProps {
  userName?: string;
}

export const GuardianOrb: React.FC<GuardianOrbProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="bg-white p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center w-[300px] relative">
              
              {/* Minimize Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Welcome Text */}
              <div className="w-full text-left mb-6">
                <h3 className="text-gray-900 font-semibold mb-1">
                  {userName ? `Hi ${userName}! 👋` : 'Hi there! 👋'}
                </h3>
                <p className="text-gray-500 text-sm">How can I help you today?</p>
              </div>

              {/* Cute Blob Orb */}
              <div className="relative w-32 h-32 flex items-center justify-center my-2">
                {/* Auras */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#34A853] to-cyan-400 blur-2xl" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-4 rounded-full bg-[#34A853] blur-xl" 
                />
                
                {/* Main Blob Body */}
                <div className="w-24 h-24 bg-gray-900 rounded-full relative z-10 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 transition-transform">
                   {/* Eyes */}
                   <motion.div 
                     animate={{ height: ["16px", "2px", "16px"] }}
                     transition={{ duration: 4, times: [0, 0.05, 0.1], repeat: Infinity, repeatDelay: Math.random() * 3 + 2 }}
                     className="w-2.5 h-4 bg-cyan-200 rounded-full shadow-[0_0_10px_cyan]"
                   />
                   <motion.div 
                     animate={{ height: ["16px", "2px", "16px"] }}
                     transition={{ duration: 4, times: [0, 0.05, 0.1], repeat: Infinity, repeatDelay: Math.random() * 3 + 2 }}
                     className="w-2.5 h-4 bg-cyan-200 rounded-full shadow-[0_0_10px_cyan]"
                   />
                </div>
              </div>

              {/* Voice Equalizer */}
              <div className="mt-8 mb-6 flex items-center gap-1 opacity-40">
                 {[1, 2, 1, 3, 1, 2, 1].map((h, i) => (
                   <motion.div 
                     key={i}
                     animate={{ height: [h * 4, h * 8, h * 4] }}
                     transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                     className="w-1 bg-[#34A853] rounded-full"
                   />
                 ))}
              </div>

              {/* Chat Input */}
              <form 
                className="w-full relative mt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (message.trim()) {
                    console.log("Sent message to Guardian:", message);
                    setMessage('');
                  }
                }}
              >
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..." 
                  className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 rounded-full py-2.5 pl-4 pr-10 outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#34A853] flex items-center justify-center text-white hover:bg-[#2c8f46] transition-colors"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </form>

            </Card>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full relative group flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#34A853] to-cyan-400 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full bg-gray-900 rounded-full relative z-10 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center gap-1.5">
               {/* Eyes */}
               <motion.div 
                 animate={{ height: ["8px", "2px", "8px"] }}
                 transition={{ duration: 4, times: [0, 0.05, 0.1], repeat: Infinity, repeatDelay: Math.random() * 3 + 2 }}
                 className="w-1.5 h-2.5 bg-cyan-200 rounded-full shadow-[0_0_5px_cyan]"
               />
               <motion.div 
                 animate={{ height: ["8px", "2px", "8px"] }}
                 transition={{ duration: 4, times: [0, 0.05, 0.1], repeat: Infinity, repeatDelay: Math.random() * 3 + 2 }}
                 className="w-1.5 h-2.5 bg-cyan-200 rounded-full shadow-[0_0_5px_cyan]"
               />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
