import { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
}

export function BrowserFrame({ children, className }: BrowserFrameProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className ?? ""}`}
      style={{
        background: "var(--tc-surface-solid)",
        border: "1px solid var(--tc-glass-border)",
        boxShadow: "var(--tc-shadow-xl)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--tc-border)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div
          className="flex-1 mx-8 h-5 rounded-md"
          style={{ background: "var(--tc-bg)" }}
        />
      </div>

      {/* Content area */}
      <div className="p-4" style={{ background: "var(--tc-bg)" }}>
        {children}
      </div>
    </div>
  );
}
