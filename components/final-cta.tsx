"use client";

import { APP_URL } from "@/lib/constants";
import { SectionReveal } from "./ui/section-reveal";

export function FinalCta() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))" }}
    >
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: "white" }} />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10" style={{ background: "white" }} />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <SectionReveal>
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: "white" }}>
            Ready to put your scheduling on autopilot?
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Get started in minutes. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`${APP_URL}/signup`}
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "white", color: "var(--tc-accent)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
            >
              Get Started Free
            </a>
            <a
              href="mailto:hello@teamclock.ai"
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "transparent", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)" }}
            >
              Talk to Us
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
