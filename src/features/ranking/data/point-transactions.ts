export type PointTransactionType = "MANUAL" | "AUTOMATIC";

export type PointTransactionReason =
  | "ADMIN_ADJUSTMENT"
  | "OPEN_CHAPTER"
  | "COMPLETE_MISSION"
  | "SCAN_QR"
  | "ATTEND_ACTIVITY"
  | "ANSWER_TRIVIA"
  | "WATCH_VIDEO"
  | "DAILY_LOGIN";

export type PointTransaction = {
  id: string;
  userId: string;
  points: number;
  type: PointTransactionType;
  reason: PointTransactionReason;
  description: string;
  createdBy?: string;
  createdAt: string;
  uniqueKey?: string;
};

export const pointTransactions: PointTransaction[] = [
  {
    id: "tx-001",
    userId: "user-banderas-cucuta",
    points: 95,
    type: "AUTOMATIC",
    reason: "SCAN_QR",
    description: "Escaneo de QR en la entrada del festival",
    createdAt: "2026-07-02T15:00:00.000Z",
    uniqueKey: "SCAN_QR:festival-gate",
  },
  {
    id: "tx-002",
    userId: "user-guardia-frontera",
    points: 70,
    type: "MANUAL",
    reason: "ADMIN_ADJUSTMENT",
    description: "Bonificacion por actividad de combate",
    createdBy: "admin@medioevofest.com",
    createdAt: "2026-07-02T16:00:00.000Z",
  },
  {
    id: "tx-003",
    userId: "user-trovadores-valle",
    points: 45,
    type: "AUTOMATIC",
    reason: "WATCH_VIDEO",
    description: "Video del capitulo inicial completado",
    createdAt: "2026-07-02T17:00:00.000Z",
    uniqueKey: "WATCH_VIDEO:capitulo-inicial",
  },
];
