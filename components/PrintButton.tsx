"use client";

export default function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="buy buy-line cv-print" onClick={() => window.print()}>
      {children}
    </button>
  );
}
