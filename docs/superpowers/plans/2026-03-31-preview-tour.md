# Preview Tour Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-driven interactive guided tour page at `/preview` that walks visitors through TeamClock's features with cinematic narration and light interactive moments.

**Architecture:** Single new route (`/preview`) with 7 full-viewport scene components orchestrated by a page-level scroll progress tracker. Each scene has narration on the left and an animated interactive mockup on the right. Reuses existing `BrowserFrame`, `PhoneFrame`, `AnimatedCounter`, `Typewriter`, and `SectionReveal` components. Nav updated to include "Preview" link.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, Framer Motion (whileInView, AnimatePresence), TypeScript.

**Spec:** `docs/superpowers/specs/2026-03-31-preview-tour-design.md`

---

## File Structure

```
teamclock-website/
├── app/
│   └── preview/
│       └── page.tsx                    # Preview tour page — assembles all scenes
├── components/
│   ├── nav.tsx                         # MODIFY — add "Preview" link
│   ├── mobile-nav.tsx                  # MODIFY — add "Preview" link
│   └── preview/
│       ├── scene-layout.tsx            # Reusable scene wrapper (narration + mockup slots)
│       ├── progress-bar.tsx            # Vertical scroll progress indicator
│       ├── try-it-badge.tsx            # Pulsing "Try it →" / "Nice! ✓" badge
│       ├── scene-intro.tsx             # Scene 1: intro with logo animation
│       ├── scene-scheduling.tsx        # Scene 2: draggable calendar
│       ├── scene-ai.tsx               # Scene 3: AI fill gaps
│       ├── scene-clock-in.tsx          # Scene 4: phone clock-in
│       ├── scene-trades.tsx            # Scene 5: trade approval
│       ├── scene-insights.tsx          # Scene 6: dashboard cards + AI summary
│       └── scene-cta.tsx              # Scene 7: final CTA
└── lib/
    └── constants.ts                    # MODIFY — add SCENES data array
```

**Key decisions:**
- Each scene is its own component — isolated, testable, no shared state between scenes
- `scene-layout.tsx` is a reusable wrapper that handles the split layout, background alternation, and scroll-triggered entrance animations
- `try-it-badge.tsx` is shared across all interactive scenes — manages the pulse → "Nice!" transition
- `progress-bar.tsx` tracks scroll position independently using `window.scrollY`
- Scene data (numbers, headlines, descriptions) lives in `constants.ts` for easy copy editing

---

## Task 1: Scene Data & Shared Primitives

**Files:**
- Modify: `lib/constants.ts`
- Create: `components/preview/try-it-badge.tsx`
- Create: `components/preview/scene-layout.tsx`
- Create: `components/preview/progress-bar.tsx`

- [ ] **Step 1: Add SCENES data to `lib/constants.ts`**

Add the following after the existing `METRICS` constant:

```typescript
export const SCENES = [
  {
    id: "intro",
    headline: "See TeamClock in action",
    description:
      "Follow along as a manager builds their week — from scheduling to insights.",
  },
  {
    id: "scheduling",
    number: "01",
    headline: "Monday morning. Time to build next week's schedule.",
    description:
      "Drag shifts onto the calendar. Color-coded by employee, conflict detection built in.",
    tryIt: "Drag a shift to a new slot",
  },
  {
    id: "ai",
    number: "02",
    headline: "Three gaps left. Let AI handle it.",
    description:
      "One click and the AI analyzes availability, overtime rules, and fairness to fill your schedule.",
    tryIt: "Click 'Fill with AI' to watch it work",
  },
  {
    id: "clock-in",
    number: "03",
    headline: "Tuesday 8:58 AM. Sarah arrives at work.",
    description:
      "One tap to clock in. GPS confirms she's at the right location.",
    tryIt: "Tap the Clock In button",
  },
  {
    id: "trades",
    number: "04",
    headline: "Wednesday. James can't make Thursday. Sarah can cover.",
    description:
      "Trade requests come in with all the context. One tap to approve.",
    tryIt: "Click Approve to complete the trade",
  },
  {
    id: "insights",
    number: "05",
    headline: "Friday. Let's see how the week went.",
    description:
      "Hours, costs, overtime risks, and an AI summary — all at a glance.",
    tryIt: "Hover over cards to see breakdowns",
  },
  {
    id: "cta",
    headline: "That's TeamClock. Ready to try it for real?",
    description: "Get started in minutes. No credit card required.",
  },
] as const;
```

