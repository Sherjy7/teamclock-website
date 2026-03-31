import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About \u2014 TeamClock",
  description: "Built for the teams that keep the world running.",
};

const VALUES = [
  { title: "AI-First", description: "Every feature we build starts with: can AI do this for the manager?" },
  { title: "Simple by Default", description: "Powerful doesn't have to mean complicated." },
  { title: "Built for Hourly Teams", description: "Not enterprise. Not office workers. The people who clock in and out." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "var(--tc-text-primary)" }}>
            Built for the teams that keep the world running
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--tc-text-secondary)" }}>
            Hourly workers are the backbone of every restaurant, retail store, and service business. TeamClock exists to give their managers better tools and give them a better work experience.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl mb-4" style={{ color: "var(--tc-text-primary)" }}>Why TeamClock?</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--tc-text-secondary)" }}>
            <p>Managing an hourly team shouldn&apos;t feel like a second job. But for most managers, it does &mdash; juggling spreadsheets, fielding last-minute callouts, manually tracking hours, and hoping the schedule works out.</p>
            <p>We built TeamClock because we believe AI can handle the operational busywork that burns managers out. Not as a gimmick or a chatbot bolted onto a legacy tool, but as the core of how workforce management should work.</p>
            <p>Our vision is simple: every restaurant manager, retail supervisor, and service team lead should have an AI assistant that builds schedules, handles callouts, tracks time, and flags problems before they happen &mdash; so they can spend their energy on their team, not on admin.</p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl mb-6" style={{ color: "var(--tc-text-primary)" }}>What we believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--tc-surface)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--tc-glass-border)",
                  boxShadow: "var(--tc-shadow-md)",
                }}
              >
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--tc-text-primary)" }}>{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--tc-text-secondary)" }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-base" style={{ color: "var(--tc-text-secondary)" }}>
            Questions? Reach us at{" "}
            <a href="mailto:hello@teamclock.ai" className="font-semibold underline" style={{ color: "var(--tc-accent)" }}>
              hello@teamclock.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
