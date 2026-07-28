import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadServiceAccount() {
  // Try all possible paths where the service account key might live
  const candidatePaths = [
    resolve(process.cwd(), 'firebase-service-account.json'),
    resolve(process.cwd(), '../../firebase-service-account.json'),
    resolve(process.cwd(), '../../packages/server/firebase-service-account.json'),
    resolve(__dirname, '../../../../../firebase-service-account.json'),
  ];

  for (const p of candidatePaths) {
    try {
      if (existsSync(p)) {
        const parsed = JSON.parse(readFileSync(p, 'utf8'));
        console.log('[Firebase Admin] Loaded service account from:', p);
        return parsed;
      }
    } catch (_) {}
  }

  console.warn('[Firebase Admin] No service account file found. Using GOOGLE_APPLICATION_CREDENTIALS or falling back to mock auth.');
  return null;
}

if (!getApps().length) {
  const serviceAccount = loadServiceAccount();
  try {
    initializeApp({
      credential: serviceAccount ? cert(serviceAccount) : undefined,
    });
  } catch (e) {
    // If no credential at all, init with project ID only for emulator mode
    console.warn('[Firebase Admin] initializeApp failed, initializing without credentials for dev.', e);
    try {
      initializeApp({ projectId: 'hershield-4985d' });
    } catch (_) {}
  }
}

export const auth = getAuth();

