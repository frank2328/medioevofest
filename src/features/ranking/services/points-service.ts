import { pointTransactions, type PointTransaction } from "../data/point-transactions";

type AddPointsInput = {
  userId: string;
  points: number;
  type: PointTransaction["type"];
  reason: PointTransaction["reason"];
  description: string;
  createdBy?: string;
  uniqueKey?: string;
};

type AddPointsResult =
  | {
      added: true;
      transaction: PointTransaction;
    }
  | {
      added: false;
      existingTransaction: PointTransaction;
    };

export function addPoints(input: AddPointsInput): AddPointsResult {
  if (input.points === 0) {
    throw new Error("La transaccion debe sumar o restar una cantidad distinta de cero.");
  }

  if (input.uniqueKey) {
    const existingTransaction = pointTransactions.find(
      (transaction) =>
        transaction.userId === input.userId &&
        transaction.uniqueKey === input.uniqueKey,
    );

    if (existingTransaction) {
      return {
        added: false,
        existingTransaction,
      };
    }
  }

  const transaction: PointTransaction = {
    id: `tx-${String(pointTransactions.length + 1).padStart(3, "0")}`,
    userId: input.userId,
    points: input.points,
    type: input.type,
    reason: input.reason,
    description: input.description,
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
    uniqueKey: input.uniqueKey,
  };

  pointTransactions.push(transaction);

  return {
    added: true,
    transaction,
  };
}

export function getUserTransactionPoints(userId: string) {
  return pointTransactions
    .filter((transaction) => transaction.userId === userId)
    .reduce((total, transaction) => total + transaction.points, 0);
}
