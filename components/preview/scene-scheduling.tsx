"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INITIAL_SHIFTS = [
  { id: "s1", day: 0, label: "Sarah M.", color: "#3b82f6", time: "9a\u20135p" },
  { id: "s2", day: 0, label: "Mike R.", color: "#10b981", time: "2p\u201310p" },
  { id: "s3", day: 1, label: "James K.", color: "#8b5cf6", time: "9a\u20135p" },
  { id: "s4", day: 2, label: "Sarah M.", color: "#3b82f6", time: "9a\u20135p" },
  { id: "s5", day: 2, label: "Lisa T.", color: "#ec4899", time: "11a\u20137p" },
  { id: "s6", day: 3, label: "Mike R.", color: "#10b981", time: "9a\u20135p" },
  { id: "s7", day: 5, label: "Lisa T.", color: "#ec4899", time: "9a\u20135p" },
  { id: "s8", day: 6, label: "Sarah M.", color: "#3b82f6", time: "10a\u20136p" },
];

const DRAGGABLE_ID = "s3";
const TARGET_DAY = 4;

export function SceneScheduling() {
  const [shifts, setShifts] = useState(INITIAL_SHIFTS);
  const [completed, setCompleted] = useState(false);

  const moveShift = useCallback(() => {
    if (completed) return;
    setShifts((prev) =>
      prev.map((s) => (s.id === DRAGGABLE_ID ? { ...s, day: TARGET_DAY } : s))
    );
    setCompleted(true);
  }, [completed]);

  return (
    <SceneLayout
      number="01"
      headline="Monday morning. Time to build next week's schedule."
      description="Drag shifts onto the calendar. Color-coded by employee, conflict detection built in."
      badge={
        <TryItBadge
          label="Drag a shift to a new slot"
          completed={completed}
          onAutoComplete={moveShift}
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

            {DAYS.map((_, dayIndex) => (
              <div
                key={dayIndex}
                className="min-h-[70px] flex flex-col gap-0.5 pt-1"
                onClick={() => {
                  if (dayIndex === TARGET_DAY && !completed) moveShift();
                }}
              >
                {shifts
                  .filter((s) => s.day === dayIndex)
                  .map((shift) => (
                    <motion.div
                      key={shift.id}
                      layout
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        layout: { type: "spring", damping: 20, stiffness: 200 },
                        opacity: { duration: 0.3 },
                        scaleX: { duration: 0.4 },
                      }}
                      onClick={(e) => {
                        if (shift.id === DRAGGABLE_ID && !completed) {
                          e.stopPropagation();
                          moveShift();
                        }
                      }}
                      className={`rounded px-1 py-0.5 text-[8px] font-medium text-white origin-left truncate ${
                        shift.id === DRAGGABLE_ID && !completed
                          ? "cursor-pointer ring-2 ring-white/50 ring-offset-1"
                          : ""
                      }`}
                      style={{ background: shift.color }}
                    >
                      <div>{shift.label}</div>
                      <div className="opacity-75">{shift.time}</div>
                    </motion.div>
                  ))}

                {dayIndex === TARGET_DAY &&
                  !completed &&
                  !shifts.some((s) => s.day === dayIndex && s.id === DRAGGABLE_ID) && (
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="rounded border-2 border-dashed px-1 py-2 text-[8px] text-center"
                      style={{
                        borderColor: "#8b5cf6",
                        color: "#8b5cf6",
                      }}
                    >
                      Drop here
                    </motion.div>
                  )}
              </div>
            ))}
          </div>
        </BrowserFrame>
      }
    />
  );
}
