<script>
	import ThreeDBanking from './ThreeDBanking.svelte'

	import Spinner from '$lib/components/Spinner.svelte'
	import Tile from '$lib/globals/Tile.svelte'
	import { currentUserPage } from '$lib/globals'
	import { startPage } from '$lib/dataStores'
	import UserPageMenu from '$lib/globals/UserPageMenu.svelte'
	import EditStartPage from '$lib/globals/EditStartPage.svelte'
	import pen from '$lib/assets/24pixels/pen_24.svg'

	let edit = false

	$currentUserPage = $startPage.name
</script>

<svelte:head>
	<title>AppDemo - {$startPage.name}</title>
</svelte:head>

<!-- <UserPageMenu /> -->

<ThreeDBanking />

{#if edit}
	<EditStartPage bind:edit />
{/if}

<!-- <div on:click={() => (edit = true)} class="imgWrapper small">
	<img src={pen} alt="Redigera" />
</div> -->

<!-- {#each $startPage.tiles as tile}
	<Tile {tile} isUserPage="true" />
{/each} -->
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
