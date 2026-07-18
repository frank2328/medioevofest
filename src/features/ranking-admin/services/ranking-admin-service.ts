import { onValue, ref, type Unsubscribe } from "firebase/database";
import { realtimeDatabase } from "@/lib/firebase/database";
import type { RankingAdminEntry } from "../data/ranking-admin-entries";

const RANKING_PATH = "rankingEntries";

type RankingAdminRecord = Omit<RankingAdminEntry, "position">;

function isRankingAdminRecord(value: unknown): value is RankingAdminRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.userId === "string" &&
    typeof record.participant === "string" &&
    typeof record.guild === "string" &&
    typeof record.score === "number" &&
    Number.isFinite(record.score)
  );
}

export function subscribeToRankingAdminEntries(
  onEntriesChange: (entries: RankingAdminEntry[]) => void,
  onError?: (error: Error) => void,
  limit = 10,
): Unsubscribe {
  const rankingRef = ref(realtimeDatabase, RANKING_PATH);

  return onValue(
    rankingRef,
    (snapshot) => {
      const value: unknown = snapshot.val();
      const records = value && typeof value === "object" ? Object.values(value) : [];

      const entries = records
        .filter(isRankingAdminRecord)
        .sort((firstEntry, secondEntry) => secondEntry.score - firstEntry.score)
        .map((entry, index) => ({
          ...entry,
          position: index + 1,
        }));

      onEntriesChange(entries);
    },
    (error) => onError?.(error),
  );
}
