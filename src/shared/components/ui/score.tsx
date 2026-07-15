import type { HTMLAttributes } from "react";
import styles from "./ui.module.css";

type ScoreSize = "small" | "medium" | "large";
export type ScoreProps = HTMLAttributes<HTMLSpanElement> & { value: number; size?: ScoreSize; suffix?: string };
const sizes: Record<ScoreSize, string> = { small: styles.scoreSmall, medium: styles.scoreMedium, large: styles.scoreLarge };

export function Score({ value, size = "medium", suffix = "pts", className = "", ...props }: ScoreProps) {
  return <span className={`${styles.score} ${sizes[size]} ${className}`.trim()} {...props}>{value.toLocaleString("es-CO")} {suffix}</span>;
}
