import type { HTMLAttributes } from "react";
import styles from "./ui.module.css";

type BadgeTone = "neutral" | "gold" | "crimson" | "moss";
export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone };
const tones: Record<BadgeTone, string> = { neutral: "", gold: styles.badgeGold, crimson: styles.badgeCrimson, moss: styles.badgeMoss };

export function Badge({ className = "", tone = "neutral", ...props }: BadgeProps) {
  return <span className={`${styles.badge} ${tones[tone]} ${className}`.trim()} {...props} />;
}
