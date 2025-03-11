import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

// Initialize Firebase Admin
function createFirebaseAdminApp() {
    if (getApps().length === 0) {
        try {
            // Try to load service account file if it exists
            const serviceAccountPath = path.resolve('./src/lib/config/firebase/serviceAccount.json');
            
            if (fs.existsSync(serviceAccountPath)) {
                // Use service account file
                const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
                return initializeApp({
                    credential: cert(serviceAccount)
                });
            } else {
                // Fallback to basic configuration
                console.warn('Service account file not found. Using basic configuration.');
                return initializeApp({
                    projectId: import.meta.env.VITE_projectId
                });
            }
        } catch (error) {
            console.error("Error initializing Firebase Admin:", error);
            // For development, return a mock app or null
            if (import.meta.env.DEV) {
                console.warn('Running in development mode without Firebase Admin');
                return null;
            }
            throw error; // Re-throw in production
        }
    }
    return getApps()[0];
}

export const app = createFirebaseAdminApp();
export const adminAuth = app ? getAuth(app) : null; 