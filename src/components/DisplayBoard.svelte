<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	export let title: any;
	export let icons: any;

	let frameworksContainer: HTMLElement | null = null;

	onMount(() => {
		gsap.fromTo(
			frameworksContainer,
			{ x: '-100vw', opacity: 0 },
			{
				x: '0%',
				opacity: 1,
				duration: 3,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: frameworksContainer,
					start: 'top top+=700',
					end: '+=500',
					scrub: 1
				}
			}
		);
	});
	let first;
	let second;
	if (title?.length >= 10) {
		const mid = Math.floor((title || '').length / 2);
		first = (title || '').slice(0, mid);
		second = (title || '').slice(mid);
		console.log(first, second);
	} else {
		first = title;
		second = '';
	}
</script>

<main>
	<div class="flex flex-col justify-between gap-2 items-center mt-10">
		<h2 class="text-4xl md:text-6xl font-semibold mb-6">
			{first}<span class="poppins text-violet-400">{second}</span>
		</h2>
		<div
			bind:this={frameworksContainer}
			class="flex flex-row justify-center gap-2 md:gap-4 items-center w-full py-5"
			style="background-image: url('./images/terminal.gif'); background-size: cover;"
		>
			{#each icons as src}
				<img class="w-10 md:w-36" {src} alt="icons" />
			{/each}
		</div>
	</div>
</main>
