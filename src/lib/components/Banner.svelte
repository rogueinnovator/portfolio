<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { page } from '$app/stores';

	let heroText: HTMLElement;
	let heroContainer: HTMLElement;
	let glitchOverlay: HTMLElement;
	let showBanner = $page.url.pathname === '/';

	onMount(() => {
		if (!showBanner) return;

		// Set initial state - text is invisible and positioned below
		gsap.set(heroText, {
			opacity: 0,
			y: 80,
			scale: 0.7,
			rotationX: 15
		});

		const tl = gsap.timeline();
		tl.to(heroText, {
			opacity: 1,
			y: 0,
			scale: 1,
			rotationX: 0,
			duration: 1.5,
			ease: 'power4.out'
		})
			.to(
				heroText,
				{
					x: 2,
					duration: 0.1,
					yoyo: true,
					repeat: 3,
					ease: 'power2.inOut'
				},
				'-=0.5'
			)
			// Hold for 3 seconds
			.to(heroText, {
				duration: 3
			})
			.to(heroText, {
				opacity: 0,
				y: -150,
				scale: 0.8,
				rotationX: -20,
				duration: 1.2,
				ease: 'power4.in',
				onComplete: () => {
					showBanner = false;
				}
			});

		const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
		glitchTl
			.to(glitchOverlay, {
				opacity: 0.1,
				duration: 0.1
			})
			.to(glitchOverlay, {
				opacity: 0,
				duration: 0.1
			});

		gsap.to(heroContainer, {
			boxShadow: 'inset 0 0 100px rgba(139, 92, 246, 0.1)',
			duration: 2,
			yoyo: true,
			repeat: -1,
			ease: 'power2.inOut'
		});
	});
</script>

{#if showBanner}
	<div
		bind:this={heroContainer}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none"
	>
		<div class="absolute inset-0">
			<div class="absolute inset-0 opacity-5 bg-noise"></div>

			<!-- Gradient overlay matching app theme -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950/30"
			></div>

			<!-- Glow effects matching violet color scheme -->
			<div
				class="absolute top-1/3 left-1/5 w-96 h-96 bg-violet-900/20 rounded-full mix-blend-multiply filter blur-3xl"
			></div>
			<div
				class="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gray-800/30 rounded-full mix-blend-multiply filter blur-3xl"
			></div>
		</div>

		<!-- Glitch overlay effect -->
		<div
			bind:this={glitchOverlay}
			class="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-violet-500/10 opacity-0 mix-blend-overlay"
		></div>

		<!-- Scanlines effect -->
		<div class="absolute inset-0 opacity-5">
			<div
				class="h-full w-full bg-gradient-to-b from-transparent via-violet-500/10 to-transparent bg-repeat-y animate-scan"
			></div>
		</div>

		<!-- Main hero content -->
		<div class="relative z-10 text-center px-4">
			<h1
				bind:this={heroText}
				class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter transform-gpu"
				style="text-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);"
			>
				<span
					class="bg-gradient-to-r from-gray-100 via-violet-200 to-gray-300 bg-clip-text text-transparent font-extrabold"
				>
					Hi, I am
				</span>
				<br />
				<span
					class="bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600 bg-clip-text text-transparent font-black tracking-wider relative"
				>
					Huzaifa
					<!-- Subtle glow effect behind name -->
					<span
						class="absolute inset-0 bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600 bg-clip-text text-transparent blur-sm opacity-50 -z-10"
					>
						`Huzaifa
					</span>
				</span>
			</h1>

			<!-- Accent line with glow -->
			<div
				class="mt-8 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent shadow-lg shadow-violet-500/50"
			></div>

			<!-- Additional decorative elements -->
			<div class="absolute -top-4 -right-4 w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
			<div
				class="absolute -bottom-4 -left-4 w-1 h-1 bg-violet-400 rounded-full animate-pulse delay-500"
			></div>
		</div>

		<!-- Corner brackets -->
		<div class="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-violet-500/50"></div>
		<div class="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-violet-500/50"></div>
		<div class="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-violet-500/50"></div>
		<div class="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-violet-500/50"></div>

		<!-- Floating particles -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			{#each Array(15) as _, i}
				<div
					class="absolute bg-violet-500/20 animate-drift"
					style="
          left: {Math.random() * 100}%; 
          top: {Math.random() * 100}%; 
          width: {1 + Math.random() * 3}px;
          height: {1 + Math.random() * 3}px;
          animation-delay: {Math.random() * 5}s;
          animation-duration: {8 + Math.random() * 4}s;
        "
				></div>
			{/each}
		</div>
	</div>
{/if}

<style>
	@keyframes scan {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(100vh);
		}
	}

	@keyframes drift {
		0%,
		100% {
			transform: translateY(0px) translateX(0px) rotate(0deg);
			opacity: 0.2;
		}
		50% {
			transform: translateY(-30px) translateX(10px) rotate(180deg);
			opacity: 0.6;
		}
	}

	.animate-scan {
		animation: scan 3s linear infinite;
	}

	.animate-drift {
		animation: drift linear infinite;
	}

	.bg-noise {
		background-image: radial-gradient(
			circle at 1px 1px,
			rgba(255, 255, 255, 0.15) 1px,
			transparent 0
		);
		background-size: 20px 20px;
	}
</style>
