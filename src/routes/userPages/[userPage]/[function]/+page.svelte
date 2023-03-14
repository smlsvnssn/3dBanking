<script>
	import { page } from '$app/stores';
	import { functions, userPages } from '$lib/dataStores';
	import { currentUserPage } from '$lib/globals';
	import ChosenLabels from '../ChosenLabels.svelte';
	import * as ö from 'ouml';
	import EditUserPage from '$lib/globals/EditUserPage.svelte';
	import Tile from '$lib/globals/Tile.svelte';
	import pen from '$lib/assets/24pixels/pen_24.svg';

	let edit = false;

	$: thisFunction = ö.findDeep($functions, (v) => v.name === $page.params.function, 'functions');
	$: thisUserPage = $userPages.find((v) => v.name === $currentUserPage);
</script>

<svelte:head>
	<title>{thisUserPage?.name} - {thisFunction.name}</title>
</svelte:head>

{#if edit}
	<EditUserPage bind:edit page={thisUserPage} />
{/if}

<div on:click={() => (edit = true)} class="imgWrapper small">
	<img src={pen} alt="Redigera" />
</div>

<ChosenLabels thisPage={thisUserPage} />

<section class="tile">
	<h5>{$page.params.function}</h5>
	<!-- component is imported and defined in $functions -->

	{#if thisFunction?.component}
		<div>
			<svelte:component this={thisFunction.component} view="page" userPage={thisUserPage} />
		</div>
	{:else}
		<!-- Default fallback, no component defined for this function -->

		<!-- <p>
			Här ska det finnas innehåll som styrs av vilka kategorier och taggar som finns på den
			egenskapade sida du kommer ifrån.
		</p> -->
		<ul class="templates">
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
			<li />
		</ul>
	{/if}
</section>

{#each thisFunction?.functions as tile}
	<Tile tile={tile.name} />
{/each}

<style lang="scss">
	.templates {
		display: grid;
		gap: 1rem;
		padding: 0;
		grid: auto-flow / 1fr 1fr;
		list-style: none;
		li {
			display: grid;
			align-items: center;
			justify-items: center;
			background: var(--cloud);
			min-height: 8rem;
			border-radius: 4px;
		}
	}
	.imgWrapper {
		background: hsla(0, 0%, 100%, 0.6);
		position: absolute;
		right: 1rem;
		top: 1rem;
		border-radius: 3rem;
		cursor: pointer;
		padding: 0.5rem;
	}
	.tile {
		background: var(--white);
		border-bottom: 2px solid var(--smoke);
		margin-bottom: 1rem;
		& > * {
			padding: 1rem;
		}
		h5 {
			//text-align: center;
			border-bottom: 1px solid var(--smoke);
		}
	}
</style>
