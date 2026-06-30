import { rankingEntries } from "../data/ranking-entries";
import styles from "./ranking-table.module.css";

export function RankingTable() {
  return (
    <section className={styles.section} id="ranking">
      <div className={styles.header}>
        <p>Ranking inicial</p>
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
              <tr key={entry.position}>
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
