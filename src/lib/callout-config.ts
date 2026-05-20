export const calloutConfig = {
  note: {
    borderClass: "border-l-[var(--color-accent)]",
    bgClass: "",
    icon: "fa6-solid:circle-info",
  },
  tip: {
    borderClass: "border-l-[var(--color-accent)]",
    bgClass: "",
    icon: "fa6-solid:lightbulb",
  },
  warning: {
    borderClass: "border-l-[var(--color-warning)]",
    bgClass: "bg-[color-mix(in_srgb,var(--color-warning)_8%,transparent)]",
    icon: "fa6-solid:triangle-exclamation",
  },
  danger: {
    borderClass: "border-l-[var(--color-danger)]",
    bgClass: "bg-[color-mix(in_srgb,var(--color-danger)_8%,transparent)]",
    icon: "fa6-solid:circle-exclamation",
  },
} as const;

export type CalloutVariant = keyof typeof calloutConfig;
