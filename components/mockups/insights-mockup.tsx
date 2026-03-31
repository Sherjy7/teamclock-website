"use client";

import { motion } from "framer-motion";
import { BrowserFrame } from "./browser-frame";
import { AnimatedCounter } from "../ui/animated-counter";
import { Typewriter } from "../ui/typewriter";

const STATS = [
  { label: "Hours This Week", value: 312, suffix: "hrs", color: "var(--tc-accent)" },
  { label: "Labor Cost", value: 8420, prefix: "$", color: "#8b5cf6" },
  { label: "Overtime Risks", value: 2, color: "#f59e0b" },
  { label: "Coverage", value: 94, suffix: "%", color: "#10b981" },
];

export function InsightsMockup() {
  return (
    <BrowserFrame>
      <div className="space-y-3">
        <div className="text-xs font-semibold" style={{ color: "var(--tc-text-secondary)" }}>
          Weekly Overview
        </div>

        <div className="grid grid-cols-2 gap-2">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="rounded-lg p-2.5"
              style={{
                background: "var(--tc-surface-solid)",
                border: "1px solid var(--tc-border)",
              }}
            >
              <div className="text-[9px] font-medium mb-1" style={{ color: "var(--tc-text-muted)" }}>
                {stat.label}
              </div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.prefix}
                <AnimatedCounter target={stat.value} duration={1500} />
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="rounded-lg p-2.5"
          style={{
            background: "rgba(139, 92, 246, 0.06)",
            border: "1px solid rgba(139, 92, 246, 0.15)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-white text-[8px] font-bold"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}
            >
              AI
            </div>
            <span className="text-[9px] font-semibold" style={{ color: "#7c3aed" }}>
              Weekly Insight
            </span>
          </div>
          <div className="text-[10px] leading-relaxed" style={{ color: "var(--tc-text-secondary)" }}>
            <Typewriter
              text="94% coverage this week. 2 overtime risks flagged \u2014 consider reducing James K. by one shift. Labor costs down 3% vs last week."
              speed={25}
              delay={1600}
            />
          </div>
        </motion.div>
      </div>
    </BrowserFrame>
  );
}
