<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import defaultLogo from '../../../static/favicon.png';

	interface Experience {
		company: string;
		title: string;
		description: string;
		technologies: string[];
		logo?: string;
		url?: string;
		cardStyle?: string;
	}

	const experiences: Experience[] = [
		{
			company: 'OIRRC',
			title: 'Junior Web Developer',
			description:
				'Developed full-stack applications using Next.js, implementing both front-end and back-end logic. Utilized PostgreSQL as the database for efficient data management. Prisma for database modeling and queries. Deployed Docker to containerize and manage the PostgreSQL database.',
			technologies: ['Next.js', 'TypeScript', 'JavaScript', 'Postgres', 'Prisma'],
			logo: 'https://oirrc.org/wp-content/uploads/2023/01/OIRRC-logo-with-white-text.png',
			url: 'https://oirrc.org/',
			cardStyle: 'bg-gradient-to-br from-gray-900/30 to-blue-900/30'
		},
		{
			company: 'Code Crush Technologies Pvt Ltd',
			title: 'MERN Stack Developer',
			description:
				'Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js, ensuring seamless integration between front-end and back-end components. Collaborated with design teams to deliver high-quality web applications.',
			technologies: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Express.js', 'shadCn'],
			logo: 'https://codecrushtech.com/Images/Icons/navbarLogo.svg', // Replace with actual path
			url: 'https://codecrush.com',
			cardStyle: 'bg-gradient-to-br from-indigo-900/30 to-violet-900/30'
		},
		{
			company: 'Red Star Technologies',
			title: 'MERN Stack Developer',
			description:
				'Worked with Next.js Lambda functions, PostgreSQL (RDS), EC2, and integrated AI solutions. Utilized AWS services such as Lightsail, RDS, and others for scalable deployments and infrastructure management.',
			technologies: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Express.js', 'shadCn'],
			logo: 'https://redstartechs.com/storage/images/WYG0WBkKi5i92e6prfxIUc3RwgFUnjI7rRxE1opR.svg',
			url: 'https://redstartechs.com/',
			cardStyle: 'bg-gradient-to-br from-rose-900/30 to-purple-900/30'
		}
	];

	onMount(() => {
		gsap.from('.section-title', {
			y: -50,
			opacity: 0,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from('.divider', {
			width: 0,
			duration: 1.5,
			delay: 0.3,
			ease: 'power3.inOut'
		});

		gsap.from('.timeline-dot', {
			scale: 0,
			duration: 0.5,
			stagger: 0.2,
			delay: 0.5,
			ease: 'back.out(1.7)'
		});

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
		<div
			class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"
		></div>

		{#each experiences as experience, index}
			<div class="mb-12 md:mb-0">
				<div class="flex flex-col md:flex-row items-center">
					<div
						class="timeline-dot hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-400 border-4 border-white shadow"
					></div>

					<div
						class="w-full md:w-1/2 md:{index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 md:ml-auto'}"
					>
						<div
							class="experience-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-400 transform hover:-translate-y-1 {experience.cardStyle}"
						>
							<div class="flex flex-col {index % 2 === 0 ? 'md:items-end' : 'md:items-start'}">
								<div
									class="flex items-center mb-3 {index % 2 === 0 ? 'self-end' : 'self-start'} gap-3"
								>
									<img
										src={experience.logo || defaultLogo}
										alt={`${experience.company} logo`}
										class="w-16 h-16 object-fill rounded-full p-1"
										on:error={(e) => {
											if (e.target) (e.target as HTMLImageElement).src = defaultLogo;
										}}
									/>
									<a
										href={experience.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors"
									>
										{experience.company}
									</a>
								</div>

								<h3 class="text-xl font-bold text-gray-400 mb-2">{experience.title}</h3>
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

					<div class="hidden md:block w-1/2 {index % 2 === 1 ? 'order-first' : ''}"></div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	@media (max-width: 768px) {
		.mb-12:last-child {
			margin-bottom: 0;
		}
	}

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

	.experience-card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
</style>
