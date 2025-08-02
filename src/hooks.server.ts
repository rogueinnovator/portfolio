import { adminApp } from '$lib/server/firebaseAdmin';
import type { Handle } from '@sveltejs/kit'; //handle us a middleware style function in svelteKit
import { getAuth } from 'firebase-admin/auth';
//it inspect and modify the request
export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('__session');
	const auth = getAuth(adminApp);
	console.log('here above session', session);

	if (session) {
		try {
			const decodedToken = await auth.verifyIdToken(session, true);
			console.log(decodedToken);

			event.locals.user = {
				uid: decodedToken.uid,
				email: decodedToken.email ?? '',
				role: decodedToken.role ?? 'user'
			};
		} catch (error) {
			console.error('Invalid session cookies ', error);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}
	return resolve(event);
};
