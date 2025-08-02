<script lang="ts">
	import '../app.css';
	import '../styles/banner.scss';
	import { browser } from '$app/environment';
	import { scrollStore } from '$lib/stores';
	import { auth } from '$lib/fireBaseConfig';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import Banner from '$lib/components/Banner.svelte';
	let isAuthenticated = false;
	let showContent = false;
	onMount(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
			isAuthenticated = !!user;
		});
		const timer = setTimeout(() => {
			showContent = true;
		}, 2000);

		return () => {
			unsubscribeAuth;
			clearTimeout(timer);
		};
	});

	function scrollToTop(): void {
		document.body.scrollIntoView({ behavior: 'smooth' });
	}

	function handleScroll() {
		if (browser) {
			scrollStore.update((state) => ({
				...state,
				y: window.scrollY,
				innerHeight: window.innerHeight,
				innerWidth: window.innerWidth
			}));
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />
<div class="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
	{#if $scrollStore.y > 300}
		<button
			on:click={scrollToTop}
			class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:bg-violet-700 transition-all duration-300"
			aria-label="Scroll to top"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="m18 15-6-6-6 6" />
			</svg>
		</button>
	{/if}
	<!-- banner -->
	<Banner {showContent} />
	<main class="flex-grow">
		<slot />
	</main>
</div>
