"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { WorldScene } from "./WorldScene";

export default function WorldCanvas() {
  return (
    <div className="world-canvas">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 2.5, 11], fov: 60, near: 0.1, far: 200 }}
        shadows={false}
      >
        <Suspense fallback={null}>
          <WorldScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
