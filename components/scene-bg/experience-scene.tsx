"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

/*
  Architecture Evolution Visualization
  Shows increasing system complexity across 3 career stages.

  RIGHT SIDE (x:750-1400) — three mini architecture diagrams:
    TSN      (top, y~180)  : Enterprise stack — full microservices
    Websolixs(mid, y~390)  : Backend microservices — FastAPI + Postgres
    SeeBiz   (bot, y~600)  : Simple MERN stack

  LEFT SIDE (x:60-520) — vertical career timeline (retained)
*/

const NODE_W = 84;
const NODE_H = 28;

// Three architecture snapshots, one per stage
const STAGES = [
  {
    company: "TSN",
    y0: 115,
    color: "#FF4500",
    label: "ENTERPRISE FULL-STACK",
    nodes: [
      { id: "nxt", label: "NEXT.JS",   x: 580,  y: 115 },
      { id: "exp", label: "EXPRESS",   x: 720,  y: 115 },
      { id: "ws",  label: "WEBSOCKET", x: 580,  y: 185 },
      { id: "nod", label: "NODE.JS",   x: 720,  y: 185 },
      { id: "mng", label: "MONGODB",   x: 860,  y: 115 },
      { id: "red", label: "REDIS",     x: 860,  y: 185 },
      { id: "api", label: "REST API",  x: 1000, y: 115 },
      { id: "pay", label: "PAYMENTS",  x: 1000, y: 185 },
    ],
    edges: [
      [0,1],[0,2],[1,4],[1,6],[2,3],[3,4],[3,5],[4,7],[5,6],
    ],
  },
  {
    company: "WEBSOLIXS",
    y0: 340,
    color: "#4060FF",
    label: "MICROSERVICES BACKEND",
    nodes: [
      { id: "fap", label: "FASTAPI",  x: 620,  y: 340 },
      { id: "pyt", label: "PYTHON",   x: 620,  y: 410 },
      { id: "pg",  label: "POSTGRES", x: 780,  y: 340 },
      { id: "etl", label: "ETL PIPE", x: 780,  y: 410 },
      { id: "dkr", label: "DOCKER",   x: 940,  y: 375 },
    ],
    edges: [
      [1,0],[0,2],[0,3],[2,4],[3,4],
    ],
  },
  {
    company: "SEEBIZ",
    y0: 545,
    color: "#40C080",
    label: "MERN STACK",
    nodes: [
      { id: "rct", label: "REACT",  x: 620,  y: 545 },
      { id: "nde", label: "NODE",   x: 780,  y: 545 },
      { id: "mon", label: "MONGO",  x: 940,  y: 545 },
    ],
    edges: [
      [0,1],[1,2],
    ],
  },
];

const MILESTONES = [
  { y: 180, company: "TSN",       role: "FULL-STACK ENGINEER", period: "2024", accent: true  },
  { y: 390, company: "WEBSOLIXS", role: "BACKEND ENGINEER",    period: "2023", accent: false },
  { y: 600, company: "SEEBIZ",    role: "TRAINEE DEVELOPER",   period: "2023", accent: false },
];

