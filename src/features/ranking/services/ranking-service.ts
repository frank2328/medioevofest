import { users } from "@/features/users";
import type { RankingEntry } from "../data/ranking-entries";
import { getUserTransactionPoints } from "./points-service";

export function getRankingEntries(limit = 10): RankingEntry[] {
  return users
    .map((user) => ({
      userId: user.id,
      participant: user.name,
      guild: user.category,
      score: user.totalPoints + getUserTransactionPoints(user.id),
    }))
    .sort((firstEntry, secondEntry) => secondEntry.score - firstEntry.score)
    .slice(0, limit)
    .map((entry, index) => ({
      position: index + 1,
      ...entry,
    }));
}
