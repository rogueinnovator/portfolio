<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Projects from './Projects.svelte';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import Display from './DisplayBoard.svelte';
	let text: string = 'Junior';
	let isVisible: boolean = true;
	let textRef: HTMLElement | null = null;
	let text1: HTMLElement | null = null;
	let text2: HTMLElement | null = null;
	let projects: HTMLElement | null = null;
	let frameworks: HTMLElement | null = null;
	let tools: HTMLElement | null = null;
	const frameWorksIcons = [
		'https://img.icons8.com/?size=100&id=Mm35TzLKahiF&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=Xf1sHBmY73hA&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=FFFFFF',
		'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=111474&format=png&color=FFFFFF',
		'https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=9Gfx4Dfxl0JK&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000'
	];
	const toolsIcons = [
		'https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=17842&format=png&color=000000',
		'https://archive.trufflesuite.com/assets/logo.png',
		'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
		'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png',
		'https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=567890&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=098765&format=png&color=000000',
		'https://img.icons8.com/?size=100&id=234567&format=png&color=000000',
		'./images/gsap.png'
	];
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
			{ y: '80%', opacity: 0 },
			{
				y: '0%',
				opacity: 1,
				duration: 4,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: projects,
					start: 'top top+=400',
					end: '+=600',
					scrub: 1,
					markers: true
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
			I am Muhammad Huzaifa
		</h2>
	</div>
	<hr class="mt-7" />

	<section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
		<div
			class="flex flex-col ml-5 lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10 mt-36"
		>
			<h2
				bind:this={text1}
				class="font-semibold text-3xl md:text-5xl text-violet-400 font-['Raleway'] tracking-wide text-nowrap"
			>
				<span class="inline-flex flex-row justify-center items-center"
					><img
						class="w-14 h-10"
						src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif"
						alt="logo"
					/></span
				> Full stack web Developer
			</h2>

			<h2
				bind:this={text2}
				class="font-semibold text-3xl md:text-5xl text-violet-400 font-['Raleway'] tracking-wide text-nowrap"
			>
				<span class="inline-flex flex-row justify-center items-center"
					><img
						class="w-14 h-10"
						src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif"
						alt="logo"
					/></span
				>
				Blockchain Developer
			</h2>

			<p class="font-semibold sm:text-lg md:text-xl text-center">
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
				<Display icons={frameWorksIcons} title={'FrameWorks'} />
			</div>
			<div class="mt-36" bind:this={tools}>
				<Display icons={toolsIcons} title={'Tools'} />
			</div>
			<div bind:this={projects}>
				<Projects />
			</div>
		</div>
	</div>
</main>
