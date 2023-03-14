<script>
	import { labels } from '$lib/dataStores';
	import { slide } from 'svelte/transition';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import generic from '$lib/assets/icons/star-40.svg';
	import plus from '$lib/assets/navigation/plus_enclosed_24.svg';
	import minus from '$lib/assets/navigation/minus_enclosed_24.svg';
	import down from '$lib/assets/chevron/chevron_down_24.svg';
	import { functions } from '$lib/dataStores';

	import * as ö from 'ouml';

	export let categories = [''],
		tiles = [''];

	let expanded = '';

	const [send, receive] = crossfade({
		duration: 300,
	});

	const setToExpanded = (categoryName) => (expanded = categoryName),
		addToSelected = (categoryName) => {
			categories = ö.unique([...categories, categoryName]);
			handleSuggestions();
		},
		removeSelected = (categoryName) => {
			categories = [...categories.filter((v) => v !== categoryName)];
		},
		findOverlapping = (category) =>
			category.name !== categories.find((categoryName) => categoryName === category.name),
		filterCategories = () =>
			$labels.categories
				.filter(findOverlapping)
				.map((v) => ({ ...v, subcategories: v?.subcategories?.filter(findOverlapping) })),
		handleSuggestions = () => {
			tiles = ö.unique(
				ö
					.filterDeep(
						$functions,
						(v) => categories.find((c) => v.suggestOnCategories.includes(c)),
						'functions'
					)
					.map((v) => v.name)
			);
		};

	$: filteredCategories = filterCategories(categories);
</script>

<h5>Välj kategorier du vill hålla koll på:</h5>

<p class="payoff">
	Kategorierna läggs till automatiskt på dina transaktioner, så du kan hålla koll på exempelvis hur
	mycket pengar du lägger på mat.
</p>

<div class="categories">
	<div class="valda">
		<h6>Valda kategorier</h6>
		{#if categories.length}
			{#each categories as categoryName (categoryName)}
				<li
					class="tile selected"
					in:receive={{ key: categoryName }}
					out:send={{ key: categoryName }}
					animate:flip={{ duration: 300 }}
				>
					<div>
						<img src={generic} alt="" class="catIcon" />
						<p class="small">{categoryName}</p>
						<img src={minus} on:click={() => removeSelected(categoryName)} alt="" />
					</div>
				</li>
			{/each}
		{:else}
			<p class="small empty" out:slide in:slide={{ delay: 300 }}>
				Inga kategorier valda. Välj i listan nedan:
			</p>
		{/if}
	</div>

	<h6>Alla andra kategorier</h6>

	<ul>
		{#each filteredCategories as category (category.name)}
			{@const isExpanded = expanded === category?.name}

			<li
				class="tile"
				in:receive={{ key: category.name }}
				out:send={{ key: category.name }}
				animate:flip={{ duration: 300 }}
			>
				<div>
					<img src={generic} alt="" class="catIcon" />
					<p class="pointer small" on:click={() => addToSelected(category.name)}>
						{category?.name}
					</p>
					{#if category?.subcategories?.length}
						<div on:click={() => setToExpanded(isExpanded ? '' : category.name)} class="chevron">
							<img src={down} style="transform:rotate({isExpanded ? 180 : 0}deg)" alt="" />
						</div>
					{/if}
					<img src={plus} on:click={() => addToSelected(category.name)} alt="" />
				</div>

				{#if category?.subcategories?.length && isExpanded}
					<ul class="subcategory" transition:slide>
						{#each category.subcategories as subcategory (subcategory.name)}
							<li
								class="tile"
								in:receive={{ key: subcategory.name }}
								out:send={{ key: subcategory.name }}
								animate:flip={{ duration: 300 }}
							>
								<div class="pointer" on:click={() => addToSelected(subcategory.name)} on:keydown>
									<img src={generic} alt="" class="catIcon indent" />
									<p class="small">{subcategory?.name}</p>
									<img src={plus} alt="" />
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<!-- {/if} -->
<style lang="scss">
	ul,
	li {
		padding: 0;
		list-style-type: none;
		list-style-image: none;
	}
	h5 {
		margin-top: 2rem;
	}
	.valda {
		margin: 0 -1rem;
		padding: 1rem;
		position: sticky;
		z-index: 1;
		background: var(--white);
		top: calc(2rem + 1px);
		box-shadow: 0 2px 2px #ccc6;
	}
	.empty {
		color: var(--silver);
		margin-bottom: 0;
	}
	.pointer {
		cursor: pointer;
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
			margin-left: 0;
			width: 1.25rem;
			&.indent {
				margin-left: 1rem;
			}
		}
		h6,
		p.small {
			flex: 1;
		}
		.chevron {
			margin: 0;
			cursor: pointer;
		}
	}
</style>
