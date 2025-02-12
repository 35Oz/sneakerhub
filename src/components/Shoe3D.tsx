import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Shoe3D() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/shoe.glb');
  const [scale, setScale] = useState(9);

  // Calcular el centro inicial solo una vez
  const initialBox = new THREE.Box3().setFromObject(scene);
  const initialCenter = initialBox.getCenter(new THREE.Vector3());

  useEffect(() => {
    // Solo ajustar la posición del modelo una vez al cargarlo, no cambiar más
    scene.position.sub(initialCenter);

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newScale = 9;

      if (windowWidth < 640) {
        newScale = 6;
      } else if (windowWidth < 1024) {
        newScale = 12;
      } else {
        newScale = 14;
      }

      setScale(newScale); // Solo actualizar la escala
    };

    return () => window.removeEventListener('resize', handleResize);
  }, [scene, initialCenter]);

  
  useFrame(() => {
    if (group.current) {
      const time = performance.now() * 0.001;
      // Animación de flotación más sutil
      group.current.position.y = Math.sin(time) * 0.05;
    }
  });

  return (
    <group
      ref={group}
      scale={scale} // Solo cambiar la escala
      rotation={[0, -0.5, Math.PI / -6]}
      position={[0, 0, 0]} // No cambiar la posición, mantener centrado
    >
      <primitive object={scene} castShadow receiveShadow />

    </group>
  );
}
