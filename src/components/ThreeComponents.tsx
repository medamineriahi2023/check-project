'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  useGLTF, 
  Float, 
  Environment, 
  PresentationControls, 
  Sparkles,
  Text,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  RoundedBox
} from '@react-three/drei';
import * as THREE from 'three';

interface ThemeProps {
  theme?: 'light' | 'dark';
}

const CheckModel = ({ position, rotation, scale, color, index, theme = 'light' }: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isDark = theme === 'dark';
  
  // Create a random wobble speed for each check
  const wobbleSpeed = useRef(0.5 + Math.random() * 0.5).current;
  const floatIntensity = useRef(0.3 + Math.random() * 0.5).current;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle rotation based on mouse position
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        hovered ? state.mouse.y * 0.3 : 0,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        hovered ? state.mouse.x * 0.3 : 0,
        0.1
      );
      
      // Add a subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * wobbleSpeed) * 0.1 * floatIntensity;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        {/* Use RoundedBox from drei instead of custom geometry */}
        <RoundedBox args={[3.5, 1.8, 0.05]} radius={0.1} smoothness={4}>
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            chromaticAberration={0.2}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.2}
            iridescence={0.3}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color={color}
            opacity={isDark ? 0.8 : 0.7}
            reflectivity={isDark ? 0.3 : 0.2}
            transmission={1}
          />
        </RoundedBox>
        
        {/* Check details */}
        <mesh position={[-1, 0.5, 0.06]}>
          <planeGeometry args={[1.5, 0.3]} />
          <meshStandardMaterial color={isDark ? "#3b82f6" : "#2563eb"} opacity={0.8} transparent />
        </mesh>
        
        <mesh position={[-1, 0.1, 0.06]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshStandardMaterial color={isDark ? "#9ca3af" : "#6b7280"} opacity={0.6} transparent />
        </mesh>
        
        <mesh position={[0.8, -0.2, 0.06]}>
          <planeGeometry args={[1, 0.5]} />
          <meshStandardMaterial color={isDark ? "#374151" : "#e5e7eb"} opacity={0.7} transparent />
        </mesh>
        
        <mesh position={[-0.8, -0.4, 0.06]}>
          <planeGeometry args={[0.8, 0.2]} />
          <meshStandardMaterial color={isDark ? "#d1d5db" : "#9ca3af"} opacity={0.7} transparent />
        </mesh>
        
        {/* Signature-like scribble */}
        <mesh position={[0.8, -0.2, 0.07]}>
          <torusKnotGeometry args={[0.2, 0.03, 100, 16]} />
          <meshStandardMaterial color={isDark ? "#e5e7eb" : "#1f2937"} opacity={0.6} transparent />
        </mesh>
      </mesh>
      
      {/* Add sparkles around the check when hovered */}
      {hovered && (
        <Sparkles 
          count={20} 
          scale={[3, 1.5, 1]} 
          size={0.4} 
          speed={0.3} 
          opacity={0.5} 
          color={color} 
        />
      )}
    </group>
  );
};

const FloatingText = ({ position, theme = 'light' }: { position: [number, number, number], theme?: 'light' | 'dark' }) => {
  const { viewport } = useThree();
  const textRef = useRef<THREE.Group>(null!);
  const isDark = theme === 'dark';
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.2;
      textRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={1.5}
        color={isDark ? "#60a5fa" : "#3b82f6"}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
      >
        CHECK
        <meshStandardMaterial color={isDark ? "#60a5fa" : "#3b82f6"} />
      </Text>
    </group>
  );
};

const ParticleField = ({ theme = 'light' }: ThemeProps) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 500;
  const isDark = theme === 'dark';
  
  // Create a random position for each particle
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? "#60a5fa" : "#3b82f6"}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
};

// Grid component for a TRON-like effect
const Grid = ({ theme = 'light' }: ThemeProps) => {
  const gridRef = useRef<THREE.Group>(null!);
  const isDark = theme === 'dark';
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = ((clock.elapsedTime * 0.15) % 1) * 10 - 5;
      gridRef.current.rotation.x = Math.PI / 2;
    }
  });
  
  return (
    <group ref={gridRef} position={[0, -10, 0]}>
      <gridHelper 
        args={[100, 100, isDark ? "#60a5fa" : "#3b82f6", isDark ? "#60a5fa" : "#3b82f6"]} 
        position={[0, 0, 0]}
      />
      <gridHelper 
        args={[100, 20, isDark ? "#93c5fd" : "#ffffff", isDark ? "#60a5fa" : "#3b82f6"]} 
        position={[0, 0.1, 0]}
      />
    </group>
  );
};

const ThreeComponents = ({ theme = 'light' }: ThemeProps) => {
  const isDark = theme === 'dark';
  
  // Colors for the checks - adjusted for theme
  const colors = isDark ? [
    "#60a5fa", // blue (lighter for dark theme)
    "#34d399", // green (lighter for dark theme)
    "#a78bfa", // purple (lighter for dark theme)
    "#fbbf24", // amber (lighter for dark theme)
    "#f87171", // red (lighter for dark theme)
    "#22d3ee", // cyan (lighter for dark theme)
  ] : [
    "#3b82f6", // blue
    "#10b981", // green
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#ef4444", // red
    "#06b6d4", // cyan
  ];

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <color attach="background" args={[isDark ? '#111827' : '#f3f4f6']} />
      <fog attach="fog" args={[isDark ? '#111827' : '#f3f4f6', 10, 50]} />
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isDark ? 0.8 : 1} castShadow />
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Multiple checks with different positions, rotations, and colors */}
          {colors.map((color, index) => (
            <CheckModel
              key={index}
              position={[
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
              ]}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ]}
              scale={[0.6 + Math.random() * 0.4, 0.6 + Math.random() * 0.4, 0.6 + Math.random() * 0.4]}
              color={color}
              index={index}
              theme={theme}
            />
          ))}
          
          {/* Floating text */}
          <FloatingText position={[0, 5, 0]} theme={theme} />
        </Float>
      </PresentationControls>
      
      {/* Particle field for background effect */}
      <ParticleField theme={theme} />
      
      {/* Environment lighting */}
      <Environment preset={isDark ? "night" : "city"} />
      
      {/* Additional ambient particles */}
      <Sparkles 
        count={100} 
        scale={30} 
        size={1} 
        speed={0.3} 
        opacity={0.2} 
        color={isDark ? "#60a5fa" : "#3b82f6"} 
      />
      
      {/* Glowing orb in the background */}
      <mesh position={[-10, -5, -10]}>
        <sphereGeometry args={[3, 32, 32]} />
        <MeshWobbleMaterial 
          color={isDark ? "#60a5fa" : "#3b82f6"} 
          factor={0.4} 
          speed={0.5} 
          opacity={0.2} 
          transparent 
          emissive={isDark ? "#60a5fa" : "#3b82f6"}
          emissiveIntensity={isDark ? 3 : 2}
        />
      </mesh>
      
      {/* Animated grid */}
      <Grid theme={theme} />
    </Canvas>
  );
};

export default ThreeComponents;
