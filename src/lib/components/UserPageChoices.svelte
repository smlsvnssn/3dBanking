<script>
	import * as ö from 'ouml';

	export let page;
</script>

<div>
	<h5>Känner du dig nöjd med dina val?</h5>
	<div class="choices">
		<h6>Namn:</h6>
		<p class="small">{@html page.name || '<span>Inget namn</span>'}</p>
		<h6>Kategorier:</h6>
		<p class="small">
			{@html page.categories.length
				? page.categories.join(', ')
				: '<span>Ingen kategori vald</span>'}
		</p>
		<h6>Taggar:</h6>
		<p class="small">
			{@html page.tags.length ? page.tags.join(', ') : '<span>Ingen tagg vald</span>'}
		</p>
		<h6>Funktioner:</h6>
		<p class="small">
			{@html page.tiles.length
				? page.tiles.join(', ')
				: '<span>Ingen vald funktion (Då blir sidan helt tom!)</span>'}
		</p>
	</div>
</div>

<style lang="scss">
	.choices {
		margin-bottom: 2rem;
		display: grid;
		grid: auto-flow / 1fr 3fr;
		gap: 1rem;
		place-items: center start;
	}

	h5 {
		padding-top: 2rem;
		padding-bottom: 0.75rem;
	}
	h6,
	p {
		margin: 0;
		:global(span) {
			color: var(--silver);
		}
	}

	.small {
		font-size: 0.9rem;
	}
	* {
		flex-shrink: 0;
	}
</style>
