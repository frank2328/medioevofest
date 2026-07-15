import { get, push, ref, runTransaction } from "firebase/database";
import { realtimeDatabase } from "@/lib/firebase/database";
import type { PointTransaction } from "../data/point-transactions";

const POINT_TRANSACTIONS_PATH = "pointTransactions";
const RANKING_PATH = "rankingEntries";

export type AddPointsInput = {
  userId: string;
  participant?: string;
  guild?: string;
  points: number;
  type: PointTransaction["type"];
  reason: PointTransaction["reason"];
  description: string;
  createdBy?: string;
  uniqueKey?: string;
};

export type AddPointsResult =
  | {
      added: true;
      transaction: PointTransaction;
    }
  | {
      added: false;
      existingTransaction: PointTransaction;
    };

type DatabaseRoot = {
  pointTransactions?: Record<string, PointTransaction>;
  pointTransactionUniqueKeys?: Record<string, string>;
  rankingEntries?: Record<string, Record<string, unknown>>;
  [path: string]: unknown;
};

function validateInput(input: AddPointsInput) {
  if (!input.userId.trim()) {
    throw new Error("El usuario es obligatorio para agregar puntos.");
  }

  if (!Number.isFinite(input.points) || input.points === 0) {
    throw new Error("La transaccion debe sumar o restar una cantidad distinta de cero.");
  }

  if (!input.description.trim()) {
    throw new Error("La descripcion de la transaccion es obligatoria.");
  }
}

function getUniqueIndexKey(userId: string, uniqueKey: string) {
  return encodeURIComponent(`${userId}:${uniqueKey}`).replaceAll(".", "%2E");
}

function isPointTransaction(value: unknown): value is PointTransaction {
  if (!value || typeof value !== "object") {
    return false;
  }

  const transaction = value as Record<string, unknown>;

  return (
    typeof transaction.id === "string" &&
    typeof transaction.userId === "string" &&
    typeof transaction.points === "number" &&
    Number.isFinite(transaction.points) &&
    (transaction.type === "MANUAL" || transaction.type === "AUTOMATIC") &&
    typeof transaction.reason === "string" &&
    typeof transaction.description === "string" &&
    typeof transaction.createdAt === "string"
  );
}

export async function addPoints(input: AddPointsInput): Promise<AddPointsResult> {
  validateInput(input);

  const transactionId = push(ref(realtimeDatabase, POINT_TRANSACTIONS_PATH)).key;
  const newRankingEntryKey = push(ref(realtimeDatabase, RANKING_PATH)).key;

  if (!transactionId || !newRankingEntryKey) {
    throw new Error("No fue posible generar los identificadores de Firebase.");
  }

  const transaction: PointTransaction = {
    id: transactionId,
    userId: input.userId,
    points: input.points,
    type: input.type,
    reason: input.reason,
    description: input.description,
    createdAt: new Date().toISOString(),
    ...(input.createdBy ? { createdBy: input.createdBy } : {}),
    ...(input.uniqueKey ? { uniqueKey: input.uniqueKey } : {}),
  };

  let existingTransaction: PointTransaction | undefined;
  const uniqueIndexKey = input.uniqueKey
    ? getUniqueIndexKey(input.userId, input.uniqueKey)
    : undefined;

  const result = await runTransaction(ref(realtimeDatabase), (currentValue) => {
    const database = (currentValue ?? {}) as DatabaseRoot;
    const pointTransactions = database.pointTransactions ?? {};
    console.log('pointTransactionUniqueKeys', database.pointTransactions);
    

    if (uniqueIndexKey) {
      const existingTransactionId =
        database.pointTransactionUniqueKeys?.[uniqueIndexKey];
      const indexedTransaction = existingTransactionId
        ? pointTransactions[existingTransactionId]
        : undefined;

      existingTransaction = isPointTransaction(indexedTransaction)
        ? indexedTransaction
        : Object.values(pointTransactions).find(
            (storedTransaction) =>
              isPointTransaction(storedTransaction) &&
              storedTransaction.userId === input.userId &&
              storedTransaction.uniqueKey === input.uniqueKey,
          );

      if (existingTransaction) {
        return;
      }
    }

    const rankingEntries = database.rankingEntries ?? {};
    const storedRankingEntry = Object.entries(rankingEntries).find(
      ([, entry]) => entry.userId === input.userId,
    );
    const rankingEntryKey = storedRankingEntry?.[0] ?? newRankingEntryKey;
    const rankingEntry = storedRankingEntry?.[1];

    if (
      !rankingEntry &&
      (!input.participant?.trim() || !input.guild?.trim())
    ) {
      throw new Error(
        `El participante ${input.userId} no existe. Debes indicar participant y guild para registrarlo.`,
      );
    }

    const currentScore = rankingEntry?.score ?? 0;

    if (typeof currentScore !== "number" || !Number.isFinite(currentScore)) {
      throw new Error(`El puntaje actual de ${input.userId} no es valido.`);
    }

    const nextScore = currentScore + input.points;

    if (!Number.isFinite(nextScore)) {
      throw new Error("El puntaje resultante no es valido.");
    }

    return {
      ...database,
      pointTransactions: {
        ...pointTransactions,
        [transactionId]: transaction,
      },
      ...(uniqueIndexKey
        ? {
            pointTransactionUniqueKeys: {
              ...(database.pointTransactionUniqueKeys ?? {}),
              [uniqueIndexKey]: transactionId,
            },
          }
        : {}),
      rankingEntries: {
        ...rankingEntries,
        [rankingEntryKey]: {
          ...rankingEntry,
          userId: input.userId,
          participant: rankingEntry?.participant ?? input.participant?.trim(),
          guild: rankingEntry?.guild ?? input.guild?.trim(),
          score: nextScore,
        },
      },
    };
  });

  if (!result.committed) {
    if (existingTransaction) {
      return {
        added: false,
        existingTransaction,
      };
    }

    throw new Error("Firebase no confirmo la transaccion de puntos.");
  }

  return {
    added: true,
    transaction,
  };
}

export async function getUserTransactionPoints(userId: string) {
  if (!userId.trim()) {
    throw new Error("El usuario es obligatorio para consultar sus puntos.");
  }

  const snapshot = await get(ref(realtimeDatabase, POINT_TRANSACTIONS_PATH));
  const value: unknown = snapshot.val();
  const transactions =
    value && typeof value === "object" ? Object.values(value) : [];

  return transactions
    .filter(
      (transaction): transaction is PointTransaction =>
        isPointTransaction(transaction) && transaction.userId === userId,
    )
    .reduce((total, transaction) => total + transaction.points, 0);
}
