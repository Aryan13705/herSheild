import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, initializeAuth, browserSessionPersistence, browserPopupRedirectResolver } from "firebase/auth";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"] as const;
const isFirebaseConfigured = requiredConfigKeys.every((key) => Boolean(firebaseConfig[key]));
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const firebaseConfigError = isFirebaseConfigured
  ? null
  : "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables or enable NEXT_PUBLIC_DEMO_MODE=true for an explicit demo flow.";
export { isFirebaseConfigured, isDemoMode };

// Initialize Firebase
const app = isFirebaseConfigured && getApps().length > 0
  ? getApp()
  : isFirebaseConfigured
    ? initializeApp(firebaseConfig as Record<string, string>)
    : null;

let auth: Auth | null = null;
if (app && typeof window !== "undefined") {
  // In development/client, initialize auth without IndexedDB to prevent "Database is closing/hidden"
  try {
    auth = initializeAuth(app, {
      persistence: browserSessionPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    // If already initialized (e.g., during fast refresh), get the existing auth instance
    auth = getAuth(app);
  }
} else if (app) {
  // Server-side
  auth = getAuth(app);
}

const googleProvider = app ? (() => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return provider;
})() : null;

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
