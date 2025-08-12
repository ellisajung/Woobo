import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ParallaxCameraProps {
	sensitivity?: number;
	smoothness?: number;
}

export function ParallaxCamera({
	sensitivity = 0.5,
	smoothness = 0.05,
}: ParallaxCameraProps) {
	const { camera } = useThree();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const targetPosition = useRef(new THREE.Vector3());
	const initialPosition = useRef(new THREE.Vector3());

	useEffect(() => {
		initialPosition.current.copy(camera.position);
		targetPosition.current.copy(camera.position);

		const handleMouseMove = (event: MouseEvent) => {
			const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
			const x = (event.clientX - rect.left) / rect.width - 0.5;
			const y = (event.clientY - rect.top) / rect.height - 0.5;

			setMousePosition({ x, y });
		};

		const canvas = document.querySelector('canvas');
		if (canvas) {
			canvas.addEventListener('mousemove', handleMouseMove);
			return () => canvas.removeEventListener('mousemove', handleMouseMove);
		}
	}, [camera]);

	useFrame(() => {
		// 마우스 위치에 따른 타겟 위치 계산
		const offsetX = mousePosition.x * sensitivity * 2;
		const offsetY = -mousePosition.y * sensitivity * 1.5;

		targetPosition.current.set(
			initialPosition.current.x + offsetX,
			initialPosition.current.y + offsetY,
			initialPosition.current.z,
		);

		// 부드러운 카메라 이동
		camera.position.lerp(targetPosition.current, smoothness);
	});

	return null;
}
