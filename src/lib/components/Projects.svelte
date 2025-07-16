<script lang="ts">
	import { onMount } from 'svelte';
	import { staggerElements, fadeInUp } from '$lib/animations/gsap';
	import { projectsStore } from '$lib/stores';
	import type { Project } from '$lib/types';
	import { browser } from '$app/environment';
	import ProjectCard from './ProjectCard.svelte';
	import Skeleton from './CardSkeleton.svelte';
	import { db } from '$lib/fireBaseConfig';
	import { collection, onSnapshot } from 'firebase/firestore';

	// DOM REFERENCES
	let projectsSection: HTMLElement;
	let projectsHeading: HTMLElement;
	let projectsSubheading: HTMLElement;
	let projectCards: HTMLElement[] = [];
	let projects: Project[] = [];
	let isLoading = true;
	if (browser && db) {
		const unsubscribe = onSnapshot(collection(db, 'projects'), (querySnapshot) => {
			try {
				const fbProjects = querySnapshot.docs.map(
					(doc) =>
						({
							id: doc.id,
							...doc.data()
						}) as Project
				);

				projects = fbProjects;
				setTimeout(() => {
					isLoading = false;
					projectsStore.set({ data: fbProjects, loading: false, error: null });
				}, 3000);
			} catch (error: any) {
				console.error('FireStore Error', error);
				projectsStore.update((s) => ({ ...s, loading: false, error: error }));
			}
		});
		onMount(() => () => unsubscribe());
	}

	const unsubscribeStore = projectsStore.subscribe((state) => {
		projects = state.data;
		isLoading = state.loading;
	});

	onMount(() => {
		if (!browser) return;

		fadeInUp(projectsHeading, 0.2, 1);
		fadeInUp(projectsSubheading, 0.4, 1);

		if (projectCards.length > 0) {
			staggerElements(projectCards, 0.15, 0.6);
		}

		return () => unsubscribeStore();
	});
</script>

<section id="projects" bind:this={projectsSection} class="py-20 md:py-28">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col gap-4 text-center mb-16">
			<h2 bind:this={projectsHeading} class="text-3xl md:text-4xl lg:text-5xl font-bold">
				Featured <span class="text-violet-400">Projects</span>
			</h2>
			<p bind:this={projectsSubheading} class="text-lg text-gray-400 max-w-2xl mx-auto">
				A collection of my recent work showcasing my skills and expertise in web development,
				blockchain, and more.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#if isLoading}
				<div class="contents">
					{#each Array(3) as _, i}
						<div bind:this={projectCards[i]}>
							<Skeleton />
						</div>
					{/each}
				</div>
			{:else if projects.length > 0}
				{#each projects as project, i}
					<div bind:this={projectCards[i]}>
						<ProjectCard {project} />
					</div>
				{/each}
			{:else}
				<div
					class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 bg-gray-900/30 rounded-xl border border-gray-800"
				>
					<div class="text-6xl mb-4">😢</div>
					<h3 class="text-xl font-semibold text-violet-400 mb-2">No Projects Found</h3>
					<p class="text-gray-400 max-w-md text-center">
						There are currently no projects to display. Please check back later or contact me to
						learn more about my work.
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>
