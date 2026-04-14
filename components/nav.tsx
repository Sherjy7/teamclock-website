"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.72)"
          : "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 0, 0, 0.06)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 1px 3px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)"
          : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-syne), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--tc-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            TeamClock
          </span>
        </Link>

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

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}/login`}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              color: "var(--tc-text-primary)",
              border: "1px solid var(--tc-border)",
              background: "rgba(255, 255, 255, 0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
              e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.borderColor = "var(--tc-border)";
            }}
          >
            Log In
          </a>
          <a
            href={`${APP_URL}/onboarding`}
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all"
            style={{
              background:
                "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
              boxShadow:
                "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(59, 130, 246, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 2px 4px rgba(0, 0, 0, 0.06), 0 8px 20px rgba(59, 130, 246, 0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(59, 130, 246, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <MobileNav />
      </nav>
    </header>
  );
}
