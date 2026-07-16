import { push, ref, runTransaction } from "firebase/database";
import { realtimeDatabase } from "@/lib/firebase/database";

export type RegisterPlayerInput = {
  name: string;
  playerName: string;
  // age: number;
  email: string;
};

export type RegisteredPlayer = RegisterPlayerInput & {
  id: string;
  role: "USER";
  createdAt: string;
  updatedAt: string;
};

type DatabaseRoot = {
  users?: Record<string, RegisteredPlayer>;
  rankingEntries?: Record<string, Record<string, unknown>>;
  [path: string]: unknown;
};

export async function registerPlayer(input: RegisterPlayerInput) {
  const userId = push(ref(realtimeDatabase, "users")).key;
  const rankingEntryId = push(ref(realtimeDatabase, "rankingEntries")).key;

  if (!userId || !rankingEntryId) {
    throw new Error("No fue posible generar los identificadores de Firebase.");
  }

  const now = new Date().toISOString();
  const player: RegisteredPlayer = {
    id: userId,
    name: input.name.trim(),
    playerName: input.playerName.trim(),
    // age: input.age,
    email: input.email.trim().toLowerCase(),
    role: "USER",
    createdAt: now,
    updatedAt: now,
  };

  const result = await runTransaction(ref(realtimeDatabase), (currentValue) => {
    const database = (currentValue ?? {}) as DatabaseRoot;
    const users = database.users ?? {};
    const normalizedPlayerName = player.playerName.toLocaleLowerCase("es");

    const duplicate = Object.values(users).some(
      (user) =>
        user.email?.toLowerCase() === player.email ||
        user.playerName?.toLocaleLowerCase("es") === normalizedPlayerName,
    );

    if (duplicate) {
      return;
    }

    return {
      ...database,
      users: {
        ...users,
        [userId]: player,
      },
      rankingEntries: {
        ...(database.rankingEntries ?? {}),
        [rankingEntryId]: {
          userId,
          participant: player.playerName,
          guild: "Sin gremio",
          score: 0,
        },
      },
    };
  });

  if (!result.committed) {
    throw new Error("El correo o el nombre de jugador ya están registrados.");
  }

  return player;
}
