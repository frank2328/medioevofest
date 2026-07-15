import styles from "./ui.module.css";

export type SectionHeadingProps = { kicker?: string; title: string; description?: string; className?: string };

export function SectionHeading({ kicker, title, description, className = "" }: SectionHeadingProps) {
  return <header className={`${styles.sectionHeading} ${className}`.trim()}>
    {kicker && <p className={styles.kicker}>{kicker}</p>}
    <h2 className={styles.headingTitle}>{title}</h2>
    {description && <p className={styles.headingDescription}>{description}</p>}
    <div className={styles.divider} aria-hidden="true"><span className={styles.dividerMark} /></div>
  </header>;
}
