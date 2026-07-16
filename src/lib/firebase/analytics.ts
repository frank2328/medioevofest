import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseApp } from "./client";

export async function initializeFirebaseAnalytics() {
  if (!(await isSupported())) {
    return null;
  }

  return getAnalytics(firebaseApp);
}
