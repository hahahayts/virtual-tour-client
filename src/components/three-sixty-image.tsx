import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ThreeJS360ViewerProps {
  imageUrl: string;
  width?: number | string;
  height?: number | string;
  showControls?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  hotspotConfig?: {
    pitch: number;
    yaw: number;
    text: string;
    color?: string;
  }[];
}

const PanoramaSphere: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.encoding = THREE.sRGBEncoding ;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

const Hotspot: React.FC<{
  position: [number, number, number];
  text: string;
  color?: string;
}> = ({ position, text, color = "red" }) => {
  const [hovered, setHover] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.lookAt(0, 0, 0);
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded whitespace-nowrap">
            {text}
          </div>
        </Html>
      )}
    </mesh>
  );
};

const sphericalToCartesian = (
  pitch: number,
  yaw: number,
  radius: number
): [number, number, number] => {
  const phi = THREE.MathUtils.degToRad(90 - pitch);
  const theta = THREE.MathUtils.degToRad(yaw);
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
};

const ThreeSixtyViewer: React.FC<ThreeJS360ViewerProps> = ({
  imageUrl,
  width = "100%",
  height = "500px",
  showControls = true,
  autoRotate = false,
  autoRotateSpeed = 1,
  enableZoom = false,
  hotspotConfig = [],
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ width, height }}
    >
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        style={{ cursor: "grab" }}
        onPointerDown={() => {
          if (containerRef.current) {
            containerRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          if (containerRef.current) {
            containerRef.current.style.cursor = "grab";
          }
        }}
      >
        <PanoramaSphere imageUrl={imageUrl} />

        {hotspotConfig.map((hotspot, index) => {
          const position = sphericalToCartesian(
            hotspot.pitch,
            hotspot.yaw,
            490
          );
          return (
            <Hotspot
              key={index}
              position={position}
              text={hotspot.text}
              color={hotspot.color}
            />
          );
        })}

        {showControls && (
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
            // Mobile-specific settings
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: isMobile ? THREE.TOUCH.DOLLY_PAN : THREE.TOUCH.DOLLY_ROTATE,
            }}
          />
        )}
      </Canvas>

      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 z-50 p-2 bg-black/50 text-white border-none rounded cursor-pointer hover:bg-black/70 transition-colors"
      >
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>
    </div>
  );
};

export default ThreeSixtyViewer;
