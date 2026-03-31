"use client";

import { METRICS } from "@/lib/constants";
import { SectionReveal } from "./ui/section-reveal";
import { AnimatedCounter } from "./ui/animated-counter";

export function SocialProof() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {METRICS.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: "var(--tc-accent)" }}>
                  <AnimatedCounter target={metric.value} duration={2000} />
                  <span className="text-lg">+</span>
                </div>
                <div className="text-sm font-medium" style={{ color: "var(--tc-text-secondary)" }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: "var(--tc-text-muted)" }}>
            Trusted by growing teams
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
