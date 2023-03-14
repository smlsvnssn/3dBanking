<script>
	import { labels, transactions, functions } from '$lib/dataStores';
	import AddTransactionsToTag from '$lib/transactions/AddTransactionsToTag.svelte';
	import { fade, slide } from 'svelte/transition';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import * as ö from 'ouml';

	export let tags = [''],
		tiles = [''];

	const [send, receive] = crossfade({
		duration: 300,
	});

	let newTagName = '',
		currentTag = null,
		isOpenTransactionsDialog = false;

	const addToSelected = (tag) => {
			tags = ö.unique([...tags, tag]);
			currentTag = tag;
			handleSuggestions();
		},
		removeSelected = (tag) => {
			tags = [...tags.filter((v) => v !== tag)];
			currentTag = null;
		},
		createNewTag = (tag) => {
			if (tag) {
				addToSelected(tag);
				$labels.tags = ö.unique([...$labels.tags, tag]);
				currentTag = tag;
			}
		},
		filterTags = () => $labels.tags.filter((tag) => tag !== tags.find((t) => t === tag)),
		handleSuggestions = () => {
			tiles = ö.unique(
				ö.filterDeep($functions, (v) => v.suggestOnNewTagPage, 'functions').map((v) => v.name)
			);
		};

	$: filteredTags = filterTags(tags);
</script>

<h5>Skapa en ny tagg, eller välj en du redan skapat:</h5>

<p class="payoff">
	Använd taggar till saker som händer lite då och då, eller under en begränsad tid. Du behöver själv
	tagga dina transaktioner med taggarna du skapar, om du vill hålla koll på till exempel vika
	utgifter som hör till en resa.
</p>

<div class="createTags">
	<h6>Skapa ny tagg:</h6>
	<div class="newTag">
		<input
			type="text"
			bind:value={newTagName}
			class="form-control"
			placeholder="Till exempel: Min resa"
		/>
		<div class="btn btn-secondary" on:click={() => createNewTag(newTagName)}>Spara taggen</div>
	</div>
</div>

<h6>Valda taggar:</h6>

{#if tags.length}
	{#each tags as tag (tag)}
		<div
			class="tag tag-info mt-05 {tag === currentTag ? 'selected' : ''}"
			in:receive={{ key: tag }}
			out:send={{ key: tag }}
			animate:flip={{ duration: 300 }}
		>
			<span on:click={() => (currentTag = tag)}>{tag}</span>
			<button
				on:click={() => removeSelected(tag)}
				type="button"
				class="btn-close"
				aria-label="Close"
			/>
		</div>
	{/each}
{:else}
	<p class="small empty" out:slide in:slide={{ delay: 300 }}>Inga taggar valda.</p>
{/if}

{#if currentTag}
	<AddTransactionsToTag tag={currentTag} bind:isOpen={isOpenTransactionsDialog} />
{/if}

<h6>Alla dina taggar:</h6>

{#each filteredTags as tag (tag)}
	<div
		on:click={() => addToSelected(tag)}
		class="tag mt-05"
		in:receive={{ key: tag }}
		out:send={{ key: tag }}
		animate:flip={{ duration: 300 }}
	>
		{tag}
	</div>
{/each}

<style lang="scss">
	h5 {
		margin-top: 2rem;
	}
	.selected {
		box-shadow: 0 0 0 2px #00427a;
	}
	.empty {
		color: var(--silver);
		margin-bottom: 0;
	}
	.createTags {
		margin-top: 2rem;
	}
	.btn-secondary {
		width: 100%;
		margin-top: 1rem;
		z-index: 0;
	}
	.newTag {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		.btn-secondary {
			margin: 0;
			width: 33%;
			min-width: fit-content;
		}
	}
	.tag {
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		cursor: pointer;
		z-index: 0;
	}
</style>
