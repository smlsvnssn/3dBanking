<script>
	export let thisPage;
</script>

{#if thisPage?.categories?.length}
	<h6>
		Visar transaktioner från kategori{thisPage?.categories?.length > 1 ? 'erna' : ''}:
		{thisPage?.categories.join(', ')}
	</h6>
{/if}
{#if thisPage?.tags?.length}
	<h6>
		Visar transaktioner taggade med:
		{thisPage?.tags.join(', ')}
	</h6>
{/if}

<style lang="scss">
	h6 {
		margin: -0.5rem 0 0;
		padding: 0 1rem 1rem;
	}
</style>
