<script>
	import Node from './Node.svelte';

	export let root;
</script>

<pancake-treemap>
	<Node node={root} let:node>
		<slot {node}></slot>
	</Node>
</pancake-treemap>

<style>
	pancake-treemap {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>