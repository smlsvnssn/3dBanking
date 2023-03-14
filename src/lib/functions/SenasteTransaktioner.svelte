<script>
	import Function from '$lib/globals/Function.svelte';
	import { transactions } from '$lib/dataStores';
	import Transaction from '$lib/globals/Transaction.svelte';
	import { filterTransactionsOnTagsAndCategories } from './helpers';
	import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';
	import * as ö from 'ouml';
	import { map } from 'd3';

	export let view = 'not set', // 'tile', 'page', eller 'tilesettings'
		userPage = null,
		isOpenSettingsDialog = false;

	const maxTransactions = 30;

	const totalAmount = tweened(0, {
		duration: 500,
		easing: expoOut,
	});

	$: filteredTransactions = filterTransactionsOnTagsAndCategories($transactions, userPage).slice(
		0,
		maxTransactions
	);
	$: $totalAmount = ö.sum(filteredTransactions.map((v) => v.amount));
</script>

<Function {view} {userPage}>
	<!-- tile -->
	<div slot="tile" class="transactions">
		<div class="shadow" />
		<div class="list">
			{#if filteredTransactions.length}
				{#each filteredTransactions.slice(0, 3) as transaction, index}
					<Transaction {transaction} {index} transactionList={filteredTransactions} />
				{/each}
			{:else}
				<p>
					Du verkar inte ha några transaktioner här.
					<a href=""> Tagga några transaktioner med "{userPage.tags.join('')}" </a>
					eller <a href="#">Ändra inställningar för sidan</a>
				</p>
			{/if}
		</div>
	</div>

	<!-- page -->
	<span slot="page">
		{#if filteredTransactions.length}
			<h1>{ö.prettyNumber($totalAmount, 0)} kr</h1>
			<p class="payoff">Senaste månaden</p>
			<div class="longList">
				{#each filteredTransactions as transaction, index}
					<Transaction {transaction} {index} transactionList={filteredTransactions} />
				{/each}
			</div>
		{:else}
			Du verkar inte ha några transaktioner här.
			<a href="">Tagga några transaktioner med "{userPage.tags.join('')}"</a>
			eller <a href="#">Ändra inställningar för sidan</a>
		{/if}
	</span>

	<!-- tilesettings -->
	<span slot="tilesettings">
		<p>Här kan du ställa in grejer.</p>
		<button class="btn" on:click={() => (isOpenSettingsDialog = false)}> Spara </button>
	</span>
</Function>

<style lang="scss">
	h1 {
		text-align: center;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
	.payoff {
		text-align: center;
		margin-bottom: 4rem;
	}
	.transactions {
		--maxHeight: 40vh;
		max-height: var(--maxHeight);
		overflow: hidden;

		margin: -1.35rem -1rem -1rem;
		position: relative;
		.list {
			max-height: var(--maxHeight);
			overflow-y: scroll;
		}
		.shadow {
			box-shadow: inset 0 0 5px #00000011;
			transform: scaleX(2);
			position: absolute;
			pointer-events: none;
			inset: 0;
			z-index: 1;
		}
	}
	.longList {
		margin: -1.35rem -1rem -1rem;
	}

	button {
		width: 100%;
	}
</style>
