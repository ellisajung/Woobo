import * as THREE from 'three';
import { JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Shape_0: THREE.Mesh;
		Shape_1: THREE.Mesh;
		Shape_2: THREE.Mesh;
	};
	materials: {};
};

export function Model(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF('/ci.glb') as unknown as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<group scale={0.01}>
				<group position={[0, 159.177, 0]}>
					<group position={[-122, 153, -25.01]}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Shape_0.geometry}
							material={nodes.Shape_0.material}
							position={[27.457, 0, 0]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Shape_1.geometry}
							material={nodes.Shape_1.material}
							position={[59.852, -35.156, 0.01]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes.Shape_2.geometry}
							material={nodes.Shape_2.material}
							position={[0.004, -73.427, 0.02]}
						/>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload('/ci.glb');
