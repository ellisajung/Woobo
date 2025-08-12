'use client';

import { Model } from '@/components/Model';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const ModelViewPage = () => {
	return (
		<Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={1} />
			<Model />
			<OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
			<Environment preset='city' />
		</Canvas>
	);
};

export default ModelViewPage;
