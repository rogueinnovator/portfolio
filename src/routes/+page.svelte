<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Muhammad Huzaifa | Full Stack & Blockchain Developer</title>
	<meta
		name="description"
		content="Portfolio of Muhammad Huzaifa, a Full Stack Developer specializing in modern web applications, blockchain technology, and IoT solutions."
	/>
</svelte:head>

<div class="flex flex-col">
	<Header/>
	<Hero />
	<ExperienceSection />
	<Projects />
	<Skills />
	<Contact />
	<Footer/>
</div>
