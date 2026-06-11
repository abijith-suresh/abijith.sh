export const calloutConfig = {
  note: {
    borderClass: "border-l-[var(--color-border)]",
    bgClass: "",
    icon: "fa6-solid:circle-info",
  },
  tip: {
    borderClass: "border-l-[var(--color-border)]",
    bgClass: "",
    icon: "fa6-solid:lightbulb",
  },
  warning: {
    borderClass: "border-l-[var(--color-border)]",
    bgClass: "bg-[var(--color-surface)]",
    icon: "fa6-solid:triangle-exclamation",
  },
  danger: {
    borderClass: "border-l-[var(--color-border)]",
    bgClass: "bg-[var(--color-surface)]",
    icon: "fa6-solid:circle-exclamation",
  },
} as const;

export type CalloutVariant = keyof typeof calloutConfig;
