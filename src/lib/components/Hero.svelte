<script lang="ts">
	import { onMount } from 'svelte';
	import { fadeInUp, fadeInLeft, fadeInRight, textReveal } from '$lib/animations/gsap';
	import { browser } from '$app/environment';
	import { getDownloadURL, getStorage, ref } from 'firebase/storage';

	// Developer titles
	const titles = ['Full Stack Developer', 'Blockchain Developer', 'Web3 Enthusiast'];
	let currentTitleIndex = 0;
	let currentTitle = titles[0];
	let titleElement: HTMLElement;
	let nameElement: HTMLElement;
	let descriptionElement: HTMLElement;
	let ctaElement: HTMLElement;
	let imageElement: HTMLElement;
	let isVisible = true;
	// Function to cycle through titles
	const cycleTitles = () => {
		setInterval(() => {
			currentTitleIndex = (currentTitleIndex + 1) % titles.length;
			currentTitle = titles[currentTitleIndex];
		}, 3000);
	};
	let cvUrl = '';
	async function getCvUrl() {
		try {
			const storage = getStorage();
			const cvRef = ref(storage, 'gs://portfolio-65bfd.appspot.com/cv.pdf');
			cvUrl = await getDownloadURL(cvRef);
		} catch (error) {}
	}
	// Initialize animations
	onMount(() => {
		getCvUrl();
		if (browser) {
			// Animate name
			fadeInUp(nameElement, 0.3, 1.5);

			// Animate title
			fadeInLeft(titleElement, 0.8, 1.5);

			// Animate description
			fadeInUp(descriptionElement, 1.2, 1.5);

			// Animate CTA
			fadeInUp(ctaElement, 1.5, 1.5);

			// Animate image
			fadeInRight(imageElement, 0.8, 1.5);

			// Start title cycling
			cycleTitles();

			// Toggle image visibility
			setInterval(() => {
				isVisible = !isVisible;
			}, 3000);
		}
	});
</script>

<section class="relative min-h-[90vh] flex items-center py-16 md:py-24 overflow-hidden">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Left Column: Text Content -->
			<div class="flex flex-col gap-6 md:gap-8">
				<!-- Name -->
				<h1
					bind:this={nameElement}
					class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
				>
					<span
						class="bg-gradient-to-r from-violet-400 via-indigo-500 to-violet-400 bg-clip-text text-transparent"
					>
						Muhammad Huzaifa
					</span>
				</h1>

				<!-- Title -->
				<h2
					bind:this={titleElement}
					class="flex items-center text-2xl md:text-3xl lg:text-4xl font-semibold text-violet-400"
				>
					<img
						class="w-10 h-10 mr-3"
						src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif"
						alt="Developer icon"
					/>
					<span class="transition-all duration-500">{currentTitle}</span>
				</h2>

				<!-- Description -->
				<p bind:this={descriptionElement} class="text-lg md:text-xl text-gray-300 max-w-xl">
					Specialized in building modern web applications with expertise in Blockchain, IoT, and
					creating scalable solutions that deliver exceptional user experiences.
				</p>

				<!-- CTA Buttons -->
				<div bind:this={ctaElement} class="flex flex-wrap gap-4 mt-4">
					<a
						href="/#projects"
						class="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-violet-500/20 flex items-center gap-2"
					>
						View Projects
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
							<path d="M5 12h14"></path>
							<path d="m12 5 7 7-7 7"></path>
						</svg>
					</a>
					<a
						href={cvUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-violet-500 font-medium transition-all duration-300"
					>
						Download Resume
					</a>
				</div>

				<!-- Tech Stack Pills -->
				<div class="flex flex-wrap gap-2 mt-4">
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">React</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">Next</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">Svelte</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>TypeScript</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>JavaScript</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Tailwind CSS</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Express</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>MongoDB</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Electron</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Firebase</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Blockchain</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Solidity</span
					>
				</div>
			</div>

			<!-- Right Column: Image -->
			<div bind:this={imageElement} class="relative flex justify-center lg:justify-end">
				<div class="relative w-full max-w-md">
					<!-- Profile Image -->
					<img
						src="/images/LC.png"
						alt="Muhammad Huzaifa"
						class="w-full h-auto object-cover z-10 relative transition-opacity duration-1000"
						style="opacity: {isVisible ? 1 : 0};"
					/>

					<!-- Decorative Elements -->
					<div
						class="absolute -top-6 -right-6 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl"
					></div>
					<div
						class="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"
					></div>

					<!-- Code Snippet Decoration -->
					<div
						class="absolute -bottom-8 -left-8 w-32 h-32 bg-black/80 border border-violet-500/30 rounded-lg flex items-center justify-center p-4 shadow-lg backdrop-blur-sm"
					>
						<code class="text-xs text-violet-400">
							&lt;code&gt;<br />
							&nbsp;&nbsp;passion<br />
							&lt;/code&gt;
						</code>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Background Elements -->
	<div class="absolute top-1/4 left-10 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl"></div>
	<div class="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
</section>
