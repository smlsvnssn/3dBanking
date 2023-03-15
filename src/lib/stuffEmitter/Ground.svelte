<script>
	import { Mesh } from '@threlte/core'
	import { Collider } from '@threlte/rapier'
	import { MeshStandardMaterial } from 'three'
	import { BoxBufferGeometry } from 'three'
</script>

<Collider shape={'cuboid'} position={{ y: -1 }} args={[400, 1, 400]} />

<Mesh
	receiveShadow
	position={{ y: -0.52 }}
	geometry={new BoxBufferGeometry(400, 1, 400)}
	material={new MeshStandardMaterial({
		color: 0x00427a,
		transparent: true,
		opacity: 0.1,
	})}
/>

<slot />
