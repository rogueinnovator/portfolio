<script lang="ts">
	import Step from '../../components/Step.svelte';
	import { authStore } from '../../store/store';
	import { get } from 'svelte/store'; // Import the get method to access the store's value initially

	type Steps = {
		name: string;
		icon: string;
		description: string;
		URL: string;
	};

	let steps: Steps[] = [];
	authStore.subscribe((curr) => {
		steps = curr.data as Steps[];
	});
	// $: storeValue = $authStore;
	// console.log();

	// $: {
	// 	if (storeValue && storeValue.data) {
	// 		steps = storeValue.data as Steps[];
	// 		console.log('this is value', storeValue.data);
	// 	}
	// }
</script>

<main>
	<section class="py-20 lg:py-32 flex flex-col gap-24" id="projects">
		<div class="flex flex-col gap-2 text-center">
			<h6 class="text-large sm:text-xl md:text-2xl">A few of my creative endeavors.</h6>
			<h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
				Curious to <span class="poppins text-violet-400">see</span> my work?
			</h3>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 pb-48">
			{#each steps as step}
				<Step {step}></Step>
			{/each}
		</div>
	</section>
</main>
