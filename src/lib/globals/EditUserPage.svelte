<script>
	import { userPages } from '$lib/dataStores';
	import { goto } from '$app/navigation';
	import ChooseCategories from './ChooseCategories.svelte';
	import ChooseTags from './ChooseTags.svelte';
	import ChooseTiles from './ChooseTiles.svelte';
	import SettingsDrawer from '$lib/components/SettingsDrawer.svelte';
	import UserPageChoices from '$lib/components/UserPageChoices.svelte';

	// @ts-ignore
	const editUserPage = (p) => {
			$userPages[$userPages.findIndex((v) => v.id === p.id)] = p;
			edit = false;
		},
		deleteUserPage = (p) => {
			$userPages = $userPages.filter((v) => v.id !== p.id);
			edit = false;
			goto(`/`);
		};

	export let page = {};
	export let edit = false;
</script>

<SettingsDrawer bind:isOpen={edit}>
	<h1 class="display-4">Ändra sidan</h1>

	<div><ChooseCategories bind:categories={page.categories} /></div>
	<div><ChooseTags bind:tags={page.tags} /></div>
	<div><ChooseTiles bind:tiles={page.tiles} /></div>

	<div>
		<h5>Sidans namn:</h5>
		<input type="text" bind:value={page.name} class="form-control" placeholder="Namn" />
	</div>
	<div>
		<h5>Välj bild eller ikon:</h5>
		<p class="payoff">Här ska man kunna välja bild eller ikon</p>
	</div>
	<hr />

	<UserPageChoices {page} />

	<button class="btn btn-secondary down" on:click={() => deleteUserPage(page)}>
		Radera sidan
	</button>

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
