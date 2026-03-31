"use client";

import { motion } from "framer-motion";
import { BrowserFrame } from "./browser-frame";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SHIFTS = [
  { day: 0, label: "Sarah M.", color: "#3b82f6", time: "9a-5p" },
  { day: 0, label: "Mike R.", color: "#10b981", time: "2p-10p" },
  { day: 1, label: "James K.", color: "#8b5cf6", time: "9a-5p" },
  { day: 2, label: "Sarah M.", color: "#3b82f6", time: "9a-5p" },
  { day: 2, label: "Lisa T.", color: "#ec4899", time: "11a-7p" },
  { day: 3, label: "Mike R.", color: "#10b981", time: "9a-5p" },
  { day: 4, label: "James K.", color: "#8b5cf6", time: "2p-10p" },
  { day: 5, label: "Lisa T.", color: "#ec4899", time: "9a-5p" },
  { day: 6, label: "Sarah M.", color: "#3b82f6", time: "10a-6p" },
];

export function SchedulingMockup() {
  return (
    <BrowserFrame>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold" style={{ color: "var(--tc-text-secondary)" }}>
          Week of Mar 24, 2026
        </span>
        <motion.button
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
          className="text-[10px] font-semibold px-2.5 py-1 rounded-md text-white"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}
        >
          AI Suggest
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[9px] font-semibold pb-1"
            style={{ color: "var(--tc-text-muted)", borderBottom: "1px solid var(--tc-border)" }}
          >
            {day}
          </div>
        ))}

        {DAYS.map((_, dayIndex) => (
          <div key={dayIndex} className="min-h-[70px] flex flex-col gap-0.5 pt-1">
            {SHIFTS.filter((s) => s.day === dayIndex).map((shift, i) => (
              <motion.div
                key={`${dayIndex}-${i}`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 + dayIndex * 0.08, ease: "easeOut" }}
                className="rounded px-1 py-0.5 text-[8px] font-medium text-white origin-left truncate"
                style={{ background: shift.color }}
              >
                <div>{shift.label}</div>
                <div className="opacity-75">{shift.time}</div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}
