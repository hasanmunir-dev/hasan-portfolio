"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";

// ─── Scroll state singleton ──────────────────────────────────────────────────
const scrollState = { progress: 0 };

// ─── Architecture layer definitions ─────────────────────────────────────────
// Each node = a real service in the full-stack architecture
const SERVICE_NODES = [
  { id: "client",    label: "CLIENT",    pos: new THREE.Vector3( 0,    3.2,  8  ), color: "#FF4500", size: 0.22 },
  { id: "gateway",   label: "API GW",    pos: new THREE.Vector3( 0,    1.8,  4  ), color: "#FF6020", size: 0.18 },
  { id: "auth",      label: "AUTH",      pos: new THREE.Vector3(-4,    0.4,  0  ), color: "#4060FF", size: 0.15 },
  { id: "core",      label: "CORE API",  pos: new THREE.Vector3( 0,    0.4,  0  ), color: "#4060FF", size: 0.18 },
  { id: "notifier",  label: "NOTIFY",    pos: new THREE.Vector3( 4,    0.4,  0  ), color: "#4060FF", size: 0.14 },
  { id: "redis",     label: "REDIS",     pos: new THREE.Vector3(-4,   -1.0, -5  ), color: "#FFB040", size: 0.14 },
  { id: "postgres",  label: "POSTGRES",  pos: new THREE.Vector3( 0,   -1.0, -5  ), color: "#FFB040", size: 0.16 },
  { id: "mongo",     label: "MONGO",     pos: new THREE.Vector3( 4,   -1.0, -5  ), color: "#FFB040", size: 0.14 },
  { id: "docker",    label: "DOCKER",    pos: new THREE.Vector3(-2,   -2.2, -9  ), color: "#40A0FF", size: 0.15 },
  { id: "aws",       label: "AWS",       pos: new THREE.Vector3( 2,   -2.2, -9  ), color: "#FF9900", size: 0.16 },
] as const;

type NodeId = typeof SERVICE_NODES[number]["id"];

const SERVICE_CONNECTIONS: [NodeId, NodeId][] = [
  ["client",   "gateway" ],
  ["gateway",  "auth"    ],
  ["gateway",  "core"    ],
  ["gateway",  "notifier"],
  ["auth",     "redis"   ],
  ["core",     "postgres"],
  ["core",     "mongo"   ],
  ["notifier", "mongo"   ],
  ["redis",    "docker"  ],
  ["postgres", "docker"  ],
  ["docker",   "aws"     ],
  ["mongo",    "aws"     ],
];

// Pre-build position map
const NODE_MAP = new Map<string, THREE.Vector3>(
  SERVICE_NODES.map((n) => [n.id, n.pos])
);

// Camera spline — 7 keyframes, one per section
const CAM_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0,   2.5, 11  ),  // Hero
  new THREE.Vector3( 4.5, 2,   8.5),  // About
  new THREE.Vector3(-3,   5,   7  ),  // Projects
  new THREE.Vector3( 2,   7,   5  ),  // Skills
  new THREE.Vector3(-5.5, 2,   8  ),  // Experience
  new THREE.Vector3( 0,   1,   6.5),  // Certifications
  new THREE.Vector3( 0,  -0.5, 13 ),  // Contact
]);

const LOOK_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 0,  1,   0 ),
  new THREE.Vector3( 0,  0,  -3 ),
  new THREE.Vector3(-1,  2,  -5 ),
  new THREE.Vector3( 0,  0,  -5 ),
  new THREE.Vector3( 0,  1,   0 ),
  new THREE.Vector3( 0,  0,  -2 ),
  new THREE.Vector3( 0,  2,  -1 ),
]);

