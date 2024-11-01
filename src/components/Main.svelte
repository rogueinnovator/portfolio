<script lang="ts">
	let text: string = '';
	let isVisible: boolean = true;
	function changeText() {
		setTimeout(() => {
			text = 'Junior';
			setTimeout(() => {
				text = 'Full stack';
				setTimeout(() => {
					text = 'Full stack + Web3';
				}, 2000);
			}, 2000);
		}, 2000);
	}
	setInterval(() => {
		changeText();
	}, 20000);
	changeText();
	setInterval(() => {
		isVisible = !isVisible;
	}, 1000);
</script>

<main class="flex flex-col flex-1 p-4">
	<section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
		<div
			class="flex flex-col ml-5 lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
		>
			<h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
				I'm <span class="poppins text-violet-400">MUHAMMAD </span> HUZAIFA
				<br />{text}
				<span class="poppins text-violet-400">...Developer</span>
			</h2>
			<p class="font-semibold sm:text-lg md:text-xl">
				Full-Stack Developer with Expertise in Blockchain, IoT, and Scalable Web Solutions
			</p>
			<a
				href="/projects"
				class="blueShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950"
			>
				<div
					class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-45 group-hover:translate-x-full z-0 duration-200"
				></div>
				<h4 class="relative z-9">Projects &rarr;</h4>
			</a>
		</div>
		<div class="relative grid place-items-center">
			<img
				src={'images/LC.png'}
				alt="huzaifa"
				class="object-cover z-[2] max-h-[70vh]"
				style="opacity: {isVisible ? 1 : 0}; transition: opacity 0.5s ease;"
			/>
		</div>
	</section>
</main>
