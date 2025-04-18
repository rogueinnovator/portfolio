<script lang="ts">
	import { onMount } from 'svelte';
	import { fadeInUp, staggerElements } from '$lib/animations/gsap';
	import type { SkillIcon } from '$lib/types';
	import { browser } from '$app/environment';

	// Skill categories
	const categories = [
		{
			name: 'Frameworks',
			icons: [
				{
					src: 'https://img.icons8.com/?size=100&id=Mm35TzLKahiF&format=png&color=000000',
					alt: 'Svelte',
					name: 'Svelte'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=FFFFFF',
					alt: 'Electron',
					name: 'Electron'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000',
					alt: 'React',
					name: 'React.js'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000',
					alt: 'Next',
					name: 'Next.js'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=9Gfx4Dfxl0JK&format=png&color=000000',
					alt: 'Node.js',
					name: 'Express'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000',
					alt: 'Node.js',
					name: 'Tailwind Css'
				}
			]
		},
		{
			name: 'Tools & Technologies',
			icons: [
				{
					src: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
					alt: 'Git',
					name: 'Git'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=Wln8Z3PcXanx&format=png&color=000000',
					alt: 'Docker',
					name: 'Docker'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000',
					alt: 'MongoDB',
					name: 'MongoDB'
				},
				{
					src: 'https://avatars.githubusercontent.com/u/22205159?s=280&v=4',
					alt: 'truffle',
					name: 'Truffle'
				},
				{ src: '/images/gsap.png', alt: 'GSAP', name: 'GSAP' },
				{
					src: 'https://img.icons8.com/?size=100&id=17842&format=png&color=000000',
					alt: 'GSAP',
					name: 'Linux'
				}
			]
		},
		{
			name: 'Programming languages',
			icons: [
				{
					src: 'https://img.icons8.com/?size=100&id=at2DODSyQznb&format=png&color=000000',
					alt: 'solidity',
					name: 'Solidity'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=40669&format=png&color=000000',
					alt: 'C++',
					name: 'C++'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000',
					alt: 'Java Script',
					name: 'Java Script'
				},
				{
					src: 'https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000',
					alt: 'Type Script',
					name: 'Type Script'
				}
			]
		}
	];

	// Elements for animation
	let skillsHeading: HTMLElement;
	let skillsSubheading: HTMLElement;
	let categoryElements: HTMLElement[] = [];
	let skillElements: HTMLElement[][] = [[], [], []];

	// Initialize animations
	onMount(() => {
		if (browser) {
			// Animate section heading
			fadeInUp(skillsHeading, 0.2, 1);

			// Animate section subheading
			fadeInUp(skillsSubheading, 0.4, 1);

			// Staggered animation for categories
			staggerElements(categoryElements, 0.2, 0.6);

			// Staggered animation for skills in each category
			categories.forEach((_, index) => {
				if (skillElements[index] && skillElements[index].length > 0) {
					staggerElements(skillElements[index], 0.1, 0.2);
				}
			});
		}
	});
</script>

<section id="skills" class="py-20 md:py-28 bg-black/30">
	<div class="container mx-auto px-4 md:px-6">
		<!-- Section Header -->
		<div class="flex flex-col gap-4 text-center mb-16">
			<h2 bind:this={skillsHeading} class="text-3xl md:text-4xl lg:text-5xl font-bold">
				Technical <span class="text-violet-400">Skills</span>
			</h2>
			<p bind:this={skillsSubheading} class="text-lg text-gray-400 max-w-2xl mx-auto">
				A comprehensive overview of my technical expertise and the tools I use to build modern web
				applications.
			</p>
		</div>

		<!-- Skills Categories -->
		<div class="space-y-16">
			{#each categories as category, categoryIndex}
				<div bind:this={categoryElements[categoryIndex]} class="space-y-6">
					<h3 class="text-2xl font-semibold text-center text-white">
						{category.name}
					</h3>

					<div
						class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
						style="background-image: url('/images/terminal.gif'); background-size: cover; padding: 2rem; border-radius: 1rem;"
					>
						{#each category.icons as icon, iconIndex}
							<div
								bind:this={skillElements[categoryIndex][iconIndex]}
								class="flex flex-col items-center gap-3 p-4 rounded-lg bg-black/60 backdrop-blur-sm border border-violet-900/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10"
							>
								<img src={icon.src} alt={icon.alt} class="w-16 h-16 object-contain" />
								{#if icon.name}
									<span class="text-sm font-medium text-gray-300">{icon.name}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
