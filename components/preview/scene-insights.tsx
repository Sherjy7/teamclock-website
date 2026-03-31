"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Typewriter } from "@/components/ui/typewriter";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

const STATS = [
  {
    label: "Hours This Week",
    value: 312,
    suffix: " hrs",
    color: "var(--tc-accent)",
    breakdown: ["Sarah M. \u2014 40h", "James K. \u2014 38h", "Mike R. \u2014 42h", "Lisa T. \u2014 36h"],
  },
  {
    label: "Labor Cost",
    value: 8420,
    prefix: "$",
    color: "#8b5cf6",
    breakdown: ["Regular: $7,100", "Overtime: $1,320"],
  },
  {
    label: "Coverage",
    value: 94,
    suffix: "%",
    color: "#10b981",
    breakdown: ["Filled: 47/50 shifts", "Open: 3 shifts"],
  },
  {
    label: "Overtime Risks",
    value: 2,
    suffix: "",
    color: "#f59e0b",
    breakdown: ["Mike R. \u2014 42h (limit 40)", "James K. \u2014 close at 38h"],
  },
];

export function SceneInsights() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [autoExpanded, setAutoExpanded] = useState(false);

  function handleHover(index: number | null) {
    setHoveredCard(index);
    if (index !== null) setInteracted(true);
  }

  function handleAutoComplete() {
    if (interacted) return;
    setAutoExpanded(true);
    let i = 0;
    const interval = setInterval(() => {
      setHoveredCard(i);
      i++;
      if (i >= STATS.length) {
        clearInterval(interval);
        setTimeout(() => setHoveredCard(null), 1500);
      }
    }, 1000);
    setInteracted(true);
  }

  return (
    <SceneLayout
      number="05"
      headline="Friday. Let's see how the week went."
      description="Hours, costs, overtime risks, and an AI summary \u2014 all at a glance."
      badge={
        <TryItBadge
          label="Hover over cards to see breakdowns"
          completed={interacted}
          onAutoComplete={handleAutoComplete}
        />
      }
      mockup={
        <BrowserFrame>
          <div className="space-y-3">
            <div className="text-xs font-semibold" style={{ color: "var(--tc-text-secondary)" }}>
              Weekly Overview
            </div>

            <div className="grid grid-cols-2 gap-2">
              {STATS.map((stat, i) => {
                const isHovered = hoveredCard === i;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onMouseEnter={() => handleHover(i)}
                    onMouseLeave={() => {
                      if (!autoExpanded) setHoveredCard(null);
                    }}
                    animate={{
                      scale: isHovered ? 1.03 : 1,
                      boxShadow: isHovered ? "var(--tc-shadow-lg)" : "none",
                    }}
                    className="rounded-lg p-2.5 cursor-pointer transition-colors"
                    style={{
                      background: "var(--tc-surface-solid)",
                      border: `1px solid ${isHovered ? stat.color : "var(--tc-border)"}`,
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

                    <motion.div
                      initial={false}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 mt-2 space-y-0.5" style={{ borderTop: "1px solid var(--tc-border)" }}>
                        {stat.breakdown.map((line) => (
                          <div key={line} className="text-[9px]" style={{ color: "var(--tc-text-secondary)" }}>
                            {line}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="rounded-lg p-2.5"
              style={{
                background: "rgba(139, 92, 246, 0.06)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-4 h-4 rounded flex items-center justify-center text-white text-[8px] font-bold" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}>
                  AI
                </div>
                <span className="text-[9px] font-semibold" style={{ color: "#7c3aed" }}>Weekly Insight</span>
              </div>
              <div className="text-[10px] leading-relaxed" style={{ color: "var(--tc-text-secondary)" }}>
                <Typewriter
                  text="94% coverage this week. 2 overtime risks flagged \u2014 consider reducing James K. by one shift. Labor costs down 3% vs last week."
                  speed={25}
                  delay={1200}
                />
              </div>
            </motion.div>
          </div>
        </BrowserFrame>
      }
    />
  );
}
