import { writable } from 'svelte/store';
import type { Project } from '$lib/types';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '$lib/fireBaseConfig';

//STORE

//1. THEME STORE
export const theme = writable<'light' | 'dark'>('dark');

//2. PROJECTS STORE
export const projectsStore = writable<{
	data: Project[];
	loading: boolean;
	error?: string | null;
}>({
	data: [],
	loading: true,
	error: null
});

//2. AUTHENTICATION STORE
export const authStore = writable<{
	isAuthenticated: boolean;
	loading: boolean;
	user: any | null;
	data: any[];
}>({
	isAuthenticated: false,
	loading: true,
	user: null,
	data: []  
});

//3. AUTH HANDLER
export const authHandler = {
	signIn: async (email: string, pass: any) => {
		await signInWithEmailAndPassword(auth, email, pass);
	},
	logOut: async () => {
		await signOut(auth);
	}
};

//4. NAVIGATION STORE
export const navigationStore = writable<{
	isOpen: boolean;
	currentPath: string;
}>({
	isOpen: false,
	currentPath: '/'
});

//5. SCROLL POSITION STORE
export const scrollStore = writable<{
	y: number;
	innerHeight: number;
	innerWidth: number;
}>({
	y: 0,
	innerHeight: 0,
	innerWidth: 0
});

export const bannerStore = writable<{ showBanner: boolean }>({ showBanner: true });
