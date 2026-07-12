"use client";

import { useEffect, useState } from "react";
import type { RankingEntry } from "../data/ranking-entries";
import { subscribeToRankingEntries } from "../services/ranking-service";
import styles from "./ranking-table.module.css";

export function RankingTable() {
  const [rankingEntries, setRankingEntries] = useState<RankingEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    return subscribeToRankingEntries(
      (entries) => {
        setRankingEntries(entries);
        setHasLoaded(true);
      },
      (error) => {
        console.error("No fue posible cargar el ranking desde Firebase.", error);
        setRankingEntries([]);
        setHasLoaded(true);
      },
    );
  }, []);

  if (!hasLoaded || rankingEntries.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} id="ranking">
      <div className={styles.header}>
        <p>Ranking dinamico</p>
        <h2>Tabla de posiciones</h2>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Puesto</th>
              <th scope="col">Participante</th>
              <th scope="col">Categoria</th>
              <th scope="col">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rankingEntries.map((entry) => (
              <tr key={entry.userId}>
                <td>
                  <span className={styles.position}>{entry.position}</span>
                </td>
                <td>{entry.participant}</td>
                <td>{entry.guild}</td>
                <td className={styles.score}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
