import { browser } from '$app/environment';
import { db } from '$lib/fireBaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { debounce } from '$lib/utils';
import { logger } from '$lib/utils/logger';
const debouncedTrackVisitor = debounce(async () => {
	if (!browser || !db) return;

	const trace = createTrace('visitor_tracking');
	trace?.start();

	try {
		// Check if already tracked in this session
		if (sessionStorage.getItem('visitor_tracked')) {
			return;
		}

		const sessionId = generateSessionId();
		const visitsRef = collection(db, 'visits');

		// Only track essential data
		await addDoc(visitsRef, {
			language: navigator.language,
			screenWidth: window.screen.width,
			referrer: document.referrer || 'direct',
			sessionId,
			timestamp: serverTimestamp(),
			path: window.location.pathname,
			userAgent: navigator.userAgent.substring(0, 200) // Limit userAgent length
		});

		// Mark as tracked for this session
		sessionStorage.setItem('visitor_tracked', 'true');
		logger.info('Visitor tracked successfully');
	} catch (error) {
		logger.error('Error tracking visitor:', error);
	} finally {
		trace?.stop();
	}
}, 1000); // Debounce for 1 second

function generateSessionId(): string {
	try {
		const existingSessionId = localStorage.getItem('portfolio_session_id');
		if (existingSessionId) return existingSessionId;

		const newSessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
		localStorage.setItem('portfolio_session_id', newSessionId);
		return newSessionId;
	} catch (error) {
		// Fallback if localStorage is not available
		return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
	}
}

// Track visitor with delay to not block initial page load
if (browser) {
	setTimeout(() => {
		debouncedTrackVisitor();
	}, 2000); // Delay tracking by 2 seconds
}
type Trace = { start: () => void; stop: () => void };

function createTrace(arg0: string): Trace | undefined {
	// Replace this with your actual implementation or a mock for now
	return {
		start: () => {},
		stop: () => {}
	};
}
