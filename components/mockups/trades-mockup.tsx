"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame } from "./browser-frame";

export function TradesMockup() {
  const [approved, setApproved] = useState(false);
  const [showPickup, setShowPickup] = useState(false);

  useEffect(() => {
    const approveTimer = setTimeout(() => setApproved(true), 2000);
    const pickupTimer = setTimeout(() => setShowPickup(true), 3200);
    return () => {
      clearTimeout(approveTimer);
      clearTimeout(pickupTimer);
    };
  }, []);

  return (
    <BrowserFrame>
      <div className="space-y-3">
        <div className="text-xs font-semibold" style={{ color: "var(--tc-text-secondary)" }}>
          Shift Activity
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg p-3"
          style={{ background: "var(--tc-surface-solid)", border: "1px solid var(--tc-border)" }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-[11px] font-semibold" style={{ color: "var(--tc-text-primary)" }}>
                Trade Request
              </div>
              <div className="text-[10px]" style={{ color: "var(--tc-text-secondary)" }}>
                Sarah M. wants to trade her Tuesday 9a-5p
              </div>
            </div>
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{
                background: approved ? "var(--tc-success-light)" : "rgba(245, 158, 11, 0.1)",
                color: approved ? "#047857" : "#b45309",
              }}
            >
              {approved ? "Approved" : "Pending"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!approved && (
              <motion.div key="buttons" exit={{ opacity: 0 }} className="flex gap-2">
                <div className="text-[10px] font-semibold px-3 py-1 rounded-md text-white" style={{ background: "var(--tc-accent)" }}>
                  Approve
                </div>
                <div className="text-[10px] font-semibold px-3 py-1 rounded-md" style={{ border: "1px solid var(--tc-border)", color: "var(--tc-text-secondary)" }}>
                  Decline
                </div>
              </motion.div>
            )}
            {approved && (
              <motion.div
                key="approved"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] flex items-center gap-1"
                style={{ color: "#047857" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Trade complete — shifts swapped
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {showPickup && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg p-3"
              style={{ background: "var(--tc-surface-solid)", border: "1px solid var(--tc-border)" }}
            >
              <div className="text-[11px] font-semibold mb-1" style={{ color: "var(--tc-text-primary)" }}>
                Open Shift Available
              </div>
              <div className="text-[10px] mb-2" style={{ color: "var(--tc-text-secondary)" }}>
                Thursday 2p-10p &middot; Downtown Cafe
              </div>
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                className="inline-block text-[10px] font-semibold px-3 py-1 rounded-md text-white"
                style={{ background: "var(--tc-accent)" }}
              >
                Pick Up Shift
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}
