import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service \u2014 TeamClock",
  description: "Terms and conditions for using TeamClock.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <article className="max-w-[720px] mx-auto px-6 prose-sm" style={{ color: "var(--tc-text-secondary)" }}>
        <h1 className="text-3xl mb-2" style={{ color: "var(--tc-text-primary)" }}>Terms of Service</h1>
        <p className="text-sm mb-8" style={{ color: "var(--tc-text-muted)" }}>Last updated: March 30, 2026</p>

        <p className="mb-6 leading-relaxed">These Terms of Service (&quot;Terms&quot;) govern your use of TeamClock (&quot;the Service&quot;), operated by TeamClock (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By using the Service, you agree to these Terms.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>1. Acceptance of Terms</h2>
        <p className="mb-6 leading-relaxed">By creating an account or using the Service, you agree to be bound by these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>2. Account Responsibilities</h2>
        <p className="mb-6 leading-relaxed">You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating an account. You are responsible for all activity that occurs under your account. Notify us immediately of any unauthorized access.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>3. Acceptable Use</h2>
        <p className="mb-3 leading-relaxed">You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Interfere with or disrupt the Service or its infrastructure</li>
          <li>Upload malicious code or content</li>
          <li>Use the Service to harass, abuse, or harm others</li>
          <li>Scrape, crawl, or use automated means to access the Service without permission</li>
        </ul>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>4. Subscription and Pricing</h2>
        <p className="mb-6 leading-relaxed">TeamClock is currently available free of charge during our beta period. We reserve the right to introduce paid plans in the future. You will be given reasonable notice before any pricing changes take effect.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>5. Intellectual Property</h2>
        <p className="mb-6 leading-relaxed">The Service and its original content, features, and functionality are owned by TeamClock and are protected by intellectual property laws. You retain ownership of any data you input into the Service. By using the Service, you grant us a limited license to use your data solely to provide and improve the Service.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>6. Limitation of Liability</h2>
        <p className="mb-6 leading-relaxed">To the maximum extent permitted by law, TeamClock shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, or goodwill.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>7. Termination</h2>
        <p className="mb-6 leading-relaxed">You may close your account at any time by contacting us. We may suspend or terminate your access if you violate these Terms. Upon termination, your right to use the Service ceases immediately. We will make your data available for export for a reasonable period following termination.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>8. Changes to Terms</h2>
        <p className="mb-6 leading-relaxed">We may update these Terms from time to time. We will notify you of material changes via email or through the Service. Your continued use after changes take effect constitutes acceptance of the updated Terms.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>9. Governing Law</h2>
        <p className="mb-6 leading-relaxed">These Terms are governed by and construed in accordance with the laws of the United States. Any disputes shall be resolved in the courts of competent jurisdiction.</p>

        <h2 className="text-xl mt-8 mb-3" style={{ color: "var(--tc-text-primary)" }}>10. Contact</h2>
        <p className="leading-relaxed">If you have questions about these Terms, contact us at{" "}
          <a href="mailto:hello@teamclock.ai" className="underline" style={{ color: "var(--tc-accent)" }}>hello@teamclock.ai</a>.
        </p>
      </article>
    </div>
  );
}
