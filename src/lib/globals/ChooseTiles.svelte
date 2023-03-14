<script>
	import { functions } from '$lib/dataStores';
	import plus from '$lib/assets/navigation/plus_enclosed_24.svg';
	import minus from '$lib/assets/navigation/minus_enclosed_24.svg';
	import drag from '$lib/assets/navigation/draggable.svg';
	import { slide } from 'svelte/transition';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import * as ö from 'ouml';

	export let tiles = [''],
		text = null;

	const [send, receive] = crossfade({
		duration: 300,
		fallback: slide,
	});

	let incomingTile, outgoingTile;

	// Hacky solution due to dnd lib using flip animations
	const addToSelected = async (tileName) => {
			incomingTile = tileName;
			tiles = [...tiles, tileName];

			await ö.wait(290);
			incomingTile = null;
		},
		removeSelected = async (tileName) => {
			outgoingTile = tileName;
			draggableTiles = setDraggableTiles();

			await ö.wait(90);
			outgoingTile = null;
			tiles = [...tiles.filter((v) => v !== tileName)];
		},
		findOverlapping = (tile) => tile.name !== tiles.find((tileName) => tileName === tile.name),
		filterTiles = () => ö.filterDeep($functions, findOverlapping, 'functions'), // flatten
		findTile = (tileName) => ö.findDeep($functions, tileName, 'functions', 'name'),
		setDraggableTiles = () =>
				tiles.map((v) => ({
					name: v,
					id: v,
					in: v === incomingTile ? true : false,
					out: v === outgoingTile ? true : false,
				})
			),
		handleDndConsider = (e) => {
			draggableTiles = e.detail.items;
		},
		handleDndFinalize = (e) => {
			tiles = draggableTiles.map((v) => v.name);
			draggableTiles = e.detail.items;
		};

	$: filteredTiles = filterTiles(tiles);
	$: draggableTiles = setDraggableTiles(tiles);
</script>

<h5>Välj funktioner du vill visa på sidan:</h5>

<p class="payoff">
	{#if text}
		{text}
	{:else}
		Du kan lägga till vilka funktioner du vill på sidan. Många av funktionerna anpassar sitt
		innehåll efter de kategorier och taggar du valt. Vi har föreslagit några funktioner som passar
		bra ihop med de kategorier du valt.
	{/if}
</p>

<div class="tiles">
	<div class="valda">
		<h6>Valda funktioner</h6>

		{#if tiles.length}
			<section
				use:dndzone={{
					items: draggableTiles,
					dropTargetStyle: {
						outline: 'var(--smoke) dotted 1px',
						'outline-offset': '.25rem',
					},
				}}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each draggableTiles as tile (tile.id)}
					{@const thisFunction = findTile(tile.name)}

					<li
						class="tile selected {tile.in ? 'in' : tile.out ? 'out' : ''}"
						animate:flip={{ duration: 300 }}
					>
						<img src={thisFunction.icon} alt="" class="catIcon" />
						<p class="small">{thisFunction.name}</p>
						<img src={drag} alt="" />
						<img src={minus} on:click={() => removeSelected(thisFunction.name)} alt="" />
					</li>
				{/each}
			</section>
		{:else}
			<p class="small empty" out:slide in:slide={{ delay: 300 }}>
				Inga funktioner valda. Välj i listan nedan:
			</p>
		{/if}
	</div>

	<h6>Alla funktioner</h6>

	{#each filteredTiles as tile (tile.name)}
		<li
			class="tile"
			in:receive={{ key: tile.name }}
			out:send={{ key: tile.name }}
			animate:flip={{ duration: 300 }}
			on:click={() => addToSelected(tile.name)}
			on:keydown
		>
			<img src={tile?.icon} alt="" class="catIcon" />
			<p class="small">{tile?.name}</p>
			<img src={plus} alt="" />
		</li>
	{/each}
</div>

<style lang="scss">
	section {
		transition: all 0.3s;
		outline: var(--white) dotted 1px;
		outline-offset: 0;
		border-radius: 0.025rem;
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
	.tile {
		background: var(--white);
		border-bottom: 1px solid var(--smoke);
		padding: 0 0.5rem;
		display: flex;
		align-items: center;
		& > * {
			margin: 1rem;
		}
		&.selected {
			background: var(--cloud);
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
		}
		p.small {
			flex: 1;
		}
		&.in {
			animation: fadeIn .3s;
		}
		&.out {
			animation: fadeOut .1s;
		}
		@keyframes fadeIn {
			0% {
				opacity: 0;
				transform: translateY(2rem);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
		@keyframes fadeOut {
			0% {
				opacity: 1;
				transform: translateY(0);
			}
			100% {
				opacity: 0;
				transform: translateY(2rem);
			}
		}
	}
</style>