// ─── Ground grid (faint engineering blueprint grid) ──────────────────────────
function makeGridGeometry(): THREE.BufferGeometry {
  const verts: number[] = [];
  const half = 28;
  const step = 2.8;
  for (let i = -half; i <= half; i += step) {
    verts.push(-half, 0, i,   half, 0, i);
    verts.push(i, 0, -half,   i, 0,  half);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  return g;
}

function GroundGrid() {
  const geo = useMemo(makeGridGeometry, []);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#080e1a" transparent opacity={0.6} />
    </lineSegments>
  );
}

// ─── Architecture connection lines ───────────────────────────────────────────
function makeConnectionGeometry(): THREE.BufferGeometry {
  const pts: number[] = [];
  for (const [a, b] of SERVICE_CONNECTIONS) {
    const pa = NODE_MAP.get(a)!;
    const pb = NODE_MAP.get(b)!;
    pts.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function ConnectionLines() {
  const geo = useMemo(makeConnectionGeometry, []);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#1a3060" transparent opacity={0.7} />
    </lineSegments>
  );
}

// ─── Service nodes (flat glowing panels) ─────────────────────────────────────
function ServiceNodes() {
  const panelGeo = useMemo(() => new THREE.BoxGeometry(1, 0.36, 0.06), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    SERVICE_NODES.forEach((node, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      // Gentle pulse on emissiveIntensity
      mat.emissiveIntensity = 0.7 + Math.sin(clock.elapsedTime * 0.8 + i * 0.9) * 0.3;
    });
  });

  return (
    <group>
      {SERVICE_NODES.map((node, i) => {
        const col = new THREE.Color(node.color);
        return (
          <group key={node.id} position={node.pos}>
            {/* Panel body */}
            <mesh
              ref={(el) => { refs.current[i] = el; }}
              geometry={panelGeo}
            >
              <meshStandardMaterial
                color={col}
                emissive={col}
                emissiveIntensity={0.7}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            {/* Corner accent dots */}
            {[-0.42, 0.42].map((x) =>
              [-0.14, 0.14].map((y) => (
                <mesh key={`${x}${y}`} position={[x, y, 0.04]}>
                  <sphereGeometry args={[0.022, 6, 6]} />
                  <meshStandardMaterial
                    color={node.color}
                    emissive={col}
                    emissiveIntensity={3}
                  />
                </mesh>
              ))
            )}
          </group>
        );
      })}
    </group>
  );
}

// ─── Data flow packets (move along connections) ──────────────────────────────
const PACKET_PATHS = SERVICE_CONNECTIONS.map(([a, b]) => {
  const pa = NODE_MAP.get(a)!;
  const pb = NODE_MAP.get(b)!;
  return new THREE.CatmullRomCurve3([pa, pb]);
});

const PACKET_CONFIGS = SERVICE_CONNECTIONS.map((_, i) => ({
  speed: 0.18 + (i % 4) * 0.07,
  offset: i * 0.08,
  color: i % 3 === 0 ? "#FF4500" : i % 3 === 1 ? "#4060FF" : "#FFB040",
}));

