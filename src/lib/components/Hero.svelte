<script lang="ts">
	import { onMount } from 'svelte';
	import { fadeInUp, fadeInLeft, fadeInRight, textReveal } from '$lib/animations/gsap';
	import { browser } from '$app/environment';
	import { downloadResume, getExperienceDuration } from '$lib/utils';
	import gsap from 'gsap';
	// tiles
	const titles = ['MERN Stack', 'Next js ', 'Web3 Enthusiast', 'Node.js', 'Ethereum'];
	let currentTitleIndex = 0;
	let currentTitle = titles[0];
	let titleElement: HTMLElement;
	let nameElement: HTMLElement;
	let descriptionElement: HTMLElement;
	let ctaElement: HTMLElement;
	let imageElement: HTMLElement;
	let isVisible = true;
	let isLoadingResume = false;
	const experienceStartDate = new Date('2024-01-01T00:00:00Z');
	let experience = '';
	let experienceElement: HTMLElement;

	function updateExperience() {
		experience = getExperienceDuration(experienceStartDate);
	}
	const cycleTitles = () => {
		setInterval(() => {
			currentTitleIndex = (currentTitleIndex + 1) % titles.length;
			currentTitle = titles[currentTitleIndex];
		}, 3000);
	};

	function handleDownloadClick() {
		downloadResume((val: boolean) => (isLoadingResume = val));
	}

	onMount(() => {
		if (browser) {
			// Animations
			fadeInUp(nameElement, 0.3, 1.5);
			fadeInLeft(titleElement, 0.8, 1.5);
			fadeInUp(descriptionElement, 1.2, 1.5);
			fadeInUp(ctaElement, 1.5, 1.5);
			fadeInRight(imageElement, 0.8, 1.5);
			cycleTitles();

			setInterval(() => {
				isVisible = !isVisible;
			}, 2000);
			updateExperience();
			setInterval(() => {
				updateExperience();
				// Optional: subtle pulse animation
				gsap.fromTo(
					experienceElement,
					{ scale: 1 },
					{ scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 }
				);
			}, 1000);
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
					I am a skilled Web Developer and Blockchain Developer with <span
						bind:this={experienceElement}
						class="inline-block font-mono text-violet-300 bg-violet-900/30 px-3 py-1 rounded-md shadow-md animate-pulse duration-1000"
					>
						{experience}
					</span>
					<br /> of experience. I specialize in building high-quality and user-friendly web applications.
					I work with technologies like React.js, Next.js, Node.js, Truffle, Solidity and Ethereum. I
					am proficient in front-end and back-end development, especially with the MERN stack and Next
					js.I have a proven work record in multiple companies and with clients.
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
					<button
						on:click={handleDownloadClick}
						class="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-violet-500 font-medium transition-all duration-300"
					>
						{#if isLoadingResume}
							<span class="inline-flex justify-center items-center gap-3">
								Loading...
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
							</span>
						{:else}
							<span class="inline-flex justify-center items-center gap-2"
								>Download Resume <svg
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
								</svg></span
							>
						{/if}
					</button>
				</div>

				<div class="flex flex-wrap gap-2 mt-4">
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">React</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">Next</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">Svelte</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Firebase</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Restful APIs
					</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>MERN Stack
					</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Next js</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Databases</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Express</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>AWS Services
					</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Electron</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>VPS Deployments
					</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Blockchain</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Solidity</span
					>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm">AWS</span>
					<span class="px-3 py-1 rounded-full bg-violet-900/30 text-violet-300 text-sm"
						>Lightsail</span
					>
				</div>
			</div>

			<div bind:this={imageElement} class="relative flex justify-center lg:justify-end">
				<div class="relative w-full max-w-md">
					<img
						src="/images/LC.png"
						alt="Muhammad Huzaifa"
						class="w-full h-auto object-cover z-10 relative transition-opacity duration-1000"
						style="opacity: {isVisible ? 1 : 0};"
					/>

					<div
						class="absolute -top-6 -right-6 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl"
					></div>
					<div
						class="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"
					></div>

					<div
						class="absolute -bottom-8 -left-8 w-32 h-32 bg-black/80 border border-violet-500/30 rounded-lg flex flex-col shadow-lg backdrop-blur-sm"
					>
						<div class="flex items-center gap-1 px-2 py-2 bg-black/60 rounded-t-lg border-b border-violet-500/10">
							<span class="w-2 h-2 rounded-full bg-red-500"></span>
							<span class="w-2 h-2 rounded-full bg-yellow-400"></span>
							<span class="w-2 h-2 rounded-full bg-green-500"></span>
						</div>
						<div class="flex-1 flex items-center justify-center p-4">
							<code class="text-xs text-violet-400">
								&lt;innovation&gt;<br />
								&nbsp;&nbsp;skills<br />
								&lt;/innovation&gt;
							</code>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="absolute top-1/4 left-10 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl"></div>
	<div class="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
</section>
