import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const projectId = process.env.FIREBASE_PROJECT_ID ?? 'hershield-4985d';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const credential = clientEmail && privateKey
  ? cert({ projectId, clientEmail, privateKey })
  : undefined;

if (!getApps().length) {
  initializeApp({
    projectId,
    ...(credential ? { credential } : {}),
  });

  if (!credential) {
    console.warn('[Firebase Admin] Service-account environment variables are not configured; token verification may be unavailable.');
  }
}

export const auth = getAuth();
