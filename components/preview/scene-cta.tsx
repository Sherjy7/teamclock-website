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
            href={`${APP_URL}/onboarding`}
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
