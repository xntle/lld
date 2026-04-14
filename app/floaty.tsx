"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Torus } from "@react-three/drei";
import * as THREE from "three";
import type { WaterAPI } from "./water";

function FloatyMesh({ containerRef, waterAPI }: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  waterAPI: React.MutableRefObject<WaterAPI | null>;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const disturb = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const api = waterAPI.current;

    // Read wave height under the floaty to influence bob
    let waveY = 0;
    if (api && containerRef.current) {
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      // floaty center in section-space pixels
      const cx = rect.width  * 0.92 - 130;
      const cy = rect.height * 0.88 - 130;
      waveY = api.heightAt(cx, cy) / 600;

      // Emit ripples around the floaty every ~20 frames
      disturb.current += 1;
      if (disturb.current > 20) {
        disturb.current = 0;
        api.disturb(cx, cy, 120, 22);
      }
    }

    mesh.current.position.y = Math.sin(t * 0.6) * 0.12 + waveY;
    mesh.current.rotation.x = t * 0.25;
    mesh.current.rotation.z = t * 0.18;
  });

  return (
    <Torus ref={mesh} args={[1, 0.38, 128, 128]}>
      <MeshTransmissionMaterial
        color="#D2B48C"
        metalness={0.1}
        roughness={0.05}
        ior={1.6}
        thickness={0.4}
        transmission={0.88}
        reflectivity={0.15}
        chromaticAberration={0.04}
        clearcoat={0.6}
        clearcoatRoughness={0.02}
        iridescence={0.4}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[0, 100]}
        resolution={512}
        samples={4}
        background={new THREE.Color("#FAF0E6")}
      />
    </Torus>
  );
}

export default function Floaty({ waterAPI }: { waterAPI: React.MutableRefObject<WaterAPI | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        right: "8%",
        bottom: "12%",
        width: 260,
        height: 260,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true, antialias: true }} style={{ background: "transparent" }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={2} color="#FAF0E6" />
        <FloatyMesh containerRef={containerRef} waterAPI={waterAPI} />
      </Canvas>
    </div>
  );
}
