<script>
	import betala from '$lib/assets/24pixels/Betala.svg';
	import right from '$lib/assets/chevron/chevron_right_24.svg';
	import TransactionModal from './TransactionModal.svelte';
	import * as ö from 'ouml';

	export let transaction = {
			id: 0,
			categoryId: 0,
			date: '2022-10-05T00:00:00',
			text: '',
			amount: 0,
			tags: [],
			data: '',
		},
		index = 0,
		transactionList = [],
		isSelected = false,
		mode = ''; //Options: 'selectable'

	let isOpenModal = false;
</script>

<TransactionModal bind:isOpen={isOpenModal} {index} {transactionList} />

<article
	on:click={() => {
		if (mode !== 'selectable') isOpenModal = true;
	}}
	on:click
	on:keydown
	class:isSelected
	style={mode === 'selectable' ? 'grid-template-columns: 1.5fr 8fr 4fr 0;' : ''}
>
	<img src={betala} alt="" class="ikon" />

	<div class="text">
		<h5>{transaction.text}</h5>

		<p class="small">
			{transaction.category}{transaction.subcategory ? ': ' : ''}
			{transaction.subcategory || ''}
		</p>

		{#each transaction.tags as tag}
			<div class="tag tag-info mt-05">
				{tag}
			</div>
		{/each}
	</div>

	<div class="belopp">
		<h5 style="color: {Number(transaction.amount) > 0 ? `var(--color-risk-3)` : 'var(--gray)'}">
			{ö.prettyNumber(transaction.amount, 2)} kr
		</h5>
		<p class="small">
			{new Date(transaction.date).toLocaleDateString('sv-SE', {
				month: 'short',
				day: 'numeric',
			})}
		</p>
	</div>

	{#if mode !== 'selectable'}
		<a
			class="chevron"
			href="#"
			on:click|preventDefault={() => {
				if (mode === 'selectable') isOpenModal = true;
			}}
		>
			<img src={right} alt="Öppna" />
		</a>
	{/if}
</article>

<style lang="scss">
	article {
		cursor: pointer;
		width: 100%;
		background: var(--white);
		padding: 1rem;
		border-bottom: 1px solid var(--smoke);
		&:last-child {
			border-bottom: none;
		}
		display: grid;
		grid-template-columns: 1.5fr 8fr 4fr 1fr;
		grid-template-rows: auto;
		gap: 0.5rem;
		grid-auto-flow: row;
		grid-template-areas: 'ikon txt belopp chevron';
		transition: all 0.3s;
		&.isSelected {
			background: var(--baby);
		}
		p {
			padding: 0;
			margin: 0;
		}
		.small {
			color: var(--gray);
		}

		& > * {
			//background: var(--cloud);
		}

		.tag {
			margin-top: 0.25rem;
			margin-right: 0.25rem;
			font-size: 0.75rem;
			height: auto;
			padding: 0.25rem 0.675rem;
		}

		.ikon {
			background: var(--cloud);
			grid-area: ikon;
			place-self: center;
			padding: 0.5rem;
			border-radius: 100rem;
		}

		.text {
			grid-area: txt;
			padding-left: 0.5rem;
			place-self: center start;
		}

		.belopp {
			h5,
			p {
				text-align: end;
			}
			padding-right: 0.5rem;
			grid-area: belopp;
			place-self: center end;
		}

		.chevron {
			grid-area: chevron;
			place-self: center;
		}
	}
</style>
