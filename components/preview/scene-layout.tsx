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
