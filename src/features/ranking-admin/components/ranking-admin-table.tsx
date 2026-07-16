"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAssetPath } from "@/lib/get-asset-path";
import { Button } from "@/shared/components/ui";
import type { RankingAdminEntry } from "../data/ranking-admin-entries";
import { addPoints } from "../services/ranking-admin-points-service";
import { subscribeToRankingAdminEntries } from "../services/ranking-admin-service";
import styles from "./ranking-admin-table.module.css";

const POINTS_PER_CLICK = 10;

const podiumImages: Record<number, { src: string; alt: string }> = {
  1: { src: getAssetPath("/images/first.png"), alt: "Primer lugar" },
  2: { src: getAssetPath("/images/second.png"), alt: "Segundo lugar" },
  3: { src: getAssetPath("/images/third.png"), alt: "Tercer lugar" },
};

type Feedback = {
  type: "success" | "error";
  message: string;
};

export function RankingAdminTable() {
  const [rankingEntries, setRankingEntries] = useState<RankingAdminEntry[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    return subscribeToRankingAdminEntries(
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

  useEffect(() => {
    setTimeout(() => {
      setFeedback(null);
    }, 5000)
  }, [feedback]);

  async function handleAddPoints(entry: RankingAdminEntry, point: number) {
    setPendingUserId(entry.userId);
    setFeedback(null);

    const isReduction = point < 0;
    const pointAmount = Math.abs(point);

    try {
      const result = await addPoints({
        userId: entry.userId,
        participant: entry.participant,
        guild: entry.guild,
        points: point,
        type: "MANUAL",
        reason: "ADMIN_ADJUSTMENT",
        description: `${isReduction ? "Reduccion" : "Asignacion"} manual de ${pointAmount} puntos desde la tabla de ranking a ${entry.participant}`,
        createdBy: "ranking-admin-table",
      });

      setFeedback({
        type: "success",
        message: result.added
          ? `Se ${isReduction ? "redujeron" : "agregaron"} ${pointAmount} puntos a ${entry.participant}.`
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
            }, POINTS_PER_CLICK)}
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
    <section className={`${styles.section} w-full flex flex-col justify-center `} id="ranking-admin">
      <div className={`${styles.header} w-full flex flex-row justify-center items-center`}>
        <h2>Tabla de posiciones</h2>
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
              {/* <th scope="col">Categoria</th> */}
              <th scope="col">Puntos</th>
              <th scope="col">Adicionar Puntos</th>
              <th scope="col">Reducir Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rankingEntries.map((entry) => (
              <tr key={entry.userId}>
                <td>
                  {podiumImages[entry.position] ? (
                    <Image
                      alt={podiumImages[entry.position].alt}
                      className={styles.podiumImage}
                      height={48}
                      src={podiumImages[entry.position].src}
                      width={48}
                    />
                  ) : (
                    <span className={`${styles.position} text-[24px]`}>
                      {entry.position}
                    </span>
                  )}
                </td>
                <td>{entry.participant}</td>
                {/* <td>{entry.guild}</td> */}
                <td className="text-[24px]">{entry.score}</td>
                <td>
                  <Button onClick={() => handleAddPoints(entry, 3)} variant="secondary" size="small">+3</Button>
                  <Button onClick={() => handleAddPoints(entry, 2)} variant="secondary" size="small">+2</Button>
                  <Button onClick={() => handleAddPoints(entry, 1)} variant="secondary" size="small">+1</Button>
                </td>
                <td>
                  <Button onClick={() => handleAddPoints(entry, -3)} variant="danger" size="small">-3</Button>
                  <Button onClick={() => handleAddPoints(entry, -2)} variant="danger" size="small">-2</Button>
                  <Button onClick={() => handleAddPoints(entry, -1)} variant="danger" size="small">-1</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
