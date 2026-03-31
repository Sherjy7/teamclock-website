"use client";

import { useEffect, useState } from "react";
import { SCENES } from "@/lib/constants";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0">
      {/* Track */}
      <div
        className="relative w-0.5 rounded-full"
        style={{
          height: "200px",
          background: "var(--tc-border)",
        }}
      >
        {/* Fill */}
        <div
          className="absolute top-0 left-0 w-full rounded-full transition-all duration-150"
          style={{
            height: `${progress * 100}%`,
            background: "var(--tc-accent)",
          }}
        />
      </div>

      {/* Dots */}
      <div
        className="absolute flex flex-col justify-between"
        style={{ height: "200px" }}
      >
        {SCENES.map((scene, i) => {
          const dotPosition = i / (SCENES.length - 1);
          const passed = progress >= dotPosition - 0.02;
          return (
            <div
              key={scene.id}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                background: passed ? "var(--tc-accent)" : "transparent",
                border: passed
                  ? "2px solid var(--tc-accent)"
                  : "2px solid var(--tc-text-muted)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
