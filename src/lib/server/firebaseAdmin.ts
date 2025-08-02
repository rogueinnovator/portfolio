
//this configuration is used on server side only and can be exposed to the client side 
import admin from 'firebase-admin';
import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { FIREBASE_SERVICE_ACCOUNT } from '$env/static/private';

const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);
let adminApp: App;
if (getApps().length === 0) {
	adminApp = initializeApp({
		credential: cert(serviceAccount)
	});
} else {
	adminApp = getApps()[0];
}
// if (!admin.apps.length) {
// 	admin.initializeApp({
// 		credential: admin.credential.cert(serviceAccount)
// 	});
// }
export { adminApp };
export const auth = admin.auth();
export const db = admin.firestore();
