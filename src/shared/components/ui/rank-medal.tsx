import type { HTMLAttributes } from "react";
import styles from "./ui.module.css";

export type RankMedalProps = HTMLAttributes<HTMLSpanElement> & { position: number };
const podiumStyles: Record<number, string> = { 1: styles.medalGold, 2: styles.medalSilver, 3: styles.medalBronze };

export function RankMedal({ position, className = "", ...props }: RankMedalProps) {
  return <span className={`${styles.medal} ${podiumStyles[position] ?? ""} ${className}`.trim()} aria-label={`Puesto ${position}`} {...props}>{position}</span>;
}
