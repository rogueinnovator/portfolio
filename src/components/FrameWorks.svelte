<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let FrameWork: any;

	const frameworks = [
		'./images/gsap.png',
		'https://img.icons8.com/?size=100&id=Mm35TzLKahiF&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=Xf1sHBmY73hA&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=FFFFFF',
		'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=111474&format=png&color=FFFFFF',
		'https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=9Gfx4Dfxl0JK&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000'
	];

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
					start: 'top top+=600',
					end: '+=500',
					scrub: 1,
				}
			}
		);
	
	});
</script>

<main>
	<div class="flex flex-col justify-between gap-2 items-center mt-10">
		<h2 class="text-4xl md:text-6xl font-semibold mb-6">
			Frame<span class="poppins text-violet-400">Works</span>
		</h2>
		<div
			bind:this={frameworksContainer}
			class="flex flex-row justify-center gap-2 md:gap-4 items-center w-full py-5"
			style="background-image: url('./images/terminal.gif'); background-size: cover;"
		>
			{#each frameworks as src}
				<img class="w-10 md:w-36" {src} alt="Framework" />
			{/each}
		</div>
	</div>
</main>

<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let FrameWork: any;

	const frameworks = [
		'./images/gsap.png',
		'https://img.icons8.com/?size=100&id=Mm35TzLKahiF&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=Xf1sHBmY73hA&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=FFFFFF',
		'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=111474&format=png&color=FFFFFF',
		'https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=9Gfx4Dfxl0JK&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000'
	];

	let frameworksContainer: HTMLElement | null = null;

	onMount(() => {
		if (frameworksContainer) {
			gsap.to(frameworksContainer, {
				x: '-100%', // Moves left
				ease: 'linear',
				duration: 10, // Adjust speed
				repeat: -1, // Infinite loop
				modifiers: {
					x: gsap.utils.wrap(['0%', '-100%']) // Ensures smooth looping
				}
			});
		}
	});
</script>

<main>
	<div class="flex flex-col justify-between gap-2 items-center mt-10">
		<h2 class="text-4xl md:text-6xl font-semibold mb-6">
			Frame<span class="poppins text-violet-400">Works</span>
		</h2>
		<div class="overflow-hidden w-full">
			<div
				bind:this={frameworksContainer}
				class="flex flex-row gap-4 md:gap-8 items-center w-max py-5"
				style="background-image: url('./images/terminal.gif'); background-size: cover;"
			>
				{#each frameworks as src}
					<img class="w-10 md:w-36" {src} alt="Framework" />
				{/each}
				{#each frameworks as src}
					<img class="w-10 md:w-36" {src} alt="Framework" />
				{/each}
			</div>
		</div>
	</div>
</main> -->
