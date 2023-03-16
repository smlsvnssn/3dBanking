import type { Rotation } from '$lib/@threlte_hacked/core'
import { Quaternion } from 'three'
export declare const rotationToQuaternion: (
	rotation?: Rotation,
	quaternion?: Quaternion,
) => Quaternion
