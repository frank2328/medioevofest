"use client";

import { useEffect, useState } from "react";
import type { RankingEntry } from "../data/ranking-entries";
import { addPoints } from "../services/points-service";
import { subscribeToRankingEntries } from "../services/ranking-service";
import styles from "./ranking-table.module.css";

const POINTS_PER_CLICK = 10;

type Feedback = {
  type: "success" | "error";
  message: string;
};

export function RankingTable() {
  const [rankingEntries, setRankingEntries] = useState<RankingEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    return subscribeToRankingEntries(
      (entries) => {
        setRankingEntries(entries);
        setHasLoaded(true);
      },
      (error) => {
        console.error(
          "No fue posible cargar el ranking desde Firebase.",
          error,
        );
        setRankingEntries([]);
        setHasLoaded(true);
      },
    );
  }, []);

  async function handleAddPoints(entry: RankingEntry) {
    setPendingUserId(entry.userId);
    setFeedback(null);

    try {
      const result = await addPoints({
        userId: entry.userId,
        participant: entry.participant,
        guild: entry.guild,
        points: POINTS_PER_CLICK,
        type: "MANUAL",
        reason: "ADMIN_ADJUSTMENT",
        description: `Asignacion manual desde la tabla de ranking a ${entry.participant}`,
        createdBy: "ranking-table",
      });

      setFeedback({
        type: "success",
        message: result.added
          ? `Se agregaron ${POINTS_PER_CLICK} puntos a ${entry.participant}.`
          : `La asignacion para ${entry.participant} ya estaba registrada.`,
      });
    } catch (error) {
      console.error("No fue posible registrar los puntos en Firebase.", error);
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No fue posible registrar los puntos en Firebase.",
      });
    } finally {
      setPendingUserId(null);
    }
  }

  if (!hasLoaded || rankingEntries.length === 0) {
    return (
      <div className="flex flex-row w-full justify-center items-center h-10">
        <div>
          <h1>No hay datos disponibles.</h1>
          <button
            className={styles.addPointsButton}
            disabled={pendingUserId !== null}
            onClick={() => handleAddPoints({
              position: 4,
              userId: "4",
              participant: "Participante 4",
              guild: "Gremio 4",
              score: 100
            })}
            type="button"
          >
            {pendingUserId === '4'
              ? "Registrando..."
              : `Agregar ${POINTS_PER_CLICK}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section} id="ranking">
      <div className={styles.header}>
        <p>Ranking dinamico</p>
        <h2>Tabla de posiciones</h2>
      </div>

      <div className="flex flex-row w-full justify-center items-center h-50">
        <div>
          <h1>No hay datos disponibles.</h1>
          <button
            className={styles.addPointsButton}
            disabled={pendingUserId !== null}
            onClick={() => handleAddPoints({
              position: 4,
              userId: "4",
              participant: "Participante 4",
              guild: "Gremio 4",
              score: 100
            })}
            type="button"
          >
            {pendingUserId === '4'
              ? "Registrando..."
              : `Agregar Participante`}
          </button>
        </div>
      </div>

      {feedback && (
        <p
          className={
            feedback.type === "success" ? styles.success : styles.error
          }
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Puesto</th>
              <th scope="col">Participante</th>
              <th scope="col">Categoria</th>
              <th scope="col">Puntos</th>
              <th scope="col">Accion</th>
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
                <td>
                  <button
                    className={styles.addPointsButton}
                    disabled={pendingUserId !== null}
                    onClick={() => handleAddPoints(entry)}
                    type="button"
                  >
                    {pendingUserId === entry.userId
                      ? "Registrando..."
                      : `Agregar ${POINTS_PER_CLICK}`}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
