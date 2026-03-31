"use client";

import { motion } from "framer-motion";
import { BrowserFrame } from "./mockups/browser-frame";

const MOCK_SHIFTS = [
  { day: 0, row: 0, label: "Sarah M.", color: "#3b82f6", width: "85%" },
  { day: 1, row: 0, label: "James K.", color: "#8b5cf6", width: "70%" },
  { day: 1, row: 1, label: "Open Shift", color: "#f59e0b", width: "55%" },
  { day: 2, row: 0, label: "Sarah M.", color: "#3b82f6", width: "90%" },
  { day: 3, row: 0, label: "Mike R.", color: "#10b981", width: "75%" },
  { day: 3, row: 1, label: "James K.", color: "#8b5cf6", width: "60%" },
  { day: 4, row: 0, label: "Lisa T.", color: "#ec4899", width: "80%" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <BrowserFrame>
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--tc-text-secondary)" }}
          >
            Mar 24 — Mar 28, 2026
          </span>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="text-[10px] font-semibold px-2 py-1 rounded-md text-white"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            }}
          >
            AI Suggest
          </motion.div>
        </div>

        {/* Day columns */}
        <div className="grid grid-cols-5 gap-1.5">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-semibold pb-1.5"
              style={{
                color: "var(--tc-text-muted)",
                borderBottom: "1px solid var(--tc-border)",
              }}
            >
              {day}
            </div>
          ))}

          {DAYS.map((_, dayIndex) => (
            <div key={dayIndex} className="min-h-[60px] flex flex-col gap-1 pt-1">
              {MOCK_SHIFTS.filter((s) => s.day === dayIndex).map(
                (shift, i) => (
                  <motion.div
                    key={`${dayIndex}-${i}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.8 + dayIndex * 0.12 + i * 0.06,
                      ease: "easeOut",
                    }}
                    className="rounded-md px-1.5 py-0.5 text-[9px] font-medium text-white origin-left"
                    style={{
                      background: shift.color,
                      width: shift.width,
                    }}
                  >
                    {shift.label}
                  </motion.div>
                )
              )}
            </div>
          ))}
        </div>
      </BrowserFrame>

      {/* Floating notification card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute -right-4 top-8 px-3 py-2 rounded-lg text-[11px] font-medium"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--tc-glass-border)",
          boxShadow: "var(--tc-shadow-lg)",
          color: "var(--tc-text-primary)",
        }}
      >
        <span style={{ color: "#8b5cf6" }}>AI</span> filled 3 open shifts
      </motion.div>

      {/* Floating clock-in badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="absolute -left-3 bottom-12 px-3 py-1.5 rounded-full text-[10px] font-semibold"
        style={{
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          color: "#047857",
        }}
      >
        Clocked In 9:02 AM
      </motion.div>
    </motion.div>
  );
}
