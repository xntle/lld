"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Capsule, Environment, MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// NDC pointer tracked outside R3F so Canvas events can be fully disabled
const ndcPointer = { x: 0, y: 0 };

function CursorMesh({
  clicked, hovered, dragging,
}: { clicked: boolean; hovered: boolean; dragging: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  useFrame(() => {
    group.current.position.set(
      ndcPointer.x * (viewport.width  / 2),
      ndcPointer.y * (viewport.height / 2),
      0.1
    );
  });

  useEffect(() => {
    const s = group.current.scale;
    if (dragging) {
      gsap.to(s, { x: 1,   y: 1,   z: 0.1,  duration: 1.5, ease: "elastic(1,0.3)" });
    } else if (clicked || hovered) {
      gsap.to(s, { x: 1.7, y: 1.7, z: 0.2,  duration: 1.5, ease: "elastic(1,0.3)" });
    } else {
      gsap.to(s, { x: 1,   y: 1,   z: 0.75, duration: 1.5, ease: "elastic(1,0.3)" });
    }
  }, [clicked, hovered, dragging]);

  const mat = useMemo(() => (
    <MeshTransmissionMaterial
      color="white"
      metalness={0}
      roughness={0}
      ior={1.5}
      thickness={0.08}
      transmission={1}
      reflectivity={0.05}
      chromaticAberration={0.04}
      clearcoat={0.1}
      resolution={512}
      clearcoatRoughness={0}
      iridescence={0.2}
      iridescenceIOR={1.2}
      iridescenceThicknessRange={[0, 60]}
      samples={4}
    />
  ), []);

  return (
    <group ref={group}>
      <Capsule
        args={dragging ? [0.08, 0.1, 64, 64] : [0.1, 0.3, 64, 64]}
        position={[0, 0, 0.1]}
        rotation={[0, 0, -Math.PI / 2]}
        visible={clicked || hovered || dragging}
      >
        {mat}
      </Capsule>
      <Sphere
        args={[0.1, 64, 64]}
        scale={[1, 1, 0.12]}
        position={[0, 0, 0.1]}
        visible={!clicked && !hovered && !dragging}
      >
        {mat}
      </Sphere>
    </group>
  );
}

export default function LiquidCursor() {
  const [clicked,  setClicked]  = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const INTERACTIVE = 'a, button, input, textarea, select, [role="button"]';

    const onMove  = (e: MouseEvent) => {
      ndcPointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      ndcPointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      setHovered(!!(e.target as Element).closest(INTERACTIVE));
    };
    const onDown  = () => { setClicked(true);  setDragging(true);  };
    const onUp    = () => { setClicked(false); setDragging(false); };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove",   onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup",   onUp,   { passive: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove",   onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup",   onUp);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
        /* disable R3F's own event system so it never touches scroll */
        // @ts-expect-error — intentionally pass null to opt out of R3F events
        events={null}
      >
        <Environment preset="city" />
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} intensity={2} />
        <CursorMesh clicked={clicked} hovered={hovered} dragging={dragging} />
      </Canvas>
    </div>
  );
}
