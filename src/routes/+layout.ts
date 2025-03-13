import { browser } from '$app/environment';
import { db } from '$lib/fireBaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
// Function to track visitor
async function trackVisitor() {
	if (!browser) return;

	try {
		// Get visitor info
		const userAgent = navigator.userAgent;
		const language = navigator.language;
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const referrer = document.referrer;
		const sessionId = generateSessionId();

		// Check if this session already exists
		const visitsRef = collection(db, 'visits');
		const sessionQuery = query(visitsRef, where('sessionId', '==', sessionId));
		const sessionSnapshot = await getDocs(sessionQuery); //here is problem
		// Only add if this is a new session
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

// Generate a session ID
function generateSessionId() {
	// Check if we already have a session ID in localStorage
	const existingSessionId = localStorage.getItem('portfolio_session_id');
	if (existingSessionId) return existingSessionId;

	// Create a new session ID
	const newSessionId =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	localStorage.setItem('portfolio_session_id', newSessionId);
	return newSessionId;
}

// Track visitor when the page loads
if (browser) {
	trackVisitor();
}

export const load = async () => {
	return {};
};
