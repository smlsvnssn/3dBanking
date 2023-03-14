<script>
	/** @type {import('./$types').PageData} */
	import { page } from '$app/stores';
	import { currentUserPage } from '$lib/globals';
	import { functions, userPages } from '$lib/dataStores';
	import Tile from '$lib/globals/Tile.svelte';
	import * as ö from 'ouml';
	import AddFunctionToUserPage from './AddFunctionToUserPage.svelte';

	$: thisFunction = ö.findDeep($functions, (v) => v.name === $page.params.function, 'functions');
	$: thisUserPage = $userPages.find((v) => v.name === $currentUserPage);
</script>

<h1 class="display-4">{$page.params.function}</h1>
<section class="tile">
	<!-- component is imported and defined in $functions -->

	{#if thisFunction?.component}
		<div>
			<svelte:component this={thisFunction.component} view="page" userPage={thisUserPage} />
		</div>
	{:else}
		<!-- Default fallback, no component defined for this function -->

		<h5>Vy för en funktion</h5>
		<p>
			<!-- Här ska det finnas innehåll som inte styrs av kategorier och taggar. -->
		</p>

		<ul class="templates">
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

<AddFunctionToUserPage {thisFunction} />

<style lang="scss">
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
		.templates {
			display: grid;
			gap: 1rem;
			padding: 0 1rem;
			grid: auto-flow / 1fr 1fr;
			list-style: none;
			li {
				display: grid;
				align-items: center;
				justify-items: center;
				background: var(--cloud);
				min-height: 8rem;
				border-radius: 4px;

				h5 {
					margin: 0;
				}
			}
		}
	}

	h1 {
		margin: 4rem 1rem 1rem;
	}
</style>
