import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--tc-dark)",
        color: "var(--tc-dark-text)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--tc-accent), var(--tc-accent-hover))",
                }}
              >
                <svg
                  width="16"
                  height="16"
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
                  fontSize: "1.125rem",
                  color: "var(--tc-dark-text-bright)",
                  letterSpacing: "-0.02em",
                }}
              >
                TeamClock
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--tc-dark-text)" }}>
              AI-powered workforce management for hourly teams.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--tc-dark-text-bright)" }}
            >
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#features"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--tc-dark-text)" }}
                >
                  Features
                </a>
              </li>
              <li>
                <span className="text-sm flex items-center gap-2" style={{ color: "var(--tc-dark-text)", opacity: 0.5 }}>
                  Pricing
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "var(--tc-accent)",
                    }}
                  >
                    Soon
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--tc-dark-text-bright)" }}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--tc-dark-text)" }}
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@teamclock.ai"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--tc-dark-text)" }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--tc-dark-text-bright)" }}
            >
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--tc-dark-text)" }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--tc-dark-text)" }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-8 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            color: "var(--tc-dark-text)",
          }}
        >
          &copy; {new Date().getFullYear()} TeamClock. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
