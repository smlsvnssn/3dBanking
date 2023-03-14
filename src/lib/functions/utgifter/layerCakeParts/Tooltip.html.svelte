<!--
  @component
  Generates a hover tooltip. It creates a slot with an exposed variable via `let:detail` that contains information about the event. Use the slot to populate the body of the tooltip using the exposed variable `detail`.
 -->
<script>
	import { slide } from 'svelte/transition';
	/** @type {Object} evt - A svelte event created via [`dispatch`](https://svelte.dev/docs#createEventDispatcher) with event information under `evt.detail.e`. */
	export let evt = {};
</script>

{#if evt.detail}
	<div class="tooltip" transition:slide={{ duration: 300 }}>
		<slot detail={evt.detail} />
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		top: 142%;
		/* border: 1px solid #ccc; */
		font-size: 0.8rem;
		/* background: rgba(250, 250, 250, 0.95); */
		padding: 0;
		z-index: 15;
	}
</style>
