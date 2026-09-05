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

// These are the fields Firebase Authentication needs. Storage and Cloud
// Messaging are intentionally not prerequisites for signing a user in.
const requiredAuthConfigKeys = ["apiKey", "authDomain", "projectId", "appId"] as const;
const isFirebaseConfigured = requiredAuthConfigKeys.every((key) => Boolean(firebaseConfig[key]));

export const firebaseConfigError = isFirebaseConfigured
  ? null
  : "Firebase is not configured. Set all NEXT_PUBLIC_FIREBASE_* environment variables.";
export { isFirebaseConfigured };

if (typeof window !== "undefined") {
  console.info("[Firebase Auth] Client configuration", {
    environment: process.env.NODE_ENV,
    hostname: window.location.hostname,
    fieldsPresent: Object.fromEntries(
      Object.keys(firebaseConfig).map((key) => [key, Boolean(firebaseConfig[key as keyof typeof firebaseConfig])]),
    ),
  });
}

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
