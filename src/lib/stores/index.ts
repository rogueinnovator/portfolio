import { writable } from 'svelte/store';
import type { Project } from '$lib/types';
import {  signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '$lib/fireBaseConfig';
// Theme store
export const theme = writable<'light' | 'dark'>('dark');

// Projects store
export const projectsStore = writable<{
  data: Project[];
  loading: boolean;
  error: string | null;
}>({
  data: [],
  loading: true,
  error: null
});

// Authentication store
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

// Auth handler for authentication operations
export const authHandler = {
  signIn: async (email: string, pass: any) => {
    await signInWithEmailAndPassword(auth, email, pass);
  },
  logOut: async () => {
    await signOut(auth);
  }
};

// Navigation store
export const navigationStore = writable<{
  isOpen: boolean;
  currentPath: string;
}>({
  isOpen: false,
  currentPath: '/'
});

// Scroll position store
export const scrollStore = writable<{
  y: number;
  innerHeight: number;
  innerWidth: number;
}>({
  y: 0,
  innerHeight: 0,
  innerWidth: 0
}); 