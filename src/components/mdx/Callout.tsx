import type { ReactNode } from "react";

type CalloutVariant = "note" | "tip" | "warning" | "caution";

const styles: Record<CalloutVariant, { bg: string; label: string; labelBg: string }> = {
  note: { bg: "bg-tertiary-fixed", label: "NOTE", labelBg: "bg-tertiary" },
  tip: { bg: "bg-primary-container", label: "TIP", labelBg: "bg-primary" },
  warning: { bg: "bg-caution", label: "WARNING", labelBg: "bg-ink" },
  caution: { bg: "bg-secondary-fixed", label: "CAUTION", labelBg: "bg-secondary" },
};

export function Callout({
  variant = "note",
  children,
}: {
  variant?: CalloutVariant;
  children: ReactNode;
}) {
  const s = styles[variant];
  return (
    <div className={`${s.bg} border-[3px] border-ink shadow-brutal my-gap-sm p-gap-md`}>
      <span
        className={`${s.labelBg} text-canvas font-mono text-label-mono px-2 py-0.5 border-2 border-ink inline-block mb-3`}
      >
        {s.label}
      </span>
      <div className="font-sans text-body-md text-ink leading-relaxed">{children}</div>
    </div>
  );
}
