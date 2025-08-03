import admin from 'firebase-admin';
import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { FIREBASE_SERVICE_ACCOUNT_BASE64 } from '$env/static/private';

const decoded = Buffer.from(FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(decoded);

let adminApp: App;
if (getApps().length === 0) {
	adminApp = initializeApp({
		credential: cert(serviceAccount)
	});
} else {
	adminApp = getApps()[0];
}

export { adminApp };
export const auth = admin.auth();
export const db = admin.firestore();
