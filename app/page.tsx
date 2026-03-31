import { Hero } from "@/components/hero";
import { FeatureShowcase } from "@/components/feature-showcase";
import { AiDifferentiator } from "@/components/ai-differentiator";
import { SocialProof } from "@/components/social-proof";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureShowcase />
      <AiDifferentiator />
      <SocialProof />
      <FinalCta />
    </>
  );
}
