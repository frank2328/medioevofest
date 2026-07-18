import styles from "./home-page.module.css";

export function HomePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.message}>
        {"Pr\u00f3ximamente m\u00e1s informaci\u00f3n"}
      </h1>
    </main>
  );
}
