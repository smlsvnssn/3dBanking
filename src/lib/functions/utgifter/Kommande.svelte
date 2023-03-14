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
	<p slot="tile">
		<svg
			viewBox="0 0 375 192"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="375" height="192" fill="white" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M113 163H157V113H134.053H113V163Z"
				fill="#AD1015"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M113 113H157V69H134.053H113V113Z"
				fill="#FFDFE0"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M217 163H261V30H238.053H217V163Z"
				fill="#005AA0"
			/>
		</svg>
	</p>

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
	svg {
		width: 100%;
	}
</style>
