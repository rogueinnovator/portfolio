import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	server: {
		host: '0.0.0.0', 
		port: 5173
	},

	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
