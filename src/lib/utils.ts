import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { browser } from '$app/environment';
let cvUrl = 'https://raw.githubusercontent.com/rogueinnovator/CV/master/Muhammad_Huzaifa.pdf';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

// Truncate text
export const truncateText = (text: string, maxLength: number = 100): string => {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
};

// Format date
export const formatDate = (date: string | Date): string => {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
	func: T,
	wait: number
): ((...args: Parameters<T>) => void) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

// Generate random ID
export const generateId = (length: number = 8): string => {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
};

// Check if device is mobile
export const isMobile = (): boolean => {
	if (typeof window === 'undefined') return false;
	return window.innerWidth < 768;
};

// Check if device is tablet
export const isTablet = (): boolean => {
	if (typeof window === 'undefined') return false;
	return window.innerWidth >= 768 && window.innerWidth < 1024;
};

// Check if device is desktop
export const isDesktop = (): boolean => {
	if (typeof window === 'undefined') return false;
	return window.innerWidth >= 1024;
};

// Scroll to element
export const scrollToElement = (elementId: string, offset: number = 0): void => {
	const element = document.getElementById(elementId);
	if (!element) return;

	const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
	window.scrollTo({ top: y, behavior: 'smooth' });
};

// Get contrast color (black or white) based on background color
export const getContrastColor = (hexColor: string): string => {
	// Remove # if present
	hexColor = hexColor.replace('#', '');

	// Convert to RGB
	const r = parseInt(hexColor.substr(0, 2), 16);
	const g = parseInt(hexColor.substr(2, 2), 16);
	const b = parseInt(hexColor.substr(4, 2), 16);

	// Calculate luminance
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// Return black for bright colors, white for dark colors
	return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
export function getExperienceDuration(startDate: Date): string {
	const now = new Date();
	let diff = now.getTime() - startDate.getTime();

	let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
	diff -= years * (1000 * 60 * 60 * 24 * 365.25);

	let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
	diff -= months * (1000 * 60 * 60 * 24 * 30.44);

	let days = Math.floor(diff / (1000 * 60 * 60 * 24));
	diff -= days * (1000 * 60 * 60 * 24);

	let hours = Math.floor(diff / (1000 * 60 * 60));
	diff -= hours * (1000 * 60 * 60);

	let minutes = Math.floor(diff / (1000 * 60));
	diff -= minutes * (1000 * 60);

	let seconds = Math.floor(diff / 1000);

	return `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
export function downloadResume(setLoading: (value: boolean) => void) {
	if (cvUrl && browser) {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			window.open(cvUrl, '_blank', 'noopener,noreferrer');
		}, 1500);
	}
}
