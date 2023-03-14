<script>
	import Dialog from '$lib/components/Dialog.svelte';
	import { transactions } from '$lib/dataStores';
	import Transaction from '$lib/globals/Transaction.svelte';
	import * as ö from 'ouml';

	export let tag,
		isOpen = false;

	const toggleTagOnTransaction = (tag, transaction) => {
		if (transaction.tags.includes(tag))
			transaction.tags = transaction.tags.filter((v) => v !== tag);
		else transaction.tags = ö.unique([...transaction.tags, tag]);

		$transactions = $transactions; // force store update
	};
</script>

<div class="btn btn-secondary" on:click={() => (isOpen = true)}>
	Välj transaktioner som hör ihop med "{tag}"
</div>

<Dialog bind:isOpen>
	<h5 class="dialog">Välj transaktioner som hör ihop med "{tag}":</h5>
	<div class="transactions">
		<div class="shadow" />
		<div class="list">
			{#if $transactions.length}
				{#each $transactions as transaction}
					<Transaction
						{transaction}
						transactionList={$transactions}
						isSelected={transaction.tags.includes(tag)}
						mode="selectable"
						on:click={() => toggleTagOnTransaction(tag, transaction)}
					/>
				{/each}
			{/if}
		</div>
	</div>
	<div class="btn" on:click={() => (isOpen = false)}>Spara och stäng</div>
</Dialog>

<style lang="scss">
	h5.dialog {
		margin: 0
	}
	.btn {
		margin-top: 0.5rem;
	}
	.transactions {
		max-height: 40vh;
		overflow: hidden;

		margin: 0 -1rem;
		position: relative;
		.list {
			max-height: 40vh;
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
</style>
