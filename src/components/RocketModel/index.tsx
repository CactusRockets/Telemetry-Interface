import { Suspense } from 'react';
import styles from './styles.module.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

import { AxesHelper } from 'three';
import { Vector3, CylinderGeometry, MeshBasicMaterial, Mesh } from 'three';

interface RocketModelProps {
  angleX: number,
  angleY: number,
  angleZ: number,
}

function Model({ angleX, angleY, angleZ }: RocketModelProps) {
  const { scene, materials } = useGLTF('/rocket model0.glb');
  return (
    <primitive 
      object={scene} 
      material={materials}
      scale={[0.3, 0.3, 0.3]} 
      position={[0, -2.5, 0]}
      rotation={[angleX + 0, angleZ + 0, -angleY + 0]}
    />
  );
}

interface ThickAxesHelperProps {
  size: number;
  thickness: number;
}

function ThickAxesHelper({ size, thickness }: ThickAxesHelperProps) {
  return (
    <group>
      <mesh position={[size / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, size, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[0, size / 2, 0]}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, size, 32]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, size / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, size, 32]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
}

function RocketModel(props: RocketModelProps) {

  return (
    <div className={styles.container}>
      <Canvas style={{
        width: 230,
        height: 230
      }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model 
            angleX={props.angleX}
            angleY={props.angleY}
            angleZ={props.angleZ}
          />
        </Suspense>
        <OrbitControls />
        <ThickAxesHelper size={10} thickness={0.1}/>
      </Canvas>
    </div>
  )
}

export default RocketModel;
