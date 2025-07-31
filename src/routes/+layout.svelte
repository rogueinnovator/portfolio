<script lang="ts">
	import '../app.css';
	import '../styles/banner.scss';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { scrollStore } from '$lib/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { auth } from '$lib/fireBaseConfig';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
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
		<div class={`splash ${showContent ? 'moveUp' : ''}`}>
			<div class="logoContainer">
				<!-- <div class="logoIcon">
					<img src="/" alt="logo" />
				</div> -->
				<h1 class="logoText"> ITS MUHAMMAD HUZAIFA</h1>
			</div>
		</div>

	<!-- {#if showBanner && $page.url.pathname === '/'}
		<Banner/>
	{/if} -->

	{#if ['/signIn', '/admin', '/admin/projects', '/admin/messages'].includes($page.url.pathname)}
		<Header />
	{/if}

	<main class="flex-grow">
		<slot />
	</main>

	{#if !['/signIn', '/admin', '/admin/projects', '/admin/messages'].includes($page.url.pathname)}
		<Footer />
	{/if}
</div>
