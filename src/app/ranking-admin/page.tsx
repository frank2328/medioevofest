import type { Metadata } from "next";
import Link from "next/link";
import { RankingAdminTable } from "@/features/ranking-admin";
import styles from "./ranking-admin-page.module.css";

export const metadata: Metadata = {
  title: "Administrar ranking | Medioevofest",
  description: "Administra la tabla de posiciones de Medioevofest.",
};

export default function RankingAdminPage() {
  return (
    <main className={styles.page}>
      <header className={styles.navigation}>
        <Link className={styles.brand} href="/">
          Medioevofest
        </Link>
        <Link className={styles.backLink} href="/">
          Volver al inicio
        </Link>
      </header>

      <RankingAdminTable />
    </main>
  );
}
