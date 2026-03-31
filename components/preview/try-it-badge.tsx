"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TryItBadgeProps {
  label: string;
  completed: boolean;
  autoCompleteMs?: number;
  onAutoComplete?: () => void;
}

export function TryItBadge({
  label,
  completed,
  autoCompleteMs = 3000,
  onAutoComplete,
}: TryItBadgeProps) {
  const [autoFired, setAutoFired] = useState(false);

  useEffect(() => {
    if (completed || autoFired) return;

    const timer = setTimeout(() => {
      setAutoFired(true);
      onAutoComplete?.();
    }, autoCompleteMs);

    return () => clearTimeout(timer);
  }, [completed, autoFired, autoCompleteMs, onAutoComplete]);

  return (
    <AnimatePresence mode="wait">
      {!completed ? (
        <motion.div
          key="try"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "var(--tc-accent-light)",
            border: "1px solid var(--tc-accent-border)",
            color: "var(--tc-accent)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--tc-accent)" }}
          />
          {label}
        </motion.div>
      ) : (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "var(--tc-success-light)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            color: "#047857",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Nice!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
