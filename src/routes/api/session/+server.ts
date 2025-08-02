import { json } from '@sveltejs/kit';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '$lib/server/firebaseAdmin';

export async function POST({ request, cookies }) {
	const { idToken } = await request.json();
	const auth = getAuth(adminApp);
	const decodedToken = await auth.verifyIdToken(idToken);
	//this is a svelte server side function that set the cookies
	cookies.set('__session', idToken, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 5 // 5 days
	});
	return json({ status: 'ok', uid: decodedToken.uid });
}
