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
        console.log('[Firebase Admin] Loaded service account from file.');
        return parsed;
      }
    } catch (error) {
      console.warn('[Firebase Admin] Could not read service account file.', {
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    console.log('[Firebase Admin] Using service account environment variables.');
    return { projectId, clientEmail, privateKey };
  }

  console.warn('[Firebase Admin] No service account credentials configured.');
  return null;
}

if (!getApps().length) {
  const serviceAccount = loadServiceAccount();
  initializeApp(serviceAccount ? { credential: cert(serviceAccount) } : {});
}

export const auth = getAuth();
