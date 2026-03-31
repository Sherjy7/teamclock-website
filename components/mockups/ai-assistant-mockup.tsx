"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrowserFrame } from "./browser-frame";
import { Typewriter } from "../ui/typewriter";

const MESSAGES = [
  { role: "user" as const, text: "Fill next week's schedule based on availability" },
  {
    role: "assistant" as const,
    text: "I've analyzed your team's availability and created a schedule. Sarah covers Mon/Wed/Fri, James takes Tue/Thu, and Mike fills the weekend. 3 shifts left open \u2014 want me to post those for pickup?",
  },
];

export function AiAssistantMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  return (
    <BrowserFrame>
      <div className="flex flex-col h-[300px]">
        {/* Header */}
        <div
          className="flex items-center gap-2 pb-2 mb-3"
          style={{ borderBottom: "1px solid var(--tc-border)" }}
        >
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}
          >
            AI
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--tc-text-primary)" }}>
            Schedule Assistant
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden space-y-3">
          {/* User message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onAnimationComplete={() => setVisibleMessages(1)}
            className="ml-8 px-3 py-2 rounded-2xl rounded-br-sm text-[11px] leading-relaxed"
            style={{
              background: "var(--tc-accent-light)",
              border: "1px solid var(--tc-accent-border)",
              color: "var(--tc-text-primary)",
            }}
          >
            {MESSAGES[0].text}
          </motion.div>

          {/* AI response with typewriter */}
          {visibleMessages >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mr-8 px-3 py-2 rounded-2xl rounded-bl-sm text-[11px] leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid var(--tc-glass-border)",
                color: "var(--tc-text-primary)",
              }}
            >
              <Typewriter
                text={MESSAGES[1].text}
                speed={20}
                delay={400}
                onComplete={() => setTypingDone(true)}
              />
            </motion.div>
          )}

          {/* Proposed shifts table */}
          {typingDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg p-2"
              style={{
                background: "rgba(139, 92, 246, 0.06)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
              }}
            >
              <div className="text-[9px] font-semibold mb-1.5" style={{ color: "#7c3aed" }}>
                Proposed Schedule
              </div>
              {["Sarah \u2014 Mon, Wed, Fri", "James \u2014 Tue, Thu", "Mike \u2014 Sat, Sun"].map(
                (line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="text-[10px] py-0.5"
                    style={{ color: "var(--tc-text-secondary)" }}
                  >
                    {line}
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
}
