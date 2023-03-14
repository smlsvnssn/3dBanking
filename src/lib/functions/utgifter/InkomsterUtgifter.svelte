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
				d="M87 162H119V41H102.311H87V162Z"
				fill="#005AA0"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M173 162H205V91H188.311H173V162Z"
				fill="#AD1015"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M259 162H291V127H274.311H259V162Z"
				fill="#76BBE7"
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
	svg{
		width:100%
	}
</style>
