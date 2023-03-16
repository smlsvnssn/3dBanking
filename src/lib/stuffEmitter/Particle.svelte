<script>
	import { GLTF } from '$lib/@threlte_hacked/extras'
	import { Collider, RigidBody, Debug } from '$lib/@threlte_hacked/rapier'

	export let stuff
	export let position
	export let rotation
</script>

<!-- <Debug /> -->
<RigidBody type={'dynamic'} {position} {rotation}>
	<Collider shape={'cuboid'} args={stuff.boxSize} />
	<GLTF
		castShadow
		receiveShadow
		url={stuff.model}
		scale={stuff.scale}
		position={stuff.position}
	/>
</RigidBody>
