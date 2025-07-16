<script lang="ts">
	import { onMount } from 'svelte';
	import { hoverAnimation } from '$lib/animations/gsap';
	import type { SocialLink } from '$lib/types';
	import { browser } from '$app/environment';

	const socialLinks: SocialLink[] = [
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/muhammad-huzaifa-ali-49aa94259/',
			icon: 'fa-brands fa-linkedin-in',
			imgSrc:
				'https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif'
		},
		{
			name: 'GitHub',
			href: 'https://github.com/rogueinnovator',
			icon: 'fa-brands fa-github'
		},
		{
			name: 'Threads',
			href: 'https://www.threads.net/@rogue_innovator?hl=en',
			icon: 'fa-brands fa-threads',
			imgSrc:
				'https://user-images.githubusercontent.com/74038190/235294015-47144047-25ab-417c-af1b-6746820a20ff.gif'
		},
		{
			name: 'Email',
			href: 'mailto:contact@example.com',
			icon: 'fa-regular fa-envelope'
		}
	];

	const currentYear = new Date().getFullYear();

	onMount(() => {
		if (browser) {
			const socialIcons = document.querySelectorAll('.social-icon');
			socialIcons.forEach((icon) => {
				hoverAnimation(icon as HTMLElement, 1.2);
			});
		}
	});
</script>

<footer id="contact" class="bg-gradient-to-b from-black to-slate-900 border-t border-violet-900/30">
	<div class="container mx-auto px-4 py-12 md:py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
			<div class="space-y-6">
				<h3 class="text-2xl font-bold text-white">Get in Touch</h3>
				<p class="text-gray-400 max-w-md">
					I'm currently available for freelance work and full-time positions. If you have a project
					that needs coding or looking for a developer to join your team, feel free to reach out.
				</p>
				<div class="space-y-3">
					<a
						href="mailto:thee@gmail.com"
						class="flex items-center gap-2 text-gray-300 hover:text-violet-400 transition-colors duration-300"
					>
						<i class="fa-regular fa-envelope"></i>
						<span>theehuzaifa@gmail.com</span>
					</a>
					<p class="flex items-center gap-2 text-gray-300">
						<i class="fa-solid fa-location-dot"></i>
						<span>Remote, Worldwide</span>
					</p>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8">
				<div class="space-y-6">
					<h3 class="text-xl font-bold text-white">Navigation</h3>
					<ul class="space-y-3">
						<li>
							<a href="/" class="text-gray-400 hover:text-violet-400 transition-colors duration-300"
								>Home</a
							>
						</li>
						<li>
							<a
								href="/#projects"
								class="text-gray-400 hover:text-violet-400 transition-colors duration-300"
								>Projects</a
							>
						</li>
						<li>
							<a
								href="/#skills"
								class="text-gray-400 hover:text-violet-400 transition-colors duration-300">Skills</a
							>
						</li>
						<li>
							<a
								href="/#contact"
								class="text-gray-400 hover:text-violet-400 transition-colors duration-300"
								>Contact</a
							>
						</li>
					</ul>
				</div>
				<div class="space-y-6">
					<h3 class="text-xl font-bold text-white">Services</h3>
					<ul class="space-y-3">
						<li class="text-gray-400">Web Development</li>
						<li class="text-gray-400">Blockchain Development</li>
						<li class="text-gray-400">Full Stack Solutions</li>
						<li class="text-gray-400">IoT Integration</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="border-t border-gray-800 my-8"></div>

		<div class="flex flex-col md:flex-row justify-between items-center gap-6">
			<p class="text-gray-500 text-sm">
				© {currentYear} Muhammad Huzaifa. All rights reserved.
			</p>

			<div class="flex items-center gap-4">
				{#each socialLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-violet-600 hover:text-white transition-all duration-300"
						aria-label={link.name}
					>
						{#if link.imgSrc}
							<img
								src={link.imgSrc}
								alt={link.name}
								class="w-full h-full rounded-full object-cover"
							/>
						{:else}
							<i class={link.icon}></i>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
