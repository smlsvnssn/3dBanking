<script>
	import { Mesh } from '$lib/@threlte_hacked/core'
	import { Collider } from '$lib/@threlte_hacked/rapier'
	import { MeshStandardMaterial } from 'three'
	import { CylinderGeometry } from 'three'
</script>

<Collider shape={'cuboid'} position={{ y: -1 }} args={[400, 1, 400]} />

<Mesh
	receiveShadow
	position={{ y: -0.52 }}
	geometry={new CylinderGeometry(200, 200, 1, 32)}
	material={new MeshStandardMaterial({
		color: 0x00427a,
		transparent: true,
		opacity: 0.1,
	})}
/>

<slot />
