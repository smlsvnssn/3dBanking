<script>
	import AddTransactionsToTag from './AddTransactionsToTag.svelte';
	import { labels, transactions } from '$lib/dataStores';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { fade, slide } from 'svelte/transition';

	import * as ö from 'ouml';

	export let transaction;

	const [send, receive] = crossfade({
		duration: 300,
	});

	let newTagName = '',
		currentTag = null;

	const addToSelected = (tag) => {
			transaction.tags = ö.unique([...transaction.tags, tag]);
			filteredTags = filterTags();
			currentTag = tag;
			updateTransactions();
		},
		removeSelected = (tag) => {
			transaction.tags = [...transaction.tags.filter((v) => v !== tag)];
			filteredTags = filterTags();
			currentTag = null;
			updateTransactions();
		},
		createNewTag = (tag) => {
			if (tag) {
				addToSelected(tag);
				$labels.tags = ö.unique([...$labels.tags, tag]);
				filteredTags = filterTags();
				currentTag = tag;
				updateTransactions();
			}
		},
		updateTransactions = () => {
			$transactions[$transactions.findIndex((v) => v.id === transaction.id)] = { ...transaction };
			$transactions = $transactions; // force store update
		},
		filterTags = () =>
			$labels.tags.filter((tag) => tag !== transaction.tags.find((t) => t === tag));

	$: filteredTags = filterTags($labels.tags);
</script>

<div class="createTags">
	<h6>Taggar:</h6>

	{#if transaction.tags.length}
		{#each transaction.tags as tag (tag)}
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
		<p class="small gray" out:slide in:slide={{ delay: 300 }}>Inga taggar valda</p>
	{/if}
</div>

{#if currentTag}
	<AddTransactionsToTag tag={currentTag} />
{/if}

<p class="small">Alla dina taggar:</p>
{#each filteredTags as tag (tag)}
	<div
		on:click={() => addToSelected(tag)}
		class="tag tag mt-05"
		in:receive={{ key: tag }}
		out:send={{ key: tag }}
		animate:flip={{ duration: 300 }}
	>
		{tag}
	</div>
{/each}

<p class="small">Skapa ny tagg:</p>
<div class="newTag">
	<input
		type="text"
		bind:value={newTagName}
		class="form-control"
		placeholder="Till exempel: Min resa"
	/>
	<div class="btn btn-secondary" on:click={() => createNewTag(newTagName)}>Spara</div>
</div>

<style lang="scss">
	h5 {
		margin-top: 2rem;
	}
	.selected {
		box-shadow: 0 0 0 2px #00427a;
	}
	p.small {
		margin-top: 0.5rem;
	}
	.gray {
		color: var(--silver);
	}
	.createTags {
		margin-top: 2rem;
	}
	.btn-secondary {
		width: 33%;
		min-width: fit-content;
		margin-top: 1rem;
		z-index: 0;
	}
	.newTag {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		.btn-secondary {
			margin: 0;
		}
	}
	.tag {
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		cursor: pointer;
		z-index: 0;
	}
</style>
