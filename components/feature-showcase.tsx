"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FEATURES, FeatureId } from "@/lib/constants";
import { SectionReveal } from "./ui/section-reveal";
import { SchedulingMockup } from "./mockups/scheduling-mockup";
import { AiAssistantMockup } from "./mockups/ai-assistant-mockup";
import { TimeClockMockup } from "./mockups/time-clock-mockup";
import { TradesMockup } from "./mockups/trades-mockup";
import { InsightsMockup } from "./mockups/insights-mockup";

const MOCKUP_MAP: Record<FeatureId, React.ComponentType> = {
  scheduling: SchedulingMockup,
  "ai-assistant": AiAssistantMockup,
  "time-clock": TimeClockMockup,
  trades: TradesMockup,
  insights: InsightsMockup,
};

const AUTO_ADVANCE_MS = 6000;

export function FeatureShowcase() {
  const [activeId, setActiveId] = useState<FeatureId>("scheduling");
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceTab = useCallback(() => {
    setActiveId((current) => {
      const idx = FEATURES.findIndex((f) => f.id === current);
      return FEATURES[(idx + 1) % FEATURES.length].id;
    });
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;

    const tick = 50;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + tick / AUTO_ADVANCE_MS;
        if (next >= 1) {
          advanceTab();
          return 0;
        }
        return next;
      });
    }, tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, activeId, advanceTab]);

  function handleTabClick(id: FeatureId) {
    setActiveId(id);
    setProgress(0);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }

  const ActiveMockup = MOCKUP_MAP[activeId];

  return (
    <section id="features" className="py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl mb-3" style={{ color: "var(--tc-text-primary)" }}>
              Everything your team needs, in one place
            </h2>
            <p className="text-base" style={{ color: "var(--tc-text-secondary)" }}>
              Click to explore how TeamClock works
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {FEATURES.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <button
                  key={feature.id}
                  onClick={() => handleTabClick(feature.id)}
                  className="relative flex-shrink-0 text-left px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: isActive ? "var(--tc-accent-light)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--tc-accent)" : "3px solid transparent",
                  }}
                >
                  <div
                    className="text-sm font-semibold mb-0.5"
                    style={{ color: isActive ? "var(--tc-accent)" : "var(--tc-text-primary)" }}
                  >
                    {feature.label}
                  </div>
                  <div
                    className="text-xs leading-relaxed hidden lg:block"
                    style={{ color: "var(--tc-text-secondary)" }}
                  >
                    {feature.description}
                  </div>

                  {isActive && (
                    <div
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full overflow-hidden lg:bottom-1"
                      style={{ background: "var(--tc-accent-light)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "var(--tc-accent)",
                          width: `${progress * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg"
              >
                <ActiveMockup />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
