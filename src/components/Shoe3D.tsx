import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Shoe3D() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/shoe.glb');
  const [scale, setScale] = useState(10);

  // Calcular el centro inicial solo una vez
  const initialBox = new THREE.Box3().setFromObject(scene);
  const initialCenter = initialBox.getCenter(new THREE.Vector3());

  useEffect(() => {
    // Ajustamos la posición del modelo solo una vez
    scene.position.sub(initialCenter);

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newScale = 12;

      if (windowWidth < 640) {
        newScale = 8;
      } else if (windowWidth < 1024) {
        newScale = 12;
      } else {
        newScale = 14;
      }

      setScale(newScale); // Actualizamos solo la escala
    };

    window.addEventListener('resize', handleResize);
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
      scale={scale} // Solo cambiamos la escala
      rotation={[0, -0.5, Math.PI / -6]} // Rotación fija del modelo
      position={[0, 0, 0]} // No cambiamos la posición, mantenemos el modelo centrado
    >
      <primitive object={scene} castShadow receiveShadow />
    </group>
  );
}
