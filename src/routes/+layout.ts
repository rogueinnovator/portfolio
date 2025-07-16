import { browser } from '$app/environment';
import { db } from '$lib/fireBaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
async function trackVisitor() {
	if (!browser) return;

	try {
		const userAgent = navigator.userAgent;
		const language = navigator.language;
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const referrer = document.referrer;
		const sessionId = generateSessionId();
		const visitsRef = collection(db, 'visits');
		const sessionQuery = query(visitsRef, where('sessionId', '==', sessionId));
		const sessionSnapshot = await getDocs(sessionQuery);
		if (sessionSnapshot.empty) {
			await addDoc(visitsRef, {
				userAgent,
				language,
				screenWidth,
				screenHeight,
				referrer,
				sessionId,
				timestamp: serverTimestamp(),
				path: window.location.pathname
			});
		}
	} catch (error) {
		console.error('Error tracking visitor:', error);
	}
}

function generateSessionId() {
	const existingSessionId = localStorage.getItem('portfolio_session_id');
	if (existingSessionId) return existingSessionId;
	const newSessionId =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	localStorage.setItem('portfolio_session_id', newSessionId);
	return newSessionId;
}
if (browser) {
	trackVisitor();
}

// export const load = async () => {
// 	return {};
// };
