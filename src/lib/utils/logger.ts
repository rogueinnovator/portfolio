import { dev } from '$app/environment';

export const logger = {
	log: (...args: any[]) => {
		if (dev) console.log(...args);
	},
	error: (...args: any[]) => {
		if (dev) console.error(...args);
	},
	warn: (...args: any[]) => {
		if (dev) console.warn(...args);
	},
	info: (...args: any[]) => {
		if (dev) console.info(...args);
	}
};
