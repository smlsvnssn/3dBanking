<script>
	import ChosenLabels from './ChosenLabels.svelte';

	import Tile from '$lib/globals/Tile.svelte';
	import EditUserPage from '$lib/globals/EditUserPage.svelte';
	import { page } from '$app/stores';
	import { currentUserPage } from '$lib/globals';
	import { userPages } from '$lib/dataStores';
	import pen from '$lib/assets/24pixels/pen_24.svg';

	let edit = false;

	$: thisPage = $userPages.find((v) => v.id === $page.params.userPage);
	$: if (thisPage?.name) $currentUserPage = thisPage?.name;
</script>

<svelte:head>
	<title>{thisPage?.name}</title>
</svelte:head>

{#if edit}
	<EditUserPage bind:edit page={thisPage} />
{/if}

<div on:click={() => (edit = true)} class="imgWrapper small">
	<img src={pen} alt="Redigera" />
</div>

<ChosenLabels {thisPage} />

{#if thisPage}
	{#each thisPage?.tiles as tile}
		<Tile {tile} isUserPage="true" />
	{/each}
{/if}

<style lang="scss">
	h6 {
		margin: -0.5rem 0 0;
		padding: 0 1rem 1rem;
	}
	.imgWrapper {
		background: hsla(0, 0%, 100%, 1);
		position: absolute;
		right: 1.25rem;
		top: 1.25rem;
		border-radius: 3rem;
		cursor: pointer;
		padding: 0.5rem;

		&.small {
			img {
				width: 1.5rem;
			}
		}
	}
</style>
