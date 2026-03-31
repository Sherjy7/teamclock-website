"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./ui/section-reveal";

const AI_FEATURES = [
  {
    title: "AI Schedule Generation",
    description: "Tell the AI your needs. It builds the schedule in seconds \u2014 respecting availability, overtime rules, and fairness.",
    badge: "Live",
    badgeColor: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.1)",
    badgePulse: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Predictive Intelligence",
    description: "Know who's going to call out before they do. Get understaffing alerts before you're short. AI that sees problems coming.",
    badge: "Coming Soon",
    badgeColor: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.1)",
    badgePulse: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /><path d="M16 2l6 6" />
      </svg>
    ),
  },
  {
    title: "Autonomous Agent",
    description: "An AI that handles callouts, finds replacements, and resolves trades at 2 AM \u2014 so you wake up to solutions, not problems.",
    badge: "Coming Soon",
    badgeColor: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.1)",
    badgePulse: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M12 8V4H8" /><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 12h10" /><path d="M7 16h6" />
      </svg>
    ),
  },
];

export function AiDifferentiator() {
  return (
    <section className="py-24" style={{ background: "var(--tc-bg-alt)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl mb-3" style={{ color: "var(--tc-text-primary)" }}>
              AI that actually runs your workforce
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--tc-text-secondary)" }}>
              Not just another scheduling tool with a chatbot bolted on. TeamClock&apos;s AI is the operating system.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_FEATURES.map((feature, i) => (
            <SectionReveal key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "var(--tc-shadow-lg)" }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl p-6 h-full"
                style={{
                  background: "var(--tc-surface)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--tc-glass-border)",
                  boxShadow: "var(--tc-shadow-md)",
                }}
              >
                <div className="mb-4">{feature.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-base font-bold" style={{ color: "var(--tc-text-primary)" }}>
                    {feature.title}
                  </h3>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: feature.badgeBg, color: feature.badgeColor }}
                  >
                    {feature.badgePulse && (
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: feature.badgeColor }} />
                    )}
                    {feature.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--tc-text-secondary)" }}>
                  {feature.description}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <p className="text-center text-lg font-medium mt-12 max-w-2xl mx-auto" style={{ color: "var(--tc-text-secondary)" }}>
            Your competitors use spreadsheets and gut feelings.{" "}
            <span style={{ color: "var(--tc-accent)" }}>You&apos;ll have an AI workforce manager that never sleeps.</span>
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
