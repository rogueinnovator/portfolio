<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);
	// Sample experience data - you can replace with your own
	const experiences = [
		{
			company: 'OIRRC',
			title: 'Junior web Developer',
			period: 'Jan 2024 - Sep 2024 ',
			description:
				'Developed full-stack applications using Next.js, implementing both front-end and back-end logic Utilized PostgreSQL as the database for efficient data management.Prisma for database modeling and queries.Deployed Docker to containerize and manage the PostgreSQL database.',
			technologies: ['Next.js', 'TypeScript', 'JavaScript', 'Postgres', 'Prisma']
		},
		{
			company: 'Code Crush Technologies pvt ltd',
			title: 'MERN Stack Developer',
			period: 'Dec 2024 - present ',
			description:
				'Developed and maintained full-stack web applications using MongoDB, Express.js,React.js, and Node.js, ensuring seamless integration between front-end and back-end components.Collaborated with design teams to deliver high-quality web applications.',
			technologies: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Express.js']
		}
	];

	onMount(() => {
		// Animate the section title
		gsap.from('.section-title', {
			y: -50,
			opacity: 0,
			duration: 1,
			ease: 'power3.out'
		});

		// Animate the divider line
		gsap.from('.divider', {
			width: 0,
			duration: 1.5,
			delay: 0.3,
			ease: 'power3.inOut'
		});

		// Animate timeline dots
		gsap.from('.timeline-dot', {
			scale: 0,
			duration: 0.5,
			stagger: 0.2,
			delay: 0.5,
			ease: 'back.out(1.7)'
		});

		// Animate experience cards
		const cards = document.querySelectorAll('.experience-card');
		cards.forEach((card, index) => {
			gsap.from(card, {
				scrollTrigger: {
					trigger: card,
					start: 'top bottom-=100',
					toggleActions: 'play none none none'
				},
				x: index % 2 === 0 ? -100 : 100,
				opacity: 0,
				duration: 0.8,
				delay: index * 0.1,
				ease: 'power3.out'
			});
		});

		// Animate technology tags
		gsap.from('.tech-tag', {
			scrollTrigger: {
				trigger: '.experience-section',
				start: 'top center'
			},
			opacity: 0,
			y: 20,
			stagger: 0.05,
			duration: 0.5,
			delay: 1,
			ease: 'power3.out'
		});
	});
</script>

<section class="experience-section py-16 px-4 md:px-8 max-w-5xl mx-auto">
	<div class="mb-12 text-center">
		<h2 class="section-title text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
		<div class="divider w-20 h-1 bg-purple-400 mx-auto"></div>
	</div>

	<div class="relative">
		<!-- Timeline line -->
		<div
			class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"
		></div>

		{#each experiences as experience, index}
			<div class="mb-12 md:mb-0">
				<div class="flex flex-col md:flex-row items-center">
					<!-- Timeline dot -->
					<div
						class="timeline-dot hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-400 border-4 border-white shadow"
					></div>

					<!-- Content container -->
					<div
						class="w-full md:w-1/2 md:{index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 md:ml-auto'}"
					>
						<div
							class="experience-card p-6 bg-violet-900/20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-400 transform hover:-translate-y-1"
						>
							<div class="flex flex-col {index % 2 === 0 ? 'md:items-end' : 'md:items-start'}">
								<span
									class="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-400 rounded-full mb-2"
								>
									{experience.period}
								</span>
								<h3 class="text-xl font-bold text-gray-400">{experience.title}</h3>
								<h4 class="text-lg font-medium text-purple-400 mb-3">{experience.company}</h4>
								<p class="text-gray-50 mb-4">{experience.description}</p>
								<div
									class="flex flex-wrap gap-2 {index % 2 === 0 ? 'justify-end' : 'justify-start'}"
								>
									{#each experience.technologies as tech}
										<span
											class="tech-tag px-3 py-1 text-xs font-medium bg-violet-900/30 text-violet-300 rounded-full"
										>
											{tech}
										</span>
									{/each}
								</div>
							</div>
						</div>
					</div>

					<!-- Spacer for alternating layout -->
					<div class="hidden md:block w-1/2 {index % 2 === 1 ? 'order-first' : ''}"></div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	/* Additional custom styles */
	@media (max-width: 768px) {
		.mb-12:last-child {
			margin-bottom: 0;
		}
	}

	/* Add a subtle pulse animation to timeline dots */
	.timeline-dot {
		animation: pulse 3s infinite;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
		}
	}

	/* Smooth hover transition for cards */
	.experience-card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
</style>
