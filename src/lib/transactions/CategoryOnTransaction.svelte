<script>
	import generic from '$lib/assets/icons/star-40.svg';
	import right from '$lib/assets/chevron/chevron_right_24.svg';
	import Dialog from '$lib/components/Dialog.svelte';
	import down from '$lib/assets/chevron/chevron_down_24.svg';
	import { slide } from 'svelte/transition';

	import * as ö from 'ouml';
	import { labels, transactions } from '$lib/dataStores';

	export let transaction;
	let isOpen = false;
	let expanded = transaction.category;

	const setToExpanded = (category) => (expanded = category),
		setToSelected = (category, subcategory) => {
			transaction = { ...transaction, category, subcategory };
			$transactions[$transactions.findIndex((v) => v.id === transaction.id)] = transaction;
			// force rerender
			$transactions = $transactions;
			$labels = $labels;
		},
		isSelected = (category) =>
			(category === transaction.category && !transaction.subcategory) ||
			category === transaction.subcategory;
</script>

<h6>Kategori:</h6>
<div
	class="category"
	on:click={() => {
		isOpen = true;
	}}
>
	<img src={generic} alt="" class="ikon" />
	<p class="small">
		{transaction.category}{transaction.subcategory ? ': ' : ''}{transaction.subcategory || ''}
	</p>
	<img src={right} alt="Byt kategori" />
</div>

<Dialog bind:isOpen>
	<h5 class="dialog">Välj kategori för {transaction.text}:</h5>
	<div class="categories">
		<div class="shadow" />
		<ul class="list">
			{#each $labels.categories as category (category.name)}
				{@const isExpanded = expanded === category?.name}

				<li class="tile" class:selected={isSelected(category.name)}>
					<div>
						<img src={generic} alt="" class="catIcon" />
						<p
							class="small"
							on:click={() => {
								setToSelected(category.name, null);
								setToExpanded(isExpanded ? '' : category.name);
							}}
						>
							{category?.name}
						</p>
						{#if category?.subcategories?.length}
							<div on:click={() => setToExpanded(isExpanded ? '' : category.name)} class="chevron">
								<img src={down} style="transform:rotate({isExpanded ? 180 : 0}deg)" alt="" />
							</div>
						{/if}
					</div>

					{#if category?.subcategories?.length && isExpanded}
						<ul class="subcategory" transition:slide>
							{#each category.subcategories as subcategory (subcategory.name)}
								<li class="tile" class:selected={isSelected(subcategory.name)}>
									<div>
										<img src={generic} alt="" class="catIcon indent" />
										<p
											on:click={() => setToSelected(category.name, subcategory.name)}
											class="small"
										>
											{subcategory?.name}
										</p>
									</div>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
	<div class="btn" on:click={() => (isOpen = false)}>Stäng</div>
</Dialog>

<style lang="scss">
	h5.dialog {
		margin-top: 0.5rem;
	}
	ul,
	li {
		padding: 0;
		list-style-type: none;
		list-style-image: none;
	}
	.categories {
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
	.ikon {
		background: var(--cloud);
		width: 2.5rem;
		min-width: 2.5rem;
		padding: 0.5rem;
		border-radius: 100rem;
		margin-right: 0.25rem;
	}
	img {
		width: 1.25rem;
	}
	.tile.selected > div {
		background: var(--cloud);
	}
	.tile > div {
		background: var(--white);
		border-bottom: 1px solid var(--smoke);
		padding: 0 0.5rem;
		display: flex;
		align-items: center;
		& > * {
			margin: 1rem;
		}

		img {
			width: 1.5rem;
			margin-right: 0;
			transition: all 0.3s;
			flex: 0 1;
		}
		.catIcon {
			margin-left: 0.5rem;
			width: 1.25rem;
			&.indent {
				margin-left: 1.5rem;
			}
		}
		h6,
		p.small {
			flex: 1;
			padding-right: 2rem;
			cursor: pointer;
		}
		.chevron {
			margin: 0;
			padding-right: 0.5rem;
			cursor: pointer;
		}
	}
	.category {
		background: var(--white);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 1rem;
		& > * {
			margin: 0.5rem 0;
		}
		img {
			width: 1.5rem;
			margin-right: 0;
			transition: all 0.3s;
			flex: 0 1;
		}
		h6,
		p.small {
			flex: 1;
		}
	}
</style>
