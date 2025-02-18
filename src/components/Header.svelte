<script lang="ts">
	import { onMount } from 'svelte';
	export let y: number;
	let pathname: string = '';
</script>

<header
	class={'sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border-b border-solid ' +
		(y > 0 ? ' py-4 bg-slate-950 border-violet-950' : ' py-6 bg-transparent border-transparent')}
>
	<h1 class="font-medium inline-flex justify-between items-center gap-2">
		<b class="font-bold poppins">MUHAMMAD</b> <span class="">HUZAIFA</span>
		<img
			class="w-10 h-10 ml-3"
			src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif"
			alt="logo"
		/>
		<img
			class="w-30 h-10 ml-3"
			src="https://d3frb2mbny706b.cloudfront.net/rogueinnovator"
			alt="git"
		/>
	</h1>
	<div class="sm:flex items-center gap-4 hidden">
		<a href="/"> <p>{pathname === '/projects' ? 'Home' : ''}</p> </a>
		<button
			class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
		>
			<h4 class="relative z-9">Get in touch</h4>
		</button>
	</div>
</header>
