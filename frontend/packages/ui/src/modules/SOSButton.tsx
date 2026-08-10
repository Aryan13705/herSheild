import * as React from "react";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActivated?: boolean;
  onHoldComplete?: () => void;
}

export function SOSButton({ isActivated = false, onHoldComplete, className, ...props }: SOSButtonProps) {
  // A sophisticated "Hold for SOS" button to prevent accidental triggers,
  // matching the "Hold for SOS" mockup aesthetic.
  const [isHolding, setIsHolding] = React.useState(false);

  // Example logic for a hold interaction could be implemented here via framer-motion gestures
  
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.25 }}
      className={cn("w-full", className)}
    >
      <Button
        variant="destructive"
        size="lg"
        className={cn(
          "w-full h-16 text-lg font-bold shadow-[var(--shadow-elevation-3)] rounded-[var(--radius-xl)]",
          isActivated && "bg-[var(--color-safety-danger-bg)] text-[var(--color-safety-danger)]"
        )}
        onPointerDown={() => setIsHolding(true)}
        onPointerUp={() => setIsHolding(false)}
        onPointerLeave={() => setIsHolding(false)}
        {...props}
      >
        {isActivated ? "SOS Activated" : "Hold for SOS"}
      </Button>
    </motion.div>
  );
}
