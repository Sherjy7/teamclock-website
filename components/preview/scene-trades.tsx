"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { SceneLayout } from "./scene-layout";
import { TryItBadge } from "./try-it-badge";

export function SceneTrades() {
  const [approved, setApproved] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleApprove = useCallback(() => {
    if (approved) return;
    setApproved(true);
    setTimeout(() => setShowNotification(true), 800);
  }, [approved]);

  return (
    <SceneLayout
      number="04"
      headline="Wednesday. James can't make Thursday. Sarah can cover."
      description="Trade requests come in with all the context. One tap to approve."
      alt
      badge={
        <TryItBadge
          label="Click Approve to complete the trade"
          completed={approved}
          onAutoComplete={handleApprove}
        />
      }
      mockup={
        <BrowserFrame>
          <div className="space-y-3">
            <div className="text-xs font-semibold" style={{ color: "var(--tc-text-secondary)" }}>
              Trade Request
            </div>

            <div className="rounded-lg p-4" style={{ background: "var(--tc-surface-solid)", border: "1px solid var(--tc-border)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#8b5cf6" }}>JK</div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--tc-text-muted)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#3b82f6" }}>SM</div>
              </div>

              <div className="text-[11px] font-semibold mb-1" style={{ color: "var(--tc-text-primary)" }}>
                James K. wants to trade Thu 9a–5p
              </div>
              <div className="text-[10px] mb-3" style={{ color: "var(--tc-text-secondary)" }}>
                Sarah M. is available and has accepted
              </div>

              <div className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full mb-3" style={{ background: "var(--tc-success-light)", color: "#047857" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                No conflicts
              </div>

              <AnimatePresence mode="wait">
                {!approved ? (
                  <motion.div key="buttons" exit={{ opacity: 0 }} className="flex gap-2">
                    <button onClick={handleApprove} className="text-[10px] font-semibold px-4 py-1.5 rounded-md text-white cursor-pointer" style={{ background: "var(--tc-accent)" }}>Approve</button>
                    <div className="text-[10px] font-semibold px-4 py-1.5 rounded-md" style={{ border: "1px solid var(--tc-border)", color: "var(--tc-text-secondary)" }}>Decline</div>
                  </motion.div>
                ) : (
                  <motion.div key="approved" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                    <div className="text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1" style={{ background: "var(--tc-success-light)", color: "#047857" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      Approved
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {approved && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ delay: 0.3 }} className="rounded-lg p-3 flex items-center justify-center gap-4" style={{ background: "rgba(59, 130, 246, 0.04)", border: "1px solid rgba(59, 130, 246, 0.1)" }}>
                  <motion.div initial={{ x: 40 }} animate={{ x: 0 }} transition={{ delay: 0.5, type: "spring" }} className="text-[10px] font-semibold px-2 py-1 rounded text-white" style={{ background: "#8b5cf6" }}>
                    James → Off
                  </motion.div>
                  <motion.div initial={{ x: -40 }} animate={{ x: 0 }} transition={{ delay: 0.5, type: "spring" }} className="text-[10px] font-semibold px-2 py-1 rounded text-white" style={{ background: "#3b82f6" }}>
                    Sarah → Thu 9a–5p
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showNotification && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] text-center" style={{ color: "var(--tc-text-muted)" }}>
                  Sarah notified via push
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </BrowserFrame>
      }
    />
  );
}
