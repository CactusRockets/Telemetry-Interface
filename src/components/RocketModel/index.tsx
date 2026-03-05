import { Suspense } from "react";
import styles from "./styles.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_POSITION: [number, number, number] = [0, -2, 0];
const GROUP_POSITION: [number, number, number] = [-0.2, -0.5, -0.5];

function RocketMesh() {
  const { scene, materials } = useGLTF("/rocket model0.glb");
  return (
    <primitive
      object={scene}
      material={materials}
      scale={[0.3, 0.3, 0.3]}
      position={MODEL_POSITION}
    />
  );
}

interface AxesHelperProps {
  size: number;
  thickness: number;
  position: [number, number, number];
}

function AxesHelper({ size, thickness, position }: AxesHelperProps) {
  return (
    <group position={position}>
      <mesh position={[size / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, size, 16]} />
        <meshBasicMaterial color="#e8504a" />
      </mesh>
      <mesh position={[0, size / 2, 0]}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, size, 16]} />
        <meshBasicMaterial color="#4adc61" />
      </mesh>
      <mesh position={[0, 0, size / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, size, 16]} />
        <meshBasicMaterial color="#5592e8" />
      </mesh>
    </group>
  );
}

interface RocketModelProps {
  q0: number; // w
  q1: number; // x
  q2: number; // y
  q3: number; // z
}

function RocketModel({ q0, q1, q2, q3 }: RocketModelProps) {
  const quaternion = new THREE.Quaternion(q1, q2, q3, q0); // THREE expects (x, y, z, w)

  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4adc61" />
        <Suspense fallback={null}>
          <group position={GROUP_POSITION} quaternion={quaternion}>
            <RocketMesh />
          </group>
          <AxesHelper size={10} thickness={0.05} position={GROUP_POSITION} />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}

export default RocketModel;
