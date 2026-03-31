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