- [ ] **Step 2: Create `components/preview/try-it-badge.tsx`**

```tsx
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
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Nice!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create `components/preview/scene-layout.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SceneLayoutProps {
  number?: string;
  headline: string;
  description: string;
  badge?: ReactNode;
  mockup: ReactNode;
  alt?: boolean;
  gradient?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export function SceneLayout({
  number,
  headline,
  description,
  badge,
  mockup,
  alt = false,
  gradient = false,
  fullWidth = false,
}: SceneLayoutProps) {
  const bg = gradient
    ? "linear-gradient(135deg, #e0e7ff 0%, #f0f4f8 40%, #e0f2fe 100%)"
    : alt
      ? "var(--tc-bg-alt)"
      : "var(--tc-bg)";

  if (fullWidth) {
    return (
      <section className="min-h-screen flex items-center relative" style={{ background: bg }}>
        {mockup}
      </section>
    );
  }

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ background: bg }}
    >
      {gradient && (
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--tc-text-muted) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Narration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {number && (
            <div
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-4"
              style={{
                background: "var(--tc-accent-light)",
                color: "var(--tc-accent)",
                border: "1px solid var(--tc-accent-border)",
              }}
            >
              {number}
            </div>
          )}

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4"
            style={{ color: "var(--tc-text-primary)" }}
          >
            {headline}
          </h2>

          <p
            className="text-base lg:text-lg leading-relaxed mb-6 max-w-md"
            style={{ color: "var(--tc-text-secondary)" }}
          >
            {description}
          </p>

          {badge}
        </motion.div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {mockup}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/preview/progress-bar.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { SCENES } from "@/lib/constants";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0">
      {/* Track */}
      <div
        className="relative w-0.5 rounded-full"
        style={{
          height: "200px",
          background: "var(--tc-border)",
        }}
      >
        {/* Fill */}
        <div
          className="absolute top-0 left-0 w-full rounded-full transition-all duration-150"
          style={{
            height: `${progress * 100}%`,
            background: "var(--tc-accent)",
          }}
        />
      </div>

      {/* Dots */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ height: "200px" }}
      >
        {SCENES.map((scene, i) => {
          const dotPosition = i / (SCENES.length - 1);
          const passed = progress >= dotPosition - 0.02;
          return (
            <div
              key={scene.id}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                background: passed ? "var(--tc-accent)" : "transparent",
                border: passed
                  ? "2px solid var(--tc-accent)"
                  : "2px solid var(--tc-text-muted)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify everything compiles**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/constants.ts components/preview/
git commit -m "feat: add preview tour primitives — scene layout, progress bar, try-it badge"
```

---

## Task 2: Scene 1 (Intro) & Scene 7 (CTA)

**Files:**
- Create: `components/preview/scene-intro.tsx`
- Create: `components/preview/scene-cta.tsx`

These are the simplest scenes — no interactive mockups.

- [ ] **Step 1: Create `components/preview/scene-intro.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export function SceneIntro() {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e0e7ff 0%, #f0f4f8 40%, #e0f2fe 100%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--tc-text-muted) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative text-center max-w-2xl mx-auto px-6">
        {/* Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
          }}
        >
          <motion.svg
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </motion.svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ color: "var(--tc-text-primary)" }}
        >
          See TeamClock in action
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg mb-10"
          style={{ color: "var(--tc-text-secondary)" }}
        >
          Follow along as a manager builds their week — from scheduling to
          insights.
        </motion.p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-sm font-medium"
          style={{ color: "var(--tc-text-muted)" }}
        >
          Scroll to begin ↓
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/preview/scene-cta.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export function SceneCta() {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-16 left-16 w-72 h-72 rounded-full opacity-10"
        style={{ background: "white" }}
      />
      <div
        className="absolute bottom-16 right-16 w-56 h-56 rounded-full opacity-10"
        style={{ background: "white" }}
      />

      <div className="relative text-center max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl mb-4"
          style={{ color: "white" }}
        >
          That&apos;s TeamClock. Ready to try it for real?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg mb-10"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          Get started in minutes. No credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href={`${APP_URL}/signup`}
            className="inline-flex items-center px-8 py-3.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "white",
              color: "var(--tc-accent)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            Get Started Free
          </a>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/preview/scene-intro.tsx components/preview/scene-cta.tsx
git commit -m "feat: add intro and CTA scenes for preview tour"
```

---

## Task 3: Scene 2 — Scheduling (Draggable Shift)

**Files:**
- Create: `components/preview/scene-scheduling.tsx`

- [ ] **Step 1: Create `components/preview/scene-scheduling.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INITIAL_SHIFTS = [
  { id: "s1", day: 0, label: "Sarah M.", color: "#3b82f6", time: "9a–5p" },
  { id: "s2", day: 0, label: "Mike R.", color: "#10b981", time: "2p–10p" },
  { id: "s3", day: 1, label: "James K.", color: "#8b5cf6", time: "9a–5p" },
  { id: "s4", day: 2, label: "Sarah M.", color: "#3b82f6", time: "9a–5p" },
  { id: "s5", day: 2, label: "Lisa T.", color: "#ec4899", time: "11a–7p" },
  { id: "s6", day: 3, label: "Mike R.", color: "#10b981", time: "9a–5p" },
  { id: "s7", day: 5, label: "Lisa T.", color: "#ec4899", time: "9a–5p" },
  { id: "s8", day: 6, label: "Sarah M.", color: "#3b82f6", time: "10a–6p" },
];

// The draggable shift — s3 (James K., Tuesday) can move to Thursday (day 4)
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

                {/* Drop target indicator */}
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
```

- [ ] **Step 2: Verify**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/preview/scene-scheduling.tsx
git commit -m "feat: add scheduling scene with draggable shift interaction"
```

---

## Task 4: Scene 3 — AI Fills the Gaps

**Files:**
- Create: `components/preview/scene-ai.tsx`

- [ ] **Step 1: Create `components/preview/scene-ai.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EXISTING_SHIFTS = [
  { day: 0, label: "Sarah M.", color: "#3b82f6", time: "9a–5p" },
  { day: 1, label: "James K.", color: "#8b5cf6", time: "9a–5p" },
  { day: 3, label: "Mike R.", color: "#10b981", time: "9a–5p" },
  { day: 5, label: "Lisa T.", color: "#ec4899", time: "9a–5p" },
];

const AI_FILLS = [
  { day: 2, label: "Sarah M.", color: "#3b82f6", time: "9a–5p" },
  { day: 4, label: "James K.", color: "#8b5cf6", time: "2p–10p" },
  { day: 6, label: "Mike R.", color: "#10b981", time: "10a–6p" },
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

          {/* Toast */}
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
```

- [ ] **Step 2: Verify**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/preview/scene-ai.tsx
git commit -m "feat: add AI fill-gaps scene with interactive button"
```

---

## Task 5: Scene 4 — Clock In

**Files:**
- Create: `components/preview/scene-clock-in.tsx`

- [ ] **Step 1: Create `components/preview/scene-clock-in.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

export function SceneClockIn() {
  const [clockedIn, setClockedIn] = useState(false);
  const [showGps, setShowGps] = useState(false);

  const handleClockIn = useCallback(() => {
    if (clockedIn) return;
    setClockedIn(true);
    setTimeout(() => setShowGps(true), 600);
  }, [clockedIn]);

  return (
    <SceneLayout
      number="03"
      headline="Tuesday 8:58 AM. Sarah arrives at work."
      description="One tap to clock in. GPS confirms she's at the right location."
      badge={
        <TryItBadge
          label="Tap the Clock In button"
          completed={clockedIn}
          onAutoComplete={handleClockIn}
        />
      }
      mockup={
        <PhoneFrame>
          <div className="flex flex-col items-center pt-4">
            <span
              className="text-xs font-semibold mb-1"
              style={{ color: "var(--tc-text-secondary)" }}
            >
              Downtown Cafe
            </span>
            <span
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--tc-text-primary)" }}
            >
              8:58 AM
            </span>

            <AnimatePresence mode="wait">
              {!clockedIn ? (
                <motion.button
                  key="clock-in"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={handleClockIn}
                  className="w-28 h-28 rounded-full text-white text-sm font-bold cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  GPS Verified — Within geofence
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PhoneFrame>
      }
    />
  );
}
```

- [ ] **Step 2: Verify**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/preview/scene-clock-in.tsx
git commit -m "feat: add clock-in scene with tap interaction and GPS badge"
```

---

## Task 6: Scene 5 — Trades

**Files:**
- Create: `components/preview/scene-trades.tsx`

- [ ] **Step 1: Create `components/preview/scene-trades.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

export function SceneTrades() {
  const [approved, setApproved] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleApprove = useCallback(() => {
    if (approved) return;
    setApproved(true);
    setTimeout(() => setShowNotification(true), 800);
  }, [approved]);

  return (
    <SceneLayout
      number="04"
      headline="Wednesday. James can't make Thursday. Sarah can cover."
      description="Trade requests come in with all the context. One tap to approve."
      alt
      badge={
        <TryItBadge
          label="Click Approve to complete the trade"
          completed={approved}
          onAutoComplete={handleApprove}
        />
      }
      mockup={
        <BrowserFrame>
          <div className="space-y-3">
            <div
              className="text-xs font-semibold"
              style={{ color: "var(--tc-text-secondary)" }}
            >
              Trade Request
            </div>

            <div
              className="rounded-lg p-4"
              style={{
                background: "var(--tc-surface-solid)",
                border: "1px solid var(--tc-border)",
              }}
            >
              {/* People */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#8b5cf6" }}
                >
                  JK
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--tc-text-muted)"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#3b82f6" }}
                >
                  SM
                </div>
              </div>

              <div
                className="text-[11px] font-semibold mb-1"
                style={{ color: "var(--tc-text-primary)" }}
              >
                James K. wants to trade Thu 9a–5p
              </div>
              <div
                className="text-[10px] mb-3"
                style={{ color: "var(--tc-text-secondary)" }}
              >
                Sarah M. is available and has accepted
              </div>

              {/* No conflicts badge */}
              <div
                className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full mb-3"
                style={{
                  background: "var(--tc-success-light)",
                  color: "#047857",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No conflicts
              </div>

              {/* Action area */}
              <AnimatePresence mode="wait">
                {!approved ? (
                  <motion.div
                    key="buttons"
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <button
                      onClick={handleApprove}
                      className="text-[10px] font-semibold px-4 py-1.5 rounded-md text-white cursor-pointer"
                      style={{ background: "var(--tc-accent)" }}
                    >
                      Approve
                    </button>
                    <div
                      className="text-[10px] font-semibold px-4 py-1.5 rounded-md"
                      style={{
                        border: "1px solid var(--tc-border)",
                        color: "var(--tc-text-secondary)",
                      }}
                    >
                      Decline
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="approved"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                      style={{
                        background: "var(--tc-success-light)",
                        color: "#047857",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Approved
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Swap visualization */}
            <AnimatePresence>
              {approved && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg p-3 flex items-center justify-center gap-4"
                  style={{
                    background: "rgba(59, 130, 246, 0.04)",
                    border: "1px solid rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <motion.div
                    initial={{ x: 40 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-[10px] font-semibold px-2 py-1 rounded text-white"
                    style={{ background: "#8b5cf6" }}
                  >
                    James → Off
                  </motion.div>
                  <motion.div
                    initial={{ x: -40 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-[10px] font-semibold px-2 py-1 rounded text-white"
                    style={{ background: "#3b82f6" }}
                  >
                    Sarah → Thu 9a–5p
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification */}
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] text-center"
                  style={{ color: "var(--tc-text-muted)" }}
                >
                  Sarah notified via push
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </BrowserFrame>
      }
    />
  );
}
```

- [ ] **Step 2: Verify**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/preview/scene-trades.tsx
git commit -m "feat: add trades scene with approve interaction and swap animation"
```

---

## Task 7: Scene 6 — Insights

**Files:**
- Create: `components/preview/scene-insights.tsx`

- [ ] **Step 1: Create `components/preview/scene-insights.tsx`**

```tsx
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
    breakdown: ["Sarah M. — 40h", "James K. — 38h", "Mike R. — 42h", "Lisa T. — 36h"],
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
    breakdown: ["Mike R. — 42h (limit 40)", "James K. — close at 38h"],
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
    // Auto-expand cards one by one
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
      description="Hours, costs, overtime risks, and an AI summary — all at a glance."
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
            <div
              className="text-xs font-semibold"
              style={{ color: "var(--tc-text-secondary)" }}
            >
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
                      boxShadow: isHovered
                        ? "var(--tc-shadow-lg)"
                        : "none",
                    }}
                    className="rounded-lg p-2.5 cursor-pointer transition-colors"
                    style={{
                      background: "var(--tc-surface-solid)",
                      border: `1px solid ${isHovered ? stat.color : "var(--tc-border)"}`,
                    }}
                  >
                    <div
                      className="text-[9px] font-medium mb-1"
                      style={{ color: "var(--tc-text-muted)" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.prefix}
                      <AnimatedCounter target={stat.value} duration={1500} />
                      {stat.suffix}
                    </div>

                    {/* Breakdown on hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className="pt-2 mt-2 space-y-0.5"
                        style={{ borderTop: "1px solid var(--tc-border)" }}
                      >
                        {stat.breakdown.map((line) => (
                          <div
                            key={line}
                            className="text-[9px]"
                            style={{ color: "var(--tc-text-secondary)" }}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* AI Summary */}
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
                <div
                  className="w-4 h-4 rounded flex items-center justify-center text-white text-[8px] font-bold"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  }}
                >
                  AI
                </div>
                <span
                  className="text-[9px] font-semibold"
                  style={{ color: "#7c3aed" }}
                >
                  Weekly Insight
                </span>
              </div>
              <div
                className="text-[10px] leading-relaxed"
                style={{ color: "var(--tc-text-secondary)" }}
              >
                <Typewriter
                  text="94% coverage this week. 2 overtime risks flagged — consider reducing James K. by one shift. Labor costs down 3% vs last week."
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
```

- [ ] **Step 2: Verify**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/preview/scene-insights.tsx
git commit -m "feat: add insights scene with hoverable cards and AI typewriter"
```

---

## Task 8: Preview Page & Nav Update

**Files:**
- Create: `app/preview/page.tsx`
- Modify: `components/nav.tsx`
- Modify: `components/mobile-nav.tsx`

- [ ] **Step 1: Create `app/preview/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ProgressBar } from "@/components/preview/progress-bar";
import { SceneIntro } from "@/components/preview/scene-intro";
import { SceneScheduling } from "@/components/preview/scene-scheduling";
import { SceneAi } from "@/components/preview/scene-ai";
import { SceneClockIn } from "@/components/preview/scene-clock-in";
import { SceneTrades } from "@/components/preview/scene-trades";
import { SceneInsights } from "@/components/preview/scene-insights";
import { SceneCta } from "@/components/preview/scene-cta";

export const metadata: Metadata = {
  title: "Preview — TeamClock",
  description:
    "See TeamClock in action. An interactive tour of AI-powered workforce management.",
};

export default function PreviewPage() {
  return (
    <div className="pt-16">
      <ProgressBar />
      <SceneIntro />
      <SceneScheduling />
      <SceneAi />
      <SceneClockIn />
      <SceneTrades />
      <SceneInsights />
      <SceneCta />
    </div>
  );
}
```

- [ ] **Step 2: Add "Preview" link to `components/nav.tsx`**

In `components/nav.tsx`, find the desktop links section:

```tsx
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--tc-text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-secondary)")
            }
          >
            Features
          </a>
          <Link
            href="/about"
```

Add the Preview link between Features and About. Replace the entire desktop links div with:

```tsx
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--tc-text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-secondary)")
            }
          >
            Features
          </a>
          <Link
            href="/preview"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--tc-text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-secondary)")
            }
          >
            Preview
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--tc-text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--tc-text-secondary)")
            }
          >
            About
          </Link>
        </div>
```

- [ ] **Step 3: Add "Preview" link to `components/mobile-nav.tsx`**

In `components/mobile-nav.tsx`, find the links section:

```tsx
              {/* Links */}
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2"
                  style={{ color: "var(--tc-text-primary)" }}
                >
                  Features
                </a>
                <Link
                  href="/about"
```

Add Preview between Features and About. Replace the entire links div with:

```tsx
              {/* Links */}
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2"
                  style={{ color: "var(--tc-text-primary)" }}
                >
                  Features
                </a>
                <Link
                  href="/preview"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2"
                  style={{ color: "var(--tc-text-primary)" }}
                >
                  Preview
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2"
                  style={{ color: "var(--tc-text-primary)" }}
                >
                  About
                </Link>
              </div>
```

- [ ] **Step 4: Verify full build**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

Expected: Build succeeds, `/preview` route generated along with all other routes.

- [ ] **Step 5: Commit**

```bash
git add app/preview/ components/nav.tsx components/mobile-nav.tsx
git commit -m "feat: add preview tour page with all 7 scenes and nav link"
```

---

## Task 9: Build Verification & Deploy

**Files:** None modified — verification and deployment only.

- [ ] **Step 1: Run production build**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run build
```

Expected: All routes statically generated including `/preview`.

- [ ] **Step 2: Visual verification with dev server**

```bash
cd c:/Users/sherr/projects/teamclock-website && npm run dev
```

Open `http://localhost:3000/preview`. Verify:
- Nav shows "Preview" between "Features" and "About"
- Scene 1 (Intro) fills viewport with animated logo and "Scroll to begin"
- Scrolling reveals each scene with fade/slide animations
- Scene 2: clicking the highlighted shift (or waiting 3s) moves it to Thursday
- Scene 3: clicking "Fill with AI" (or waiting 3s) fills 3 empty slots
- Scene 4: clicking Clock In (or waiting 3s) triggers green transition + GPS badge
- Scene 5: clicking Approve (or waiting 3s) shows swap animation
- Scene 6: hovering cards shows breakdowns, AI text types out
- Scene 7: CTA with "Get Started Free" and "Back to Home"
- Progress bar on left shows dots and fill as you scroll
- Mobile: stacked layout, progress bar hidden

Stop dev server.

- [ ] **Step 3: Push and deploy**

```bash
cd c:/Users/sherr/projects/teamclock-website && git push origin main
```

Vercel will auto-deploy from the GitHub push since the repo is connected.

- [ ] **Step 4: Verify production**

Wait for Vercel deploy to complete, then verify:
- `https://teamclock.ai/preview` loads the tour
- All scenes render and animate
- Interactive moments work
- Nav links to preview from all pages
