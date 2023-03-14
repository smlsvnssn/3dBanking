<script>
	import { startPage } from '$lib/dataStores';
	import { goto } from '$app/navigation';

	import ChooseTiles from './ChooseTiles.svelte';
	import SettingsDrawer from '$lib/components/SettingsDrawer.svelte';

	// @ts-ignore
	const editUserPage = (p) => {
		$startPage = p;
		edit = false;
	};

	export let edit = false;
	let page = $startPage;
</script>

<SettingsDrawer bind:isOpen={edit}>
	<h1 class="display-4">Ändra startsidan</h1>

	<div>
		<ChooseTiles
			bind:tiles={page.tiles}
			text={'Du kan lägga till vilka funktioner du vill på startsidan.'}
		/>
	</div>

	<div>
		<h5>Sidans namn:</h5>
		<input type="text" bind:value={page.name} class="form-control" placeholder="Namn" />
	</div>
	<div>
		<h5>Välj bild eller ikon:</h5>
		<p class="payoff">Här ska man kunna välja bild eller ikon</p>
	</div>
	<hr />

	<div class="stickToBottom">
		<button class="btn" on:click={() => editUserPage(page)}> Spara ändringar </button>
	</div>
</SettingsDrawer>

<style lang="scss">
	hr {
		width: 100%;
		border-top: 1px solid var(--smoke);
		margin-bottom: 0rem;
	}

	h5 {
		margin-top: 2rem !important;
	}

	.down {
		transform: translate(0, 1rem);
	}

	.stickToBottom {
		position: sticky;
		z-index: 1;
		bottom: 0;
		transform: translate(-1rem, 5rem);
		width: calc(100% + 2rem);
		padding: 1rem;
		background: var(--white);
		display: grid;
		box-shadow: 0 -2px 2px #ccc6;
	}

	.small {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		color: var(--gray);
	}
	* {
		flex-shrink: 0;
	}
</style>
