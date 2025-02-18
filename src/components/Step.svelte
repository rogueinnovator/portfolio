<script lang="ts">
	export let step;
</script>

<a
	href={step.URL}
	class="relative p-4 sm:p-6 md:p-8 flex flex-col items-center gap-4 rounded-3xl text-center cursor-pointer group"
>
	<h3
		class="font-semibold text-violet-500 sm:text-2xl md:text-3xl"
		style="height: 3em; display: flex; align-items: center; justify-content: center; overflow: hidden;"
	>
		{step.name}
	</h3>

	<div class="flex justify-center items-center">
		<div class="overflow-hidden h-full w-full">
			<img
				src={step.preview}
				alt={step.name}
				class="w-full h-64 rounded-lg transition-transform duration-300 group-hover:scale-105"
			/>
			<p
				class="relative bottom-24 py-3 pb-10 flex items-center md:text-xl text-white bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl"
			>
				{step.description}
			</p>
		</div>
	</div>

	<div class="flex justify-between gap-4 items-end w-full">
		<div
			class="ml-auto cursor-pointer rounded-full hover:text-slate-950 duration-200 relative after:absolute after:top-0 after:right-full after:bg-white after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] overflow-hidden"
		>
			<p class="z-4 px-2">Go to &rarr;</p>
		</div>
	</div>
</a>
