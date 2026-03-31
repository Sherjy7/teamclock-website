"use client";

import { motion } from "framer-motion";
import { APP_URL } from "@/lib/constants";
import { HeroMockup } from "./hero-mockup";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e0e7ff 0%, #f0f4f8 40%, #e0f2fe 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--tc-text-muted) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Copy */}
        <div>
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "var(--tc-accent-light)",
              border: "1px solid var(--tc-accent-border)",
              color: "var(--tc-accent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--tc-accent)",
                boxShadow: "0 0 6px var(--tc-accent-glow)",
              }}
            />
            AI-Powered Workforce Management
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] mb-5"
            style={{ color: "var(--tc-text-primary)" }}
          >
            Stop managing schedules.{" "}
            <span style={{ color: "var(--tc-accent)" }}>
              Start managing your team.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "var(--tc-text-secondary)" }}
          >
            TeamClock gives hourly teams one place to schedule shifts, track
            time, and let AI handle the busywork &mdash; so managers can focus
            on what matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-4"
          >
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background:
                  "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
                boxShadow:
                  "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(59, 130, 246, 0.25)",
              }}
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                color: "var(--tc-text-primary)",
                border: "1px solid var(--tc-border)",
                background: "rgba(255, 255, 255, 0.6)",
              }}
            >
              See How It Works
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs"
            style={{ color: "var(--tc-text-muted)" }}
          >
            No credit card required &middot; Free for small teams
          </motion.p>
        </div>

        {/* Right — Animated mockup */}
        <div className="hidden lg:block">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
