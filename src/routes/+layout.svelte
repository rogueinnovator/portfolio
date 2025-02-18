<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import { collection, onSnapshot } from 'firebase/firestore';
	import { auth, db } from '$lib/fireBaseConfig';
	import { onMount } from 'svelte';
	import { authStore } from '../store/store';
	import Loading from '../components/Loading.svelte';
	type Project = {
		id: string;
		name: string;
		description: string;
	};

	let currentPath: string = '';
	let projects: Project[] = [];
	let isAuthenticated: boolean = false;
	let loading: boolean = true;

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
				authStore.update((currState) => ({
					...currState,
					data: projects,
					loading: false
				}));
			} catch (error) {
				console.error('fireStore Error', error);
			}
		});
	}

	const nonAuthRoutes = ['/', '/signIn'];

	onMount(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
			currentPath = window.location.pathname;
			isAuthenticated = !!user;
			loading = false;
			if (!isAuthenticated && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}
			if (!isAuthenticated && currentPath === '/admin') {
				window.location.href = '/';
				return;
			}
			if (isAuthenticated && currentPath === '/signIn') {
				window.location.href = '/admin';
				return;
			}
		});

		return unsubscribeAuth;
	});

	let y: number;
	let innerHeight: number = 0;
	let innerWidth: number = 0;

	function goTop(): void {
		document.body.scrollIntoView();
	}
</script>

<div class="relative flex flex-col max-w-full mx-auto w-full text-sm sm:text-base min-h-screen overflow-hidden">
	{#if loading}
		<Loading />
	{:else}
		<div
			class={'fixed bottom-0 w-full duration-200 flex p-10 z-[10]' +
				(y > 0 ? 'opacity-full pointer-events-auto' : 'pointer-events-none opacity-0')}
		>
			<button
				on:click={goTop}
				class="ml-auto rounded-full bg-slate-900 text-violet-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer"
			>
				<i class="fa-solid fa-arrow-up grid place-items-center aspect-square p-2">Top</i>
			</button>
		</div>
		{#if currentPath !== '/admin'}
			<Header {y} />
		{/if}
		<slot />
		{#if currentPath !== '/signIn' && currentPath !== '/admin'}
			<Footer />
		{/if}
	{/if}
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
