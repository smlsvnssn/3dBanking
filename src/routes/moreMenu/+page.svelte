<script>
	import MenuItem from './MenuItem.svelte';
	import { page } from '$app/stores';
	import { functions } from '$lib/dataStores';

	let expanded = '';

	const clearLocal = () => {
		localStorage.clear();
		location.reload();
	};

	$: thisPage = $functions.find((v) => v.name === $page.params.function);
</script>

<svelte:head>
	<title>{$page.params.function}</title>
</svelte:head>
<ul class="small">
	<li><h6>Logga ut</h6></li>
	<li><h6>Inställningar</h6></li>
	<li><h6>Meddelanden</h6></li>
	<li><h6>Notiser</h6></li>
	<li></li>
</ul>

{#each $functions as f0}
<MenuItem functionPage={f0} bind:expanded>
	{#each f0.functions as f1}
	<MenuItem functionPage={f1} level="1">
		{#each f1.functions as f2}
		<MenuItem functionPage={f2} level="2" />
		{/each}
	</MenuItem>
	{/each}
</MenuItem>
{/each}

<h6>DEBUG: <a href="#" on:click|preventDefault={clearLocal}>Rensa lokal data</a></h6>

<style lang="scss">
	ul {
		margin: 0 1rem 1rem;
		list-style: none;
		display: flex;
		padding: 0;
		margin-top: 3rem;
		gap: 1rem;
	}
</style>
