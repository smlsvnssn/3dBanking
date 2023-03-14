<script>
	import * as ö from 'ouml';

	export let view = 'not set'; // 'tile', 'page', eller 'tilesettings'
	export let userPage = null;

	//ö.log('View:', view, '\nUserPage for Function:', userPage);
</script>

{#if view === 'tile'}
	<slot name="tile">
		<!-- Vy för funktionen som Tile. -->
		<span class="undefined">Ingenting här.</span>
	</slot>
{:else if view === 'page'}
	<slot name="page">
		<!-- Vy för funktionen som fristående sida. -->
		<span class="undefined">Ingen sida här.</span>
	</slot>
{:else if view === 'tilesettings'}
	<slot name="tilesettings">
		<!-- Vy för funktionens inställningar när den visas som Tile. Skall ha en stängknapp. -->
		<span class="undefined">Inga inställningar här.</span>
	</slot>
{:else}
	<p>
		Här har det blivit fel på parametern 'view'. Den är satt till '{view}', men ska vara antingen
		'tile', 'page', eller 'tilesettings'.
	</p>
{/if}

<style lang="scss">
	.undefined {
		color: var(--silver);
	}
</style>
