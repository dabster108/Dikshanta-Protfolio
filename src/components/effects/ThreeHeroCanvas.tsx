import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

interface ThreeHeroCanvasProps {
  scrollY: number;
}

const Orb = ({ scrollY }: ThreeHeroCanvasProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.25;
    meshRef.current.position.x = Math.sin(scrollY * 0.0015) * 0.8;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.7} floatIntensity={1.3}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]} position={[1.6, 0.1, -0.5]}>
        <MeshDistortMaterial
          color="#7c6bff"
          emissive="#9f8dff"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.45}
          distort={0.2}
          speed={1.7}
        />
      </Sphere>
    </Float>
  );
};

const ThreeHeroCanvas = ({ scrollY }: ThreeHeroCanvasProps) => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none opacity-80">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 55 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={1.4} color="#b8a8ff" />
        <pointLight position={[-3, -2, 4]} intensity={1.1} color="#6ee7ff" />
        <Orb scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default ThreeHeroCanvas;