export function ExperienceScene() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="ambient-fire" />
      <div className="ambient-br" />

      <svg
        ref={ref}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* ── Section label ─────────────────────────────────── */}
        <motion.text
          x="120" y="70"
          fontFamily="'Space Mono',monospace"
          fontSize="9"
          fill="rgba(232,229,222,0.1)"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ARCHITECTURE EVOLUTION
        </motion.text>

        {/* ── Vertical timeline ─────────────────────────────── */}
        <motion.line
          x1="120" y1="100" x2="120" y2="780"
          stroke="rgba(232,229,222,0.07)" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: easeOut, delay: 0.3 }}
        />
        <motion.line
          x1="120" y1="100" x2="120" y2="640"
          stroke="rgba(255,69,0,0.18)" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.2, ease: easeOut, delay: 0.5 }}
        />

        {/* ── Timeline milestones (left side) ───────────────── */}
        {MILESTONES.map((m, i) => (
          <motion.g
            key={m.company}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.6 + i * 0.2 }}
          >
            <line
              x1="120" y1={m.y} x2="200" y2={m.y}
              stroke={m.accent ? "rgba(255,69,0,0.4)" : "rgba(232,229,222,0.1)"}
              strokeWidth="1"
            />
            <circle
              cx="120" cy={m.y} r="5"
              fill={m.accent ? "rgba(255,69,0,0.8)" : "rgba(232,229,222,0.15)"}
              stroke={m.accent ? "rgba(255,69,0,0.35)" : "rgba(232,229,222,0.18)"}
              strokeWidth="1"
            />
            <text
              x="210" y={m.y - 12}
              fontFamily="'Bebas Neue',sans-serif" fontSize="20"
              fill={m.accent ? "rgba(255,69,0,0.2)" : "rgba(232,229,222,0.1)"}
              letterSpacing="2"
            >
              {m.company}
            </text>
            <text
              x="210" y={m.y + 2}
              fontFamily="'Space Mono',monospace" fontSize="7.5"
              fill="rgba(232,229,222,0.18)" letterSpacing="1.2"
            >
              {m.role}
            </text>
            <text
              x="210" y={m.y + 15}
              fontFamily="'Space Mono',monospace" fontSize="7.5"
              fill={m.accent ? "rgba(255,69,0,0.28)" : "rgba(232,229,222,0.1)"}
              letterSpacing="1"
            >
              {m.period}
            </text>
          </motion.g>
        ))}

        {/* ── Architecture diagrams (right side) ────────────── */}
        {STAGES.map((stage, si) => (
          <motion.g
            key={stage.company}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + si * 0.25 }}
          >
            {/* Stage label */}
            <text
              x="562" y={stage.y0 - 14}
              fontFamily="'Space Mono',monospace" fontSize="7.5"
              fill={stage.color} letterSpacing="1.5" opacity="0.5"
            >
              {stage.label}
            </text>

            {/* Edges */}
            {stage.edges.map(([ai, bi], i) => {
              const na = stage.nodes[ai];
              const nb = stage.nodes[bi];
              if (!na || !nb) return null;
              const x1 = na.x + NODE_W / 2;
              const y1 = na.y + NODE_H / 2;
              const x2 = nb.x + NODE_W / 2;
              const y2 = nb.y + NODE_H / 2;
              return (
                <motion.line
                  key={`${stage.company}-e-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={stage.color}
                  strokeWidth="0.8"
                  opacity={0}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.25 } : {}}
                  transition={{ duration: 1.2, ease: easeOut, delay: 0.7 + si * 0.25 + i * 0.05 }}
                />
              );
            })}

            {/* Nodes */}
            {stage.nodes.map((node, ni) => (
              <motion.g
                key={`${stage.company}-${node.id}`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.75 + si * 0.25 + ni * 0.04 }}
              >
                <rect
                  x={node.x} y={node.y}
                  width={NODE_W} height={NODE_H} rx="2"
                  fill="rgba(2,4,8,0.85)"
                />
                <rect
                  x={node.x} y={node.y}
                  width={NODE_W} height={NODE_H} rx="2"
                  stroke={stage.color} strokeWidth="0.8"
                  fill="none" opacity="0.4"
                />
                <rect
                  x={node.x} y={node.y}
                  width={NODE_W} height="2" rx="1"
                  fill={stage.color} opacity="0.5"
                />
                <text
                  x={node.x + NODE_W / 2} y={node.y + 18}
                  fontFamily="'Space Mono',monospace" fontSize="7.5"
                  fill={stage.color} textAnchor="middle"
                  letterSpacing="0.8" opacity="0.75"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}

            {/* Node count indicator */}
            <text
              x="1100" y={stage.y0 + NODE_H / 2 + 4}
              fontFamily="'Space Mono',monospace" fontSize="8"
              fill={stage.color} opacity="0.3" letterSpacing="1"
            >
              {stage.nodes.length} SERVICES
            </text>
          </motion.g>
        ))}

        {/* ── Complexity growth arrow ────────────────────────── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <line
            x1="1200" y1="580" x2="1200" y2="120"
            stroke="rgba(255,69,0,0.12)" strokeWidth="1"
          />
          <polygon
            points="1200,115 1196,128 1204,128"
            fill="rgba(255,69,0,0.2)"
          />
          <text
            x="1208" y="350"
            fontFamily="'Space Mono',monospace" fontSize="7.5"
            fill="rgba(255,69,0,0.2)" letterSpacing="1.5"
            transform="rotate(90, 1208, 350)"
          >
            COMPLEXITY GROWS
          </text>
        </motion.g>

        {/* ── Bottom stat ───────────────────────────────────── */}
        <motion.text
          x="120" y="830"
          fontFamily="'Space Mono',monospace" fontSize="8"
          fill="rgba(232,229,222,0.1)" letterSpacing="1.5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          3 COMPANIES · MERN → MICROSERVICES → ENTERPRISE
        </motion.text>
      </svg>
    </div>
  );
}
