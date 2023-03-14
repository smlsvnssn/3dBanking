<script>
	import Function from '$lib/globals/Function.svelte';
	import { transactions } from '$lib/dataStores';
	import * as ö from 'ouml';

	export let view = 'not set', // 'tile', 'page', eller 'tilesettings'
		userPage = null,
		isOpenSettingsDialog = false;
</script>

<Function {view} {userPage}>
	<!-- tile -->
	<p slot="tile">Vy för funktionen som Tile.</p>

	<!-- page -->
	<p slot="page">Vy för funktionen som fristående sida.</p>

	<!-- tilesettings -->
	<div slot="tilesettings">
		<p>Vy för funktionens inställningar när den visas som Tile. <br />Skall ha en stängknapp.</p>
		<button class="btn" on:click={() => (isOpenSettingsDialog = false)}> Spara </button>
	</div>
</Function>

<style lang="scss">
	button {
		width: 100%;
	}
</style>
