import { Suspense } from 'react';
import styles from './styles.module.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene, materials } = useGLTF('/rocket model2.glb');
  return (
    <primitive 
      object={scene} 
      material={materials}
      position={[0, -2.5, 0]}
      scale={[0.3, 0.3, 0.3]} 
    />
  );
}

function RocketModel() {

  return (
    <div className={styles.container}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default RocketModel
