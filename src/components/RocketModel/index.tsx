import { Suspense } from "react";
import styles from "./styles.module.css";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const positionGroup: [number, number, number] = [-0.2, -0.5, -0.5];
const positionOrigin: [number, number, number] = [0, -2, 0];

function Model() {
  const { scene, materials } = useGLTF("/rocket model0.glb");
  return (
    <primitive
      object={scene}
      material={materials}
      scale={[0.3, 0.3, 0.3]}
      position={positionOrigin}
      rotation={[0, 0, 0]}
    />
  );
}

interface ThickAxesHelperProps {
  size: number;
  thickness: number;
  position: [number, number, number];
}

function ThickAxesHelper({ size, thickness, position }: ThickAxesHelperProps) {
  return (
    <group position={position}>
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

interface RocketModelProps {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
  angleX?: number;
  angleY?: number;
  angleZ?: number;
}

function RocketModel(props: RocketModelProps) {
  return (
    <div className={styles.container}>
      <Canvas
        style={{
          width: 230,
          height: 230,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <group
            position={positionGroup}
            // rotation={[
            //   props.angleX ? +props.angleX : 0,
            //   props.angleZ ? +props.angleZ : 0,
            //   props.angleY ? -props.angleY : 0,
            // ]}
            quaternion={[props.q0, props.q1, props.q2, props.q3]}
          >
            <Model />
          </group>
          <ThickAxesHelper
            size={10}
            thickness={0.05}
            position={positionGroup}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default RocketModel;
