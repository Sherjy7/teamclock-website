export const APP_URL = "https://app.teamclock.ai";

export const FEATURES = [
  {
    id: "scheduling",
    label: "Smart Scheduling",
    description:
      "Drag-and-drop weekly calendar with AI-powered auto-fill. Color-coded shifts, conflict detection, and one-click publishing.",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    description:
      "Chat with AI to build schedules, find coverage, and get instant answers about your workforce.",
  },
  {
    id: "time-clock",
    label: "Time Clock & GPS",
    description:
      "Employees clock in from their phone. GPS verification ensures they're on-site. Break tracking and tip entry built in.",
  },
  {
    id: "trades",
    label: "Shift Trades & Open Shifts",
    description:
      "Employees request trades and pick up open shifts. Managers approve with one tap. Everyone stays in the loop.",
  },
  {
    id: "insights",
    label: "Team Insights",
    description:
      "Hours worked, labor costs, overtime alerts, and AI-generated summaries — all in real time.",
  },
] as const;

export type FeatureId = (typeof FEATURES)[number]["id"];

export const METRICS = [
  { label: "Shifts Scheduled", value: 12400 },
  { label: "Hours Tracked", value: 48200 },
  { label: "Open Shifts Filled", value: 3100 },
  { label: "Hours Saved by AI", value: 860 },
] as const;

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
