import type { Handle } from '@sveltejs/kit';
import { adminAuth } from '$lib/config/firebase-admin';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  if (!session) {
    event.locals.user = null;
    return resolve(event);
  }

  try {
    // Verify the session cookie and get the user's ID token
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
    
    // Ensure we have the required fields
    if (!decodedClaims.email) {
      throw new Error('Missing required user fields');
    }

    event.locals.user = {
      ...decodedClaims,
      uid: decodedClaims.uid,
      email: decodedClaims.email
    };
  } catch (e) {
    event.locals.user = null;
  }

  return resolve(event);
}; 