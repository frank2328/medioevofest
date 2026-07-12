import type { Metadata } from "next";
import Link from "next/link";
import { RankingTable } from "@/features/ranking";
import styles from "./ranking-page.module.css";

export const metadata: Metadata = {
  title: "Ranking | Medioevofest",
  description: "Consulta la tabla de posiciones de Medioevofest.",
};

export default function RankingPage() {
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

      <RankingTable />
    </main>
  );
}
