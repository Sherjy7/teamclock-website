import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy \u2014 TeamClock",
  description: "How TeamClock collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <article className="max-w-[720px] mx-auto px-6 prose-sm" style={{ color: "var(--tc-text-secondary)" }}>
        <h1 className="text-3xl mb-2" style={{ color: "var(--tc-text-primary)" }}>Privacy Policy</h1>
        <p className="text-sm mb-8" style={{ color: "var(--tc-text-muted)" }}>Last updated: April 14, 2026</p>

        <p className="mb-6 leading-relaxed">TeamClock (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use our web application and mobile application (collectively, the &quot;Service&quot;).</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>1. Information We Collect</h2>
        <p className="mb-3 leading-relaxed"><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password. Organization administrators may also provide business name and team member details.</p>
        <p className="mb-3 leading-relaxed"><strong>Location Data:</strong> With your permission, we collect GPS coordinates when you clock in or out. This is used for geofence verification to confirm you are at your assigned work location.</p>
        <p className="mb-3 leading-relaxed"><strong>Usage Data:</strong> We collect information about how you use the Service, including pages visited, features used, shifts created, and time entries recorded.</p>
        <p className="mb-3 leading-relaxed"><strong>Device Information:</strong> We collect device type, operating system, browser type, and push notification tokens for delivering notifications.</p>
        <p className="mb-6 leading-relaxed"><strong>Diagnostics:</strong> We automatically collect crash logs and performance data (such as app launch time) to identify and fix bugs and improve the app experience. This data is not linked to your identity.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Provide, maintain, and improve the Service</li>
          <li>Process shift scheduling, time tracking, and workforce management</li>
          <li>Send notifications about shifts, trades, and schedule changes</li>
          <li>Verify clock-in/out location via GPS geofencing</li>
          <li>Generate AI-powered scheduling recommendations</li>
          <li>Communicate with you about your account and updates</li>
        </ul>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>3. Data Sharing</h2>
        <p className="mb-3 leading-relaxed">We do not sell your personal information. We share data with the following service providers who assist in operating the Service:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Supabase</strong> &mdash; Database hosting and authentication</li>
          <li><strong>Vercel</strong> &mdash; Web application hosting</li>
          <li><strong>Sentry</strong> &mdash; Error tracking and monitoring</li>
          <li><strong>Resend</strong> &mdash; Email delivery</li>
          <li><strong>Expo</strong> &mdash; Push notification delivery</li>
          <li><strong>Anthropic</strong> &mdash; AI-powered scheduling features</li>
        </ul>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>4. Data Retention</h2>
        <p className="mb-6 leading-relaxed">We retain your information for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data at any time.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>5. Your Rights</h2>
        <p className="mb-3 leading-relaxed">You have the right to:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your account and data</li>
          <li>Export your data in a portable format</li>
          <li>Opt out of non-essential communications</li>
          <li>Withdraw consent for location tracking at any time</li>
        </ul>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>6. Cookies</h2>
        <p className="mb-6 leading-relaxed">We use essential cookies and local storage to maintain your authentication session and preferences. We do not use third-party advertising or tracking cookies.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>7. Contact</h2>
        <p className="leading-relaxed">If you have questions about this Privacy Policy or your data, contact us at{" "}
          <a href="mailto:hello@teamclock.ai" className="underline" style={{ color: "var(--tc-accent)" }}>hello@teamclock.ai</a>.
        </p>
      </article>
    </div>
  );
}
