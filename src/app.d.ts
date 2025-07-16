// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				uid: string;
				email: string;
				[key: string]: any;
			} | null;
		}
		
	}
}

export {};
