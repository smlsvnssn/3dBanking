<script>
	import Function from '$lib/globals/Function.svelte';
	import { transactions } from '$lib/dataStores';
	import MyMoneys from './utgifter/MyMoneys.svelte';
	import Treeview from './utgifter/treemap/Treeview.svelte'
	import * as ö from 'ouml';
	import { filterTransactionsOnTagsAndCategories } from './helpers';

	export let view = 'not set', // 'tile', 'page', eller 'tilesettings'
		userPage = null,
		isOpenSettingsDialog = false;

	$: filteredTransactions = filterTransactionsOnTagsAndCategories($transactions, userPage);
</script>

<Function {view} {userPage}>
	<!-- tile -->
	<div slot="tile">
		{#if filteredTransactions.length}
			<Treeview transactions={filteredTransactions} {userPage} />
		{/if}
	</div>

	<!-- page -->
	<div slot="page">
		<h5>Dina utgifter</h5>
		{#if filteredTransactions.length}
			<MyMoneys transactions={filteredTransactions} {userPage} />
		{/if}
	</div>

	<!-- tilesettings -->
	<div slot="tilesettings">
		<p>Vy för funktionens inställningar när den visas som Tile. <br />Skall ha en stängknapp.</p>
		<button class="btn" on:click={() => (isOpenSettingsDialog = false)}> Spara </button>
	</div>
</Function>

<style lang="scss">
	h5 {
		margin-bottom: 1rem;
		text-align: center;
	}
	button {
		width: 100%;
	}
</style>
