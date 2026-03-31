"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EXISTING_SHIFTS = [
  { day: 0, label: "Sarah M.", color: "#3b82f6", time: "9a\u20135p" },
  { day: 1, label: "James K.", color: "#8b5cf6", time: "9a\u20135p" },
  { day: 3, label: "Mike R.", color: "#10b981", time: "9a\u20135p" },
  { day: 5, label: "Lisa T.", color: "#ec4899", time: "9a\u20135p" },
];

const AI_FILLS = [
  { day: 2, label: "Sarah M.", color: "#3b82f6", time: "9a\u20135p" },
  { day: 4, label: "James K.", color: "#8b5cf6", time: "2p\u201310p" },
  { day: 6, label: "Mike R.", color: "#10b981", time: "10a\u20136p" },
];

const EMPTY_DAYS = [2, 4, 6];

export function SceneAi() {
  const [filled, setFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFill = useCallback(() => {
    if (filled || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilled(true);
      setTimeout(() => setShowToast(true), 300);
    }, 800);
  }, [filled, loading]);

  return (
    <SceneLayout
      number="02"
      headline="Three gaps left. Let AI handle it."
      description="One click and the AI analyzes availability, overtime rules, and fairness to fill your schedule."
      alt
      badge={
        <TryItBadge
          label="Click 'Fill with AI' to watch it work"
          completed={filled}
          onAutoComplete={handleFill}
        />
      }
      mockup={
        <BrowserFrame>
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--tc-text-secondary)" }}
            >
              Week of Mar 24, 2026
            </span>
            <button
              onClick={handleFill}
              disabled={filled || loading}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-md text-white flex items-center gap-1.5 transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              }}
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                  className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                </svg>
              )}
              Fill with AI
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-[9px] font-semibold pb-1"
                style={{
                  color: "var(--tc-text-muted)",
                  borderBottom: "1px solid var(--tc-border)",
                }}
              >
                {day}
              </div>
            ))}

            {DAYS.map((_, dayIndex) => {
              const existing = EXISTING_SHIFTS.filter((s) => s.day === dayIndex);
              const aiFill = AI_FILLS.find((s) => s.day === dayIndex);
              const isEmpty = EMPTY_DAYS.includes(dayIndex) && !filled;

              return (
                <div key={dayIndex} className="min-h-[70px] flex flex-col gap-0.5 pt-1">
                  {existing.map((shift, i) => (
                    <div
                      key={`existing-${dayIndex}-${i}`}
                      className="rounded px-1 py-0.5 text-[8px] font-medium text-white truncate"
                      style={{ background: shift.color }}
                    >
                      <div>{shift.label}</div>
                      <div className="opacity-75">{shift.time}</div>
                    </div>
                  ))}

                  {isEmpty && (
                    <motion.div
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="rounded border-2 border-dashed py-3 text-center text-[8px]"
                      style={{
                        borderColor: "var(--tc-text-muted)",
                        color: "var(--tc-text-muted)",
                      }}
                    >
                      Empty
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {filled && aiFill && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: AI_FILLS.indexOf(aiFill) * 0.3,
                          type: "spring",
                          damping: 15,
                        }}
                        className="rounded px-1 py-0.5 text-[8px] font-medium text-white truncate"
                        style={{
                          background: aiFill.color,
                          boxShadow: "0 0 8px rgba(139, 92, 246, 0.4)",
                        }}
                      >
                        <div>{aiFill.label}</div>
                        <div className="opacity-75">{aiFill.time}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-[10px] font-semibold text-center py-1.5 rounded-md"
                style={{
                  background: "rgba(139, 92, 246, 0.08)",
                  color: "#7c3aed",
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                }}
              >
                3 shifts filled by AI
              </motion.div>
            )}
          </AnimatePresence>
        </BrowserFrame>
      }
    />
  );
}
