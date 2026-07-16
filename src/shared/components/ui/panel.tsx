import type { HTMLAttributes } from "react";
import styles from "./ui.module.css";

export type PanelProps = HTMLAttributes<HTMLDivElement> & { raised?: boolean };

export function Panel({ className = "", raised = false, ...props }: PanelProps) {
  return <div className={`${styles.panel} ${raised ? styles.panelRaised : ""} ${className}`.trim()} {...props} />;
}
