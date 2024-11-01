import { writable } from 'svelte/store';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '$lib/fireBaseConfig';
type AuthStore = {
	user: null;
	loading: boolean;
	data: object;
	pathname: any;
};
export const authStore = writable<AuthStore>({
	user: null,
	loading: true,
	data: {},
	pathname: ''
});
export const authHandler = {
	// this is an object which have key value pairs
	signUp: async (email: string, pass: any) => {
		await createUserWithEmailAndPassword(auth, email, pass);
	},
	signIn: async (email: string, pass: any) => {
		await signInWithEmailAndPassword(auth, email, pass);
	},
	logOut: async () => {
		await signOut(auth);
	}
};
