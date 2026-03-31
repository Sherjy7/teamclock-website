import type { Metadata } from "next";
import { ProgressBar } from "@/components/preview/progress-bar";
import { SceneIntro } from "@/components/preview/scene-intro";
import { SceneScheduling } from "@/components/preview/scene-scheduling";
import { SceneAi } from "@/components/preview/scene-ai";
import { SceneClockIn } from "@/components/preview/scene-clock-in";
import { SceneTrades } from "@/components/preview/scene-trades";
import { SceneInsights } from "@/components/preview/scene-insights";
import { SceneCta } from "@/components/preview/scene-cta";

export const metadata: Metadata = {
  title: "Preview — TeamClock",
  description:
    "See TeamClock in action. An interactive tour of AI-powered workforce management.",
};

export default function PreviewPage() {
  return (
    <div className="pt-16">
      <ProgressBar />
      <SceneIntro />
      <SceneScheduling />
      <SceneAi />
      <SceneClockIn />
      <SceneTrades />
      <SceneInsights />
      <SceneCta />
    </div>
  );
}
