"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./phone-frame";

export function TimeClockMockup() {
  const [clockedIn, setClockedIn] = useState(false);
  const [showGps, setShowGps] = useState(false);

  useEffect(() => {
    const clockTimer = setTimeout(() => setClockedIn(true), 1200);
    const gpsTimer = setTimeout(() => setShowGps(true), 2000);
    return () => {
      clearTimeout(clockTimer);
      clearTimeout(gpsTimer);
    };
  }, []);

  return (
    <PhoneFrame>
      <div className="flex flex-col items-center pt-4">
        <span className="text-xs font-semibold mb-1" style={{ color: "var(--tc-text-secondary)" }}>
          Downtown Cafe
        </span>
        <span className="text-2xl font-bold mb-6" style={{ color: "var(--tc-text-primary)" }}>
          9:02 AM
        </span>

        <AnimatePresence mode="wait">
          {!clockedIn ? (
            <motion.button
              key="clock-in"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-28 h-28 rounded-full text-white text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.35)",
              }}
            >
              Clock In
            </motion.button>
          ) : (
            <motion.div
              key="clocked-in"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-white text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.35)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="mt-1">Clocked In</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGps && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold"
              style={{
                background: "var(--tc-success-light)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                color: "#047857",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              GPS Verified — Within geofence
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}
