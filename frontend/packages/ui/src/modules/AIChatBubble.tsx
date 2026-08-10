import * as React from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { Badge } from "../components/Badge";

interface AIChatBubbleProps {
  message: string;
  isUser?: boolean;
  safetyRating?: "safe" | "warning" | "danger";
  safetyText?: string;
}

export function AIChatBubble({ 
  message, 
  isUser = false, 
  safetyRating, 
  safetyText 
}: AIChatBubbleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.3 }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] rounded-[var(--radius-xl)] p-4 text-[var(--color-text-primary)]",
          isUser 
            ? "bg-[var(--color-brand-primary)] rounded-tr-sm" 
            : "bg-[var(--color-surface-card)] rounded-tl-sm shadow-[var(--shadow-elevation-1)] border border-white/5"
        )}
      >
        <p className="text-sm md:text-base leading-relaxed mb-2">{message}</p>
        
        {/* Safety Indicator appended to AI messages (Trip Planner aesthetic) */}
        {!isUser && safetyRating && safetyText && (
          <div className="mt-2 flex justify-end">
            <Badge variant={safetyRating}>{safetyText}</Badge>
          </div>
        )}
      </div>
    </motion.div>
  );
}
