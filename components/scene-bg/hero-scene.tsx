"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Architecture graph data ─────────────────────────────────────────────────

const ARCH_NODES = [
  { id: "browser",  label: "BROWSER",     sub: "React · Next.js",         x: 900,  y: 105,  tier: "client"  },
  { id: "cdn",      label: "CDN / LB",    sub: "CloudFront · Nginx",       x: 900,  y: 210,  tier: "gateway" },
  { id: "apigw",    label: "API GATEWAY", sub: "Express · Rate Limit",     x: 900,  y: 325,  tier: "gateway" },
  { id: "auth",     label: "AUTH SVC",    sub: "JWT · OAuth2",             x: 660,  y: 455,  tier: "service" },
  { id: "core",     label: "CORE API",    sub: "Node.js · REST",           x: 900,  y: 455,  tier: "service" },
  { id: "notify",   label: "NOTIFIER",    sub: "WebSocket · Queue",        x: 1140, y: 455,  tier: "service" },
  { id: "redis",    label: "REDIS",       sub: "Cache · Sessions",         x: 660,  y: 585,  tier: "data"    },
  { id: "postgres", label: "POSTGRES",    sub: "Primary DB",               x: 900,  y: 585,  tier: "data"    },
  { id: "mongo",    label: "MONGO",       sub: "Documents",                x: 1140, y: 585,  tier: "data"    },
  { id: "docker",   label: "DOCKER",      sub: "Containers · CI/CD",       x: 790,  y: 725,  tier: "infra"   },
  { id: "aws",      label: "AWS",         sub: "EC2 · S3 · RDS",           x: 1010, y: 725,  tier: "infra"   },
] as const;

type NodeId = typeof ARCH_NODES[number]["id"];

const ARCH_EDGES: [NodeId, NodeId][] = [
  ["browser",  "cdn"     ],
  ["cdn",      "apigw"   ],
  ["apigw",    "auth"    ],
  ["apigw",    "core"    ],
  ["apigw",    "notify"  ],
  ["auth",     "redis"   ],
  ["core",     "postgres"],
  ["core",     "mongo"   ],
  ["notify",   "mongo"   ],
  ["redis",    "docker"  ],
  ["postgres", "docker"  ],
  ["docker",   "aws"     ],
  ["mongo",    "aws"     ],
];

const TIER_COLOR: Record<string, string> = {
  client:  "#FF4500",
  gateway: "#FF6020",
  service: "#4060FF",
  data:    "#FFB040",
  infra:   "#40A0FF",
};

const LAYER_LABELS = [
  { y: 105,  label: "CLIENT",        tier: "client"  },
  { y: 210,  label: "CDN / LB",      tier: "gateway" },
  { y: 325,  label: "API GATEWAY",   tier: "gateway" },
  { y: 455,  label: "SERVICES",      tier: "service" },
  { y: 585,  label: "DATA LAYER",    tier: "data"    },
  { y: 725,  label: "INFRA",         tier: "infra"   },
];

const ARCH_LEFT = 520; // divider x — architecture starts here

const NODE_W = 124;
const NODE_H = 44;

// Build adjacency lookup
const NODE_MAP = new Map<string, { x: number; y: number }>(
  ARCH_NODES.map((n) => [n.id, { x: n.x, y: n.y }])
);

// ─── Component ───────────────────────────────────────────────────────────────

