import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Shoe3D() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/shoe.glb');

  const [scale, setScale] = useState(10);
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());

  // Mover el objeto para centrarlo
  scene.position.sub(center);
  

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        setScale(8);
      } else if (windowWidth < 1024) {
        setScale(8);
      } else {
        setScale(12);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame(() => {
    if (group.current) {
      const time = performance.now() * 0.001;
      group.current.position.y = Math.sin(time) * 0.1;
    }
  });

  return (
    <>
      <group
        ref={group}
        scale={scale}
        rotation={[0, -0.5, Math.PI / -6]} // Rotación para que apunte hacia la izquierda e inclinada
        position={[0, 0, 0]} // Ajuste leve de posición
      >
        <primitive object={scene} castShadow receiveShadow />
      </group>
    </>
  );
}
