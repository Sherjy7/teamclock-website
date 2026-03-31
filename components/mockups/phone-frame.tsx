import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={`rounded-[2rem] overflow-hidden mx-auto ${className ?? ""}`}
      style={{
        background: "var(--tc-surface-solid)",
        border: "6px solid #1e293b",
        boxShadow: "var(--tc-shadow-xl)",
        width: "260px",
      }}
    >
      {/* Notch */}
      <div className="flex justify-center pt-2 pb-1" style={{ background: "var(--tc-bg)" }}>
        <div className="w-20 h-4 rounded-full bg-[#1e293b]" />
      </div>
      {/* Content */}
      <div className="p-4 min-h-[360px]" style={{ background: "var(--tc-bg)" }}>
        {children}
      </div>
    </div>
  );
}
