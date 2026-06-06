"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

/*
  Technology Dependency Graph
  Flows top→bottom showing real architectural dependencies:

  FRONTEND TIER  →  BACKEND TIER  →  DATA TIER  →  INFRA TIER
  React/Next/TS  →  Node/Express  →  Mongo/PG   →  Docker/AWS
*/

const NODES = [
  // FRONTEND — left cluster
  { id: "react",   x: 140,  y: 95,  label: "REACT",       tier: "frontend", note: "UI Framework"       },
  { id: "next",    x: 660,  y: 80,  label: "NEXT.JS",     tier: "frontend", note: "SSR · SSG · RSC"    },
  { id: "ts",      x: 1180, y: 95,  label: "TYPESCRIPT",  tier: "frontend", note: "Type Safety"         },
  { id: "tw",      x: 140,  y: 175, label: "TAILWIND",    tier: "frontend", note: "Utility CSS"         },
  // BACKEND — center spread
  { id: "node",    x: 250,  y: 295, label: "NODE.JS",     tier: "backend",  note: "JS Runtime"          },
  { id: "express", x: 660,  y: 280, label: "EXPRESS",     tier: "backend",  note: "HTTP Framework"      },
  { id: "fastapi", x: 1180, y: 295, label: "FASTAPI",     tier: "backend",  note: "Python ASGI"         },
  { id: "python",  x: 1180, y: 195, label: "PYTHON",      tier: "backend",  note: "Language"            },
  { id: "rest",    x: 660,  y: 390, label: "REST APIs",   tier: "backend",  note: "HTTP · JSON"         },
  // DATA — wide spread
  { id: "mongo",   x: 140,  y: 510, label: "MONGODB",     tier: "data",     note: "Document Store"      },
  { id: "pg",      x: 660,  y: 510, label: "POSTGRES",    tier: "data",     note: "Relational DB"       },
  { id: "redis",   x: 1180, y: 510, label: "REDIS",       tier: "data",     note: "Cache · Pub/Sub"     },
  // INFRA — center
  { id: "docker",  x: 400,  y: 640, label: "DOCKER",      tier: "infra",    note: "Containerization"    },
  { id: "graphql", x: 900,  y: 640, label: "GRAPHQL",     tier: "infra",    note: "Query Language"      },
  // CLOUD — center
  { id: "aws",     x: 660,  y: 760, label: "AWS",         tier: "cloud",    note: "EC2 · S3 · RDS"      },
];

// Directional edges showing real dependencies
const EDGES: Array<[string, string]> = [
  ["react",   "next"    ],
  ["ts",      "react"   ],
  ["ts",      "next"    ],
  ["tw",      "react"   ],
  ["next",    "node"    ],
  ["ts",      "node"    ],
  ["node",    "express" ],
  ["python",  "fastapi" ],
  ["express", "rest"    ],
  ["fastapi", "rest"    ],
  ["rest",    "mongo"   ],
  ["rest",    "pg"      ],
  ["node",    "redis"   ],
  ["mongo",   "docker"  ],
  ["pg",      "docker"  ],
  ["redis",   "docker"  ],
  ["rest",    "graphql" ],
  ["docker",  "aws"     ],
  ["graphql", "aws"     ],
];

const TIER_COLOR: Record<string, string> = {
  frontend: "#4080FF",
  backend:  "#FF4500",
  data:     "#FFB040",
  infra:    "#40C080",
  cloud:    "#FF9900",
};

const NODE_W = 108;
const NODE_H = 36;

const TIER_BANDS = [
  { y: 55,  h: 165, tier: "frontend", label: "FRONTEND"   },
  { y: 225, h: 205, tier: "backend",  label: "BACKEND"    },
  { y: 460, h: 120, tier: "data",     label: "DATA LAYER" },
  { y: 600, h: 100, tier: "infra",    label: "INFRA"      },
  { y: 720, h: 80,  tier: "cloud",    label: "CLOUD"      },
];

// full viewport width coverage
const GRAPH_LEFT = 30;
const GRAPH_RIGHT = 1410;

