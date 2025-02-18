<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Projects from './Projects.svelte';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import FrameWorks from './FrameWorks.svelte';
	let text: string = 'Junior';
	let isVisible: boolean = true;
	let textRef: HTMLElement | null = null;
	let text1: HTMLElement | null = null;
	let text2: HTMLElement | null = null;
	let projects: HTMLElement | null = null;
	let frameworks: HTMLElement | null = null;

	// Register GSAP Plugins
	gsap.registerPlugin(ScrollTrigger);

	// Function to cycle through titles
	const changeText = () => {
		const titles = ['Junior', 'Full Stack', 'Full Stack + Web3'];
		let index = 0;

		const updateText = () => {
			text = titles[index];
			index = (index + 1) % titles.length;
			setTimeout(updateText, 2000);
		};

		updateText();
	};

	onMount(() => {
		// Ensure elements exist before animating
		if (textRef) {
			gsap.fromTo(
				textRef,
				{ y: '-100%', opacity: 0 },
				{
					y: '0%',
					opacity: 1,
					duration: 2.5,
					ease: 'expo.out',
					delay: 0.5
				}
			);
		}

		gsap.fromTo(
			text1,
			{ x: '-150%', opacity: 0 },
			{
				x: '0%',
				opacity: 1,
				duration: 3.5,
				ease: 'power1.out'
			}
		);

		gsap.fromTo(
			text2,
			{ x: '-150%', opacity: 0 },
			{
				x: '0%',
				opacity: 1,
				duration: 3.5,
				ease: 'power1.out'
			}
		);

		gsap.fromTo(
			projects,
			{ y: '100%', opacity: 0 },
			{
				y: '0%',
				opacity: 1,
				duration: 4,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: projects,
					start: 'top 90%',
					end: 'top 60%',
					scrub: true
				}
			}
		);

		gsap.fromTo(
			frameworks,
			{ x: '-100000%', opacity: 0 },
			{
				x: '0%',
				opacity: 1,
				duration: 4.5,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: frameworks,
					start: 'top 80%',
					end: 'top 60%',
					scrub: true
				}
			}
		);

		// Change text animation loop
		setTimeout(changeText, 2500);
		setInterval(() => (isVisible = !isVisible), 1500);
	});
</script>

<main class="flex flex-col flex-1 p-4">
	<div class="w-full h-12 flex justify-center items-center">
		<h2
			bind:this={textRef}
			onmouseenter={() =>
				gsap.to(textRef, { scale: 1.5, textShadow: '0 0 20px rgba(255,255,255,0.6)' })}
			onmouseleave={() => gsap.to(textRef, { scale: 1, textShadow: 'none' })}
			class="text-3xl md:text-4xl lg:text-7xl font-extrabold text-center bg-gradient-to-r from-violet-400 via-indigo-500 to-violet-400 bg-clip-text text-transparent transition-all duration-500 font-['Playfair_Display']"
		>
			I am Muhammad Huzaifa?
		</h2>
	</div>
	<hr class="mt-7" />

	<section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
		<div
			class="flex flex-col ml-5 lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
		>
			<h2
				bind:this={text1}
				class="font-semibold text-3xl md:text-5xl text-violet-400 font-['Raleway'] tracking-wide text-nowrap"
			>
				> Full stack web Developer
			</h2>

			<h2
				bind:this={text2}
				class="font-semibold text-3xl md:text-5xl text-violet-400 font-['Raleway'] tracking-wide text-nowrap"
			>
				> Blockchain Developer
			</h2>

			<p class="font-semibold sm:text-lg md:text-xl">
				Full-Stack Developer with Expertise in Blockchain, IoT, and Scalable Web Solutions
			</p>
		</div>

		<div class="relative lg:grid place-items-center hidden">
			<img
				src={'images/LC.png'}
				alt="huzaifa"
				class="object-cover z-[2] max-h-[70vh]"
				style="opacity: {isVisible ? 1 : 0}; transition: opacity 0.5s ease;"
			/>
		</div>
	</section>
	<div>
		<div>
			<div bind:this={frameworks}>
				<FrameWorks />
			</div>
			<div bind:this={projects}>
				<Projects />
			</div>
		</div>
	</div>
</main>