export function HeroScene() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<NodeId | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Derive active sets from hovered node
  const activeEdges = new Set<string>();
  const activeNodes = new Set<string>();
  if (hoveredId) {
    activeNodes.add(hoveredId);
    for (const [a, b] of ARCH_EDGES) {
      if (a === hoveredId || b === hoveredId) {
        activeEdges.add(`${a}__${b}`);
        activeNodes.add(a);
        activeNodes.add(b);
      }
    }
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (1440 / rect.width);
    const my = (e.clientY - rect.top)  * (900  / rect.height);
    let nearest: NodeId | null = null;
    let minDist = 90;
    for (const n of ARCH_NODES) {
      const d = Math.hypot(mx - n.x, my - n.y);
      if (d < minDist) { minDist = d; nearest = n.id; }
    }
    setHoveredId(nearest);
  }

  const anyHovered = hoveredId !== null;

  return (
    <motion.div
      ref={wrapRef}
      className="scene-layer"
      style={{ opacity: sceneOpacity }}
      aria-hidden="true"
    >
      <div className="ambient-tl" />
      <div className="ambient-tr" />
      <div className="ambient-fire" />

      <svg
        ref={svgRef}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full scene-interactive"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* ── Corner brackets ──────────────────────────────────── */}
        <path d="M20 64 L20 20 L64 20" stroke="rgba(232,229,222,0.18)" strokeWidth="1"/>
        <path d="M1376 20 L1420 20 L1420 64" stroke="rgba(232,229,222,0.18)" strokeWidth="1"/>
        <path d="M20 836 L20 880 L64 880" stroke="rgba(232,229,222,0.18)" strokeWidth="1"/>
        <path d="M1376 880 L1420 880 L1420 836" stroke="rgba(232,229,222,0.18)" strokeWidth="1"/>

        {/* ── Layer separator lines ─────────────────────────────── */}
        {[162, 268, 392, 520, 654].map((y) => (
          <line key={y} x1={ARCH_LEFT} y1={y} x2="1410" y2={y}
            stroke="rgba(232,229,222,0.05)" strokeWidth="1" strokeDasharray="4 8"/>
        ))}

        {/* ── Layer labels ──────────────────────────────────────── */}
        {LAYER_LABELS.map((l) => (
          <g key={l.label}>
            <line x1={ARCH_LEFT + 2} y1={l.y} x2={ARCH_LEFT + 14} y2={l.y}
              stroke={TIER_COLOR[l.tier]} strokeWidth="1.5" opacity="0.5"/>
            <text x={ARCH_LEFT + 20} y={l.y + 4}
              fontFamily="'Space Mono',monospace" fontSize="8"
              fill={TIER_COLOR[l.tier]} opacity="0.45" letterSpacing="1.5">
              {l.label}
            </text>
          </g>
        ))}

        {/* ── Architecture divider line ─────────────────────────── */}
        <line x1={ARCH_LEFT} y1="60" x2={ARCH_LEFT} y2="840"
          stroke="rgba(232,229,222,0.06)" strokeWidth="1"/>

        {/* ── Edges ─────────────────────────────────────────────── */}
        {ARCH_EDGES.map(([a, b]) => {
          const pa = NODE_MAP.get(a)!;
          const pb = NODE_MAP.get(b)!;
          const key = `${a}__${b}`;
          const isActive = activeEdges.has(key);
          const dimmed = anyHovered && !isActive;

          // Get color from source node tier
          const srcNode = ARCH_NODES.find((n) => n.id === a)!;
          const col = TIER_COLOR[srcNode.tier];

          return (
            <g key={key}>
              {/* Base line */}
              <line
                x1={pa.x} y1={pa.y + NODE_H / 2}
                x2={pb.x} y2={pb.y - NODE_H / 2}
                stroke={isActive ? col : "rgba(255,255,255,0.08)"}
                strokeWidth={isActive ? 1.5 : 1}
                opacity={dimmed ? 0.15 : 1}
              />
              {/* Animated dashes on active edge */}
              {isActive && (
                <line
                  x1={pa.x} y1={pa.y + NODE_H / 2}
                  x2={pb.x} y2={pb.y - NODE_H / 2}
                  stroke={col}
                  strokeWidth="2"
                  strokeDasharray="6 10"
                  opacity="0.7"
                  className="scene-dash-move"
                />
              )}
            </g>
          );
        })}

        {/* ── Nodes ─────────────────────────────────────────────── */}
        {ARCH_NODES.map((node) => {
          const col = TIER_COLOR[node.tier];
          const isHovered = hoveredId === node.id;
          const isActive  = activeNodes.has(node.id);
          const dimmed    = anyHovered && !isActive;
          const rx = node.x - NODE_W / 2;
          const ry = node.y - NODE_H / 2;

          return (
            <g key={node.id} opacity={dimmed ? 0.2 : 1}>
              {/* Glow halo when active */}
              {isActive && (
                <rect
                  x={rx - 4} y={ry - 4}
                  width={NODE_W + 8} height={NODE_H + 8}
                  rx="3" fill={col} opacity="0.08"
                />
              )}
              {/* Node background */}
              <rect
                x={rx} y={ry}
                width={NODE_W} height={NODE_H}
                rx="2"
                fill={isHovered ? `${col}18` : "rgba(2,4,8,0.75)"}
              />
              {/* Node border */}
              <rect
                x={rx} y={ry}
                width={NODE_W} height={NODE_H}
                rx="2"
                stroke={isActive ? col : "rgba(255,255,255,0.12)"}
                strokeWidth={isHovered ? 1.5 : 1}
                fill="none"
              />
              {/* Left accent bar */}
              <rect
                x={rx} y={ry}
                width="3" height={NODE_H}
                rx="1"
                fill={col}
                opacity={isActive ? 1 : 0.35}
              />
              {/* Label */}
              <text
                x={node.x + 4} y={node.y - 4}
                fontFamily="'Space Mono',monospace"
                fontSize="9"
                fill={isActive ? col : "rgba(232,229,222,0.7)"}
                textAnchor="middle"
                letterSpacing="1.2"
                fontWeight={isHovered ? "bold" : "normal"}
              >
                {node.label}
              </text>
              {/* Sublabel */}
              <text
                x={node.x + 4} y={node.y + 11}
                fontFamily="'Space Mono',monospace"
                fontSize="7"
                fill={isActive ? "rgba(232,229,222,0.5)" : "rgba(232,229,222,0.25)"}
                textAnchor="middle"
                letterSpacing="0.8"
              >
                {node.sub}
              </text>
            </g>
          );
        })}

        {/* ── Hover tooltip ─────────────────────────────────────── */}
        {hoveredId && (() => {
          const node = ARCH_NODES.find((n) => n.id === hoveredId)!;
          const col = TIER_COLOR[node.tier];
          const connCount = ARCH_EDGES.filter(([a, b]) => a === hoveredId || b === hoveredId).length;
          const tx = node.x > 1050 ? node.x - 140 : node.x + 80;
          const ty = node.y - 40;
          return (
            <g>
              <rect x={tx} y={ty} width={130} height={34} rx="2"
                fill="rgba(2,4,8,0.92)" stroke={col} strokeWidth="1" opacity="0.95"/>
              <text x={tx + 10} y={ty + 13}
                fontFamily="'Space Mono',monospace" fontSize="7.5"
                fill={col} letterSpacing="1">
                {node.label}
              </text>
              <text x={tx + 10} y={ty + 25}
                fontFamily="'Space Mono',monospace" fontSize="6.5"
                fill="rgba(232,229,222,0.45)" letterSpacing="0.8">
                {connCount} connection{connCount !== 1 ? "s" : ""}
              </text>
            </g>
          );
        })()}

        {/* ── Corner readouts ───────────────────────────────────── */}
        <text x="32" y="46" fontFamily="'Space Mono',monospace" fontSize="8"
          fill="rgba(232,229,222,0.14)" letterSpacing="1.4">
          ARCHITECTURE · LIVE
        </text>
        <text x="1408" y="46" fontFamily="'Space Mono',monospace" fontSize="8"
          fill="rgba(232,229,222,0.14)" letterSpacing="1.4" textAnchor="end">
          FULL-STACK SYSTEM
        </text>
        <circle cx="1404" cy="866" r="3" fill="rgba(74,222,128,0.6)" className="scene-blink"/>
        <text x="1392" y="870" fontFamily="'Space Mono',monospace" fontSize="7"
          fill="rgba(74,222,128,0.25)" textAnchor="end" letterSpacing="1">
          LIVE
        </text>

        {/* ── Hover instruction (shown only when nothing hovered) ── */}
        {!anyHovered && (
          <text x="900" y="820" fontFamily="'Space Mono',monospace" fontSize="8"
            fill="rgba(232,229,222,0.18)" textAnchor="middle" letterSpacing="1.2">
            HOVER TO EXPLORE CONNECTIONS
          </text>
        )}
      </svg>
    </motion.div>
  );
}
