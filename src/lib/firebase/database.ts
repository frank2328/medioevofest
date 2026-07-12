import { getDatabase } from "firebase/database";
import { firebaseApp } from "./client";

const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

if (!databaseURL) {
  throw new Error(
    "Falta NEXT_PUBLIC_FIREBASE_DATABASE_URL en el archivo .env.local.",
  );
}

export const realtimeDatabase = getDatabase(firebaseApp, databaseURL);
