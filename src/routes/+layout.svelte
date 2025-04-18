<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { scrollStore, authStore, projectsStore } from '$lib/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import type { Project } from '$lib/types';
	import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
	import { auth, db } from '$lib/fireBaseConfig';
	// Reactive declarations
	$: currentPath = $page.url.pathname;

	// State
	let loading = true;
	let isAuthenticated = false;
	let projects: Project[] = [];

	// Non-auth routes
	const nonAuthRoutes = ['/', '/signIn'];

	// Initialize Firebase listeners
	if (db) {
		const colRef = collection(db, 'projects');
		onSnapshot(colRef, (querySnapshot) => {
			try {
				const fbProjects: Project[] = [];
				querySnapshot.forEach((doc) => {
					const projectData = doc.data();
					fbProjects.push({ id: doc.id, ...projectData } as Project);
				});
				projects = fbProjects;
				projectsStore.update((currState) => ({
					...currState,
					data: projects,
					loading: false
				}));
			} catch (error) {
				console.error('FireStore Error', error);
			}
		});
	}

	// Initialize auth listener
	onMount(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
			currentPath = window.location.pathname;
			isAuthenticated = !!user;
			loading = false;
		});

		return unsubscribeAuth;
	});

	// Scroll to top function
	function scrollToTop(): void {
		document.body.scrollIntoView({ behavior: 'smooth' });
	}

	// Update scroll position
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

<div class="relative flex flex-col min-h-screen bg-black text-white">
	{#if loading}
		<Loading />
	{:else}
		<!-- Scroll to top button -->
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

		<!-- Header -->
		{#if !['/signIn', '/admin', '/admin/projects', '/admin/messages'].includes(currentPath)}
			<Header />
		{/if}

		<!-- Main Content -->
		<main class="flex-grow">
			<slot />
		</main>

		<!-- Footer -->
		{#if !['/signIn', '/admin', '/admin/projects', '/admin/messages'].includes(currentPath)}
			<Footer />
		{/if}
	{/if}

	<!-- Particles Background -->
	<div class="fixed inset-0 z-[-1] opacity-70">
		<div id="particles-js" class="absolute inset-0"></div>
	</div>
</div>
