"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

/*
  Professional Achievement Network
  Certificates and badges as nodes in a credential network.
  Spans full viewport width for even coverage.
*/

const CERT_NODES = [
  { id: "aws",      label: "AWS",         sub: "Certified",          x: 260,  y: 220, r: 52, tier: "cert"  },
  { id: "meta-fe",  label: "META",        sub: "Front-End Dev",      x: 720,  y: 180, r: 52, tier: "cert"  },
  { id: "meta-be",  label: "META",        sub: "Back-End Dev",       x: 1180, y: 220, r: 52, tier: "cert"  },
];

const BADGE_NODES = [
  { id: "b1", label: "SYSTEM DESIGN",  x: 160,  y: 480, tier: "badge" },
  { id: "b2", label: "REST APIs",      x: 400,  y: 560, tier: "badge" },
  { id: "b3", label: "FULL-STACK",     x: 640,  y: 480, tier: "badge" },
  { id: "b4", label: "NODE.JS",        x: 880,  y: 560, tier: "badge" },
  { id: "b5", label: "REACT",          x: 1100, y: 480, tier: "badge" },
  { id: "b6", label: "PYTHON",         x: 1300, y: 560, tier: "badge" },
];

// Connections from certs to badges
const EDGES: [string, string][] = [
  ["aws",     "b1"],
  ["aws",     "b2"],
  ["meta-fe", "b3"],
  ["meta-fe", "b5"],
  ["meta-be", "b4"],
  ["meta-be", "b6"],
  ["b1",      "b3"],
  ["b2",      "b4"],
  ["b3",      "b5"],
];

const CERT_COLOR = "#FF4500";
const BADGE_COLOR = "#4060FF";
const BADGE_W = 120;
const BADGE_H = 32;

// Position lookup
const POS_MAP = new Map<string, { x: number; y: number }>();
CERT_NODES.forEach((n)  => POS_MAP.set(n.id, { x: n.x, y: n.y }));
BADGE_NODES.forEach((n) => POS_MAP.set(n.id, { x: n.x, y: n.y }));

export function CertScene() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="ambient-fire" />
      <div className="ambient-tl" />

      <svg
        ref={ref}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* ── Header ────────────────────────────────────────── */}
        <motion.text
          x="40" y="50"
          fontFamily="'Space Mono',monospace" fontSize="8"
          fill="rgba(255,69,0,0.3)" letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          PROFESSIONAL ACHIEVEMENT NETWORK
        </motion.text>

        {/* ── Full-width baseline ───────────────────────────── */}
        <motion.line
          x1="40" y1="650" x2="1400" y2="650"
          stroke="rgba(255,69,0,0.06)" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: easeOut, delay: 0.2 }}
        />

        {/* ── Tier labels ───────────────────────────────────── */}
        <motion.text
          x="40" y="200"
          fontFamily="'Space Mono',monospace" fontSize="7"
          fill="rgba(255,69,0,0.35)" letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          CERTIFICATIONS
        </motion.text>
        <motion.text
          x="40" y="500"
          fontFamily="'Space Mono',monospace" fontSize="7"
          fill="rgba(64,96,255,0.35)" letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          COMPETENCIES
        </motion.text>

        {/* ── Edges ─────────────────────────────────────────── */}
        {EDGES.map(([a, b], i) => {
          const pa = POS_MAP.get(a)!;
          const pb = POS_MAP.get(b)!;
          return (
            <motion.line
              key={`e-${a}-${b}`}
              x1={pa.x} y1={pa.y}
              x2={pb.x} y2={pb.y}
              stroke="rgba(255,69,0,0.15)"
              strokeWidth="1"
              strokeDasharray="3 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, ease: easeOut, delay: 0.5 + i * 0.08 }}
            />
          );
        })}

        {/* ── Certificate nodes (circles) ───────────────────── */}
        {CERT_NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.3 + i * 0.15 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Outer glow ring */}
            <motion.circle
              cx={node.x} cy={node.y} r={node.r + 8}
              stroke={CERT_COLOR} strokeWidth="0.5"
              fill="none" opacity={0}
              animate={inView ? { opacity: [0, 0.12, 0.06, 0.12] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
            {/* Main circle */}
            <circle cx={node.x} cy={node.y} r={node.r}
              fill="rgba(2,4,8,0.88)"
              stroke={CERT_COLOR} strokeWidth="1" opacity="0.6"
            />
            {/* Inner ring */}
            <circle cx={node.x} cy={node.y} r={node.r - 10}
              stroke={CERT_COLOR} strokeWidth="0.5"
              fill="none" opacity="0.25" strokeDasharray="4 4"
            />
            {/* Label */}
            <text x={node.x} y={node.y - 8}
              fontFamily="'Bebas Neue',sans-serif" fontSize="16"
              fill={CERT_COLOR} textAnchor="middle" letterSpacing="2"
              opacity="0.7"
            >
              {node.label}
            </text>
            <text x={node.x} y={node.y + 10}
              fontFamily="'Space Mono',monospace" fontSize="7"
              fill="rgba(232,229,222,0.35)" textAnchor="middle" letterSpacing="0.8"
            >
              {node.sub}
            </text>
            {/* Star notch marks */}
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = node.x + Math.cos(rad) * (node.r - 4);
              const y1 = node.y + Math.sin(rad) * (node.r - 4);
              const x2 = node.x + Math.cos(rad) * node.r;
              const y2 = node.y + Math.sin(rad) * node.r;
              return (
                <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={CERT_COLOR} strokeWidth="1.5" opacity="0.5"
                />
              );
            })}
          </motion.g>
        ))}

        {/* ── Badge nodes (rectangles) ──────────────────────── */}
        {BADGE_NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.6 + i * 0.09 }}
          >
            <rect
              x={node.x - BADGE_W / 2} y={node.y - BADGE_H / 2}
              width={BADGE_W} height={BADGE_H} rx="2"
              fill="rgba(2,4,8,0.85)"
            />
            <rect
              x={node.x - BADGE_W / 2} y={node.y - BADGE_H / 2}
              width={BADGE_W} height={BADGE_H} rx="2"
              stroke={BADGE_COLOR} strokeWidth="0.8"
              fill="none" opacity="0.45"
            />
            <rect
              x={node.x - BADGE_W / 2} y={node.y - BADGE_H / 2}
              width="3" height={BADGE_H} rx="1"
              fill={BADGE_COLOR} opacity="0.55"
            />
            <text x={node.x + 4} y={node.y + 4}
              fontFamily="'Space Mono',monospace" fontSize="8"
              fill={BADGE_COLOR} textAnchor="middle"
              letterSpacing="0.8" opacity="0.7"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* ── Corner brackets ───────────────────────────────── */}
        <path d="M20 64 L20 20 L64 20" stroke="rgba(255,69,0,0.1)" strokeWidth="1"/>
        <path d="M1376 20 L1420 20 L1420 64" stroke="rgba(255,69,0,0.1)" strokeWidth="1"/>
      </svg>
    </div>
  );
}
