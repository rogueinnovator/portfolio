<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollStore } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { hoverAnimation } from '$lib/animations/gsap';
	import { browser } from '$app/environment';
	import { auth } from '$lib/fireBaseConfig';
	import { goto } from '$app/navigation';
	import { downloadResume } from '$lib/downloadResume';
	//LINKS
	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/#projects' },
		{ name: 'Skills', href: '/#skills' },
		{ name: 'Contact', href: '/#contact' }
	];
	//VARIABLES
	let mobileMenuOpen = false;
	let isAuthenticated = false;
	let isLoadingResume = false;

	onMount(() => {
		if (browser) {
			const buttons = document.querySelectorAll('.nav-button');
			buttons.forEach((button) => {
				hoverAnimation(button as HTMLElement, 1.05);
			});

			const unsubscribe = auth.onAuthStateChanged((user) => {
				isAuthenticated = !!user;
			});

			return unsubscribe;
		}
	});

	$: scrolled = $scrollStore.y > 20;
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
	}

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			mobileMenuOpen = false;
			document.body.style.overflow = '';
		}
	}
</script>

<header
	class="fixed top-0 w-full z-50 transition-all duration-300 {scrolled
		? 'py-3 bg-black/90 backdrop-blur-md shadow-lg'
		: 'py-5 bg-transparent'}"
>
	<!-- DESKTOP VIEW  -->
	<div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
		<a
			href="/"
			class="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tight group transition-all duration-300"
		>
			<span class="text-white">MUHAMMAD</span>
			<span class="text-violet-400 group-hover:text-white transition-colors duration-300"
				>HUZAIFA</span
			>
		</a>

		<nav class="hidden md:flex items-center gap-6">
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-button relative text-sm font-medium transition-colors duration-300 hover:text-violet-400"
					on:click|preventDefault={() => {
						if (link.href.includes('#')) {
							scrollToSection(link.href.split('#')[1]);
						} else {
							goto(link.href);
						}
					}}
				>
					{link.name}
				</a>
			{/each}
		</nav>

		<div class="hidden md:flex items-center gap-3">
			<a
				href={isAuthenticated ? '/admin' : '/signIn'}
				class="nav-button inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm transition-all duration-300"
				title={isAuthenticated ? 'Admin Dashboard' : 'Sign In'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
				<span class="sr-only">{isAuthenticated ? 'Admin Dashboard' : 'Sign In'}</span>
			</a>

			<button
				on:click={downloadResume}
				class="nav-button inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={isLoadingResume}
			>
				{#if isLoadingResume}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="animate-spin"
					>
						<path d="M21 12a9 9 0 1 1-6.219-8.56" />
					</svg>
					<span>Loading...</span>
				{:else}
					<span>Resume</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="7 10 12 15 17 10"></polyline>
						<line x1="12" y1="15" x2="12" y2="3"></line>
					</svg>
				{/if}
			</button>
		</div>

		<button
			class="md:hidden flex items-center justify-center p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors"
			aria-label="Toggle menu"
			on:click={toggleMobileMenu}
		>
			{#if mobileMenuOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-6 h-6 transition-transform duration-300"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-6 h-6 transition-transform duration-300"
				>
					<line x1="4" y1="12" x2="20" y2="12"></line>
					<line x1="4" y1="6" x2="20" y2="6"></line>
					<line x1="4" y1="18" x2="20" y2="18"></line>
				</svg>
			{/if}
		</button>
	</div>
	<!-- MOBILE VIEW  -->
	{#if mobileMenuOpen}
		<div
			class="md:hidden fixed inset-0 top-16 z-[60] bg-black/95 backdrop-blur-lg overflow-hidden right-2"
			transition:slide={{ duration: 400, easing: (t) => t * t, axis: 'y' }}
		>
			<div class="container mx-auto px-4 py-6 flex flex-col items-center gap-6">
				<nav class="w-full flex flex-col items-center gap-4">
					{#each navLinks as link}
						<a
							href={link.href}
							class="w-full text-center py-3 px-4 text-lg font-medium transition-colors duration-300 hover:text-violet-400 text-white/80 rounded-lg"
							on:click|preventDefault={() => {
								if (link.href.includes('#')) {
									scrollToSection(link.href.split('#')[1]);
								} else {
									goto(link.href);
								}
							}}
						>
							{link.name}
						</a>
					{/each}
				</nav>

				<div class="w-full max-w-xs flex flex-col gap-4 mt-4">
					<a
						href={isAuthenticated ? '/admin' : '/signIn'}
						class="w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2"
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
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
						<span>{isAuthenticated ? 'Dashboard' : 'Sign In'}</span>
					</a>

					<button
						on:click={downloadResume}
						class="w-full py-3 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isLoadingResume}
					>
						{#if isLoadingResume}
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
								class="animate-spin"
							>
								<path d="M21 12a9 9 0 1 1-6.219-8.56" />
							</svg>
							<span>Loading Resume...</span>
						{:else}
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
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="7 10 12 15 17 10"></polyline>
								<line x1="12" y1="15" x2="12" y2="3"></line>
							</svg>
							<span>Download Resume</span>
						{/if}
					</button>
				</div>
			</div>
		</div>
	{/if}
</header>
