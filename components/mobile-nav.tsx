"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { APP_URL } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg"
        style={{ color: "var(--tc-text-primary)" }}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
      </button>

      {/* Slide-in drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(15, 23, 42, 0.3)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 p-6 flex flex-col gap-6"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(24px)",
                borderLeft: "1px solid var(--tc-glass-border)",
                boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="self-end p-2"
                style={{ color: "var(--tc-text-secondary)" }}
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

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

              {/* CTAs */}
              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={`${APP_URL}/login`}
                  className="text-center text-sm font-semibold px-4 py-2.5 rounded-lg"
                  style={{
                    color: "var(--tc-text-primary)",
                    border: "1px solid var(--tc-border)",
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Log In
                </a>
                <a
                  href={`${APP_URL}/signup`}
                  className="text-center text-sm font-semibold px-4 py-2.5 rounded-lg text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
                    boxShadow:
                      "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(59, 130, 246, 0.2)",
                  }}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