export function SkillsScene() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const nodeMap = new Map(NODES.map((n) => [n.id, n]));

  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="ambient-blue" />
      <div className="ambient-center" />

      <svg
        ref={ref}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* ── Tier band backgrounds (full width) ───────────────── */}
        {TIER_BANDS.map((band) => (
          <motion.rect
            key={band.tier}
            x={GRAPH_LEFT} y={band.y} width={GRAPH_RIGHT - GRAPH_LEFT} height={band.h}
            fill={TIER_COLOR[band.tier]}
            opacity={0}
            animate={inView ? { opacity: 0.022 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
        ))}

        {/* ── Tier labels — left rail ───────────────────────────── */}
        {TIER_BANDS.map((band) => (
          <motion.text
            key={`lbl-${band.tier}`}
            x={GRAPH_LEFT + 10} y={band.y + band.h / 2 + 4}
            fontFamily="'Space Mono',monospace"
            fontSize="7"
            fill={TIER_COLOR[band.tier]}
            letterSpacing="2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.45 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {band.label}
          </motion.text>
        ))}

        {/* ── Full-width left rail ──────────────────────────────── */}
        <motion.line
          x1={GRAPH_LEFT} y1="55" x2={GRAPH_LEFT} y2="800"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: easeOut }}
        />

        {/* ── Dependency edges ──────────────────────────────────── */}
        {EDGES.map(([a, b], i) => {
          const na = nodeMap.get(a);
          const nb = nodeMap.get(b);
          if (!na || !nb) return null;
          const x1 = na.x + NODE_W / 2;
          const y1 = na.y + NODE_H;
          const x2 = nb.x + NODE_W / 2;
          const y2 = nb.y;
          // Midpoint for curve control
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const col = TIER_COLOR[na.tier];

          return (
            <motion.path
              key={`e-${a}-${b}`}
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              stroke={col}
              strokeWidth="0.8"
              fill="none"
              opacity={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 1.4, ease: easeOut, delay: 0.4 + i * 0.04 }}
            />
          );
        })}

        {/* ── Arrow tips on edges ───────────────────────────────── */}
        {EDGES.map(([a, b], i) => {
          const na = nodeMap.get(a);
          const nb = nodeMap.get(b);
          if (!na || !nb) return null;
          const x2 = nb.x + NODE_W / 2;
          const y2 = nb.y;
          const col = TIER_COLOR[na.tier];
          return (
            <motion.polygon
              key={`arr-${a}-${b}`}
              points={`${x2},${y2} ${x2 - 4},${y2 - 7} ${x2 + 4},${y2 - 7}`}
              fill={col}
              opacity={0}
              animate={inView ? { opacity: 0.45 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.04 + 1.2 }}
            />
          );
        })}

        {/* ── Nodes ─────────────────────────────────────────────── */}
        {NODES.map((node, i) => {
          const col = TIER_COLOR[node.tier];
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.2 + i * 0.055 }}
            >
              {/* Node background */}
              <rect
                x={node.x} y={node.y}
                width={NODE_W} height={NODE_H}
                rx="2"
                fill="rgba(2,4,8,0.88)"
              />
              {/* Node border */}
              <rect
                x={node.x} y={node.y}
                width={NODE_W} height={NODE_H}
                rx="2"
                stroke={col}
                strokeWidth="0.8"
                fill="none"
                opacity="0.5"
              />
              {/* Top accent bar */}
              <rect
                x={node.x} y={node.y}
                width={NODE_W} height="2.5"
                rx="1"
                fill={col}
                opacity="0.6"
              />
              {/* Label */}
              <text
                x={node.x + NODE_W / 2}
                y={node.y + 16}
                fontFamily="'Space Mono',monospace"
                fontSize="8"
                fill={col}
                textAnchor="middle"
                letterSpacing="0.8"
                opacity="0.85"
              >
                {node.label}
              </text>
              {/* Sublabel */}
              <text
                x={node.x + NODE_W / 2}
                y={node.y + 28}
                fontFamily="'Space Mono',monospace"
                fontSize="6.5"
                fill="rgba(232,229,222,0.2)"
                textAnchor="middle"
                letterSpacing="0.5"
              >
                {node.note}
              </text>
            </motion.g>
          );
        })}

        {/* ── Header label ──────────────────────────────────────── */}
        <motion.text
          x={GRAPH_LEFT + 10} y="42"
          fontFamily="'Space Mono',monospace"
          fontSize="8"
          fill="rgba(64,128,255,0.3)"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          DEPENDENCY GRAPH · TECH ECOSYSTEM
        </motion.text>
      </svg>
    </div>
  );
}