function DataFlowPackets() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetGeo = useMemo(() => new THREE.SphereGeometry(0.06, 6, 6), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    SERVICE_CONNECTIONS.forEach((_, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const cfg = PACKET_CONFIGS[i];
      const t = ((clock.elapsedTime * cfg.speed + cfg.offset) % 1);
      PACKET_PATHS[i].getPointAt(t, tmpVec);
      mesh.position.copy(tmpVec);
    });
  });

  return (
    <group>
      {SERVICE_CONNECTIONS.map((_, i) => {
        const col = new THREE.Color(PACKET_CONFIGS[i].color);
        return (
          <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} geometry={packetGeo}>
            <meshStandardMaterial
              color={col}
              emissive={col}
              emissiveIntensity={4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── CI/CD deployment ring (orbiting cursor = active deploy) ─────────────────
function DeploymentRing() {
  const cursorRef = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.38;
    const r = 6.5;
    if (cursorRef.current) {
      cursorRef.current.position.set(Math.cos(t) * r, 0, Math.sin(t) * r - 2);
    }
    if (trailRef.current) {
      const t2 = t - 0.15;
      trailRef.current.position.set(Math.cos(t2) * r, 0, Math.sin(t2) * r - 2);
    }
  });

  return (
    <group position={[0, 0, -1]}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6.5, 0.012, 8, 160]} />
        <meshStandardMaterial
          color="#1a2850"
          emissive={new THREE.Color("#1a2850")}
          emissiveIntensity={1.2}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Deploy cursor */}
      <mesh ref={cursorRef}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive={new THREE.Color("#FF4500")}
          emissiveIntensity={5}
        />
      </mesh>
      {/* Trail */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive={new THREE.Color("#FF4500")}
          emissiveIntensity={2.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// ─── Layer separator planes (faint horizontal dividers) ──────────────────────
function LayerPlanes() {
  const planeGeo = useMemo(() => new THREE.PlaneGeometry(24, 0.01), []);
  const layers = [
    { y: 2.6,  z: 6,  color: "#FF4500" },  // Client layer
    { y: 1.1,  z: 2,  color: "#FF6020" },  // Gateway layer
    { y: -0.3, z: -2, color: "#4060FF" },  // Services layer
    { y: -1.7, z: -7, color: "#FFB040" },  // Data layer
    { y: -2.9, z: -11,color: "#40A0FF" },  // Infra layer
  ];

  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i} position={[0, l.y, l.z]} rotation={[0, 0, 0]}>
          <planeGeometry args={[24, 0.015]} />
          <meshStandardMaterial
            color={l.color}
            emissive={new THREE.Color(l.color)}
            emissiveIntensity={0.8}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Lighting ────────────────────────────────────────────────────────────────
function SceneLights() {
  const orangeRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (orangeRef.current) {
      orangeRef.current.intensity = 3.2 + Math.sin(clock.elapsedTime * 0.55) * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.06} color="#040810" />
      <directionalLight position={[8, 16, 5]} intensity={0.2} color="#7888a0" />
      {/* Orange light illuminates client/gateway layer */}
      <pointLight ref={orangeRef} position={[0, 4, 6]} color="#FF4500" distance={18} decay={1.4} />
      {/* Blue light illuminates services layer */}
      <pointLight position={[0, 0, 0]} color="#3060FF" intensity={1.6} distance={22} decay={1.4} />
      {/* Amber light illuminates data layer */}
      <pointLight position={[0, -1, -5]} color="#FFB040" intensity={1.2} distance={16} decay={1.6} />
      {/* Blue light illuminates infra layer */}
      <pointLight position={[0, -2.5, -9]} color="#40A0FF" intensity={1.0} distance={14} decay={1.8} />
    </>
  );
}

// ─── Scroll-driven camera ────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const smoothPos  = useRef(new THREE.Vector3(0, 2.5, 11));
  const smoothLook = useRef(new THREE.Vector3(0, 1, 0));
  const tmpVec     = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const t = Math.max(0, Math.min(scrollState.progress, 0.9999));
    CAM_PATH.getPointAt(t, tmpVec);
    smoothPos.current.lerp(tmpVec, 0.026);
    LOOK_PATH.getPointAt(t, tmpVec);
    smoothLook.current.lerp(tmpVec, 0.026);
    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothLook.current);
  });

  return null;
}

// ─── Root scene ──────────────────────────────────────────────────────────────
export function WorldScene() {
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <color attach="background" args={["#020408"]} />
      <fog attach="fog" args={["#020408", 18, 65]} />

      <SceneLights />
      {/* <CameraRig /> */}

      {/* <GroundGrid /> */}
      {/* <LayerPlanes /> */}
      {/* <ConnectionLines /> */}
      {/* <ServiceNodes /> */}
      {/* <DataFlowPackets /> */}
      {/* <DeploymentRing /> */}

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.04}
          luminanceSmoothing={0.9}
          intensity={1.8}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.62} />
      </EffectComposer>
    </>
  );
}
