import type { HTMLAttributes } from "react";
import styles from "./ui.module.css";

type NoticeTone = "info" | "success" | "error";
export type NoticeProps = HTMLAttributes<HTMLParagraphElement> & { tone?: NoticeTone };
const tones: Record<NoticeTone, string> = { info: styles.noticeInfo, success: styles.noticeSuccess, error: styles.noticeError };

export function Notice({ className = "", tone = "info", role, ...props }: NoticeProps) {
  return <p className={`${styles.notice} ${tones[tone]} ${className}`.trim()} role={role ?? (tone === "error" ? "alert" : "status")} {...props} />;
}
