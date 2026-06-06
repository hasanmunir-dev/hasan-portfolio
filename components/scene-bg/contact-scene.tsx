"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

/*
  Contact Request Pipeline
  Visualizes the engineering behind a contact form submission:
  USER → HTTPS → API GATEWAY → SERVER → SMTP → EMAIL DELIVERED

  Spans full viewport width.
*/

const PIPELINE_NODES = [
  { id: "user",    label: "YOU",          sub: "Browser Client",   x: 140,  y: 380, color: "#FF4500" },
  { id: "https",   label: "HTTPS",        sub: "TLS 1.3",          x: 360,  y: 380, color: "#FF6020" },
  { id: "apigw",   label: "API GATEWAY",  sub: "Rate Limit · Auth",x: 600,  y: 380, color: "#FF6020" },
  { id: "server",  label: "SERVER",       sub: "Node.js · Express",x: 840,  y: 380, color: "#4060FF" },
  { id: "smtp",    label: "SMTP",         sub: "Email Service",    x: 1080, y: 380, color: "#FFB040" },
  { id: "inbox",   label: "INBOX",        sub: "hasanmunir406@",   x: 1300, y: 380, color: "#40C080" },
];

const NODE_W = 120;
const NODE_H = 56;

// Decorative data flow labels along the pipes
const PIPE_LABELS = [
  { x: 250,  y: 355, label: "POST /contact" },
  { x: 480,  y: 355, label: "JSON payload"  },
  { x: 720,  y: 355, label: "validate + log" },
  { x: 960,  y: 355, label: "send email"    },
  { x: 1190, y: 355, label: "delivered"     },
];

export function ContactScene() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="ambient-fire" />
      <div className="ambient-blue" />

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
          MESSAGE DELIVERY PIPELINE
        </motion.text>

        {/* ── Horizontal pipeline backbone ──────────────────── */}
        <motion.line
          x1="140" y1="380" x2="1300" y2="380"
          stroke="rgba(255,255,255,0.04)" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: easeOut, delay: 0.3 }}
        />

        {/* ── Animated flow line ────────────────────────────── */}
        <motion.line
          x1="140" y1="380" x2="1300" y2="380"
          stroke="rgba(255,69,0,0.18)"
          strokeWidth="1.5"
          strokeDasharray="8 14"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: easeOut, delay: 0.8 }}
          className="scene-dash-move"
        />

        {/* ── Pipe labels (request labels) ──────────────────── */}
        {PIPE_LABELS.map((pl, i) => (
          <motion.text
            key={pl.label}
            x={pl.x} y={pl.y}
            fontFamily="'Space Mono',monospace" fontSize="7"
            fill="rgba(232,229,222,0.18)" textAnchor="middle"
            letterSpacing="0.8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
          >
            {pl.label}
          </motion.text>
        ))}

        {/* ── Pipeline nodes ────────────────────────────────── */}
        {PIPELINE_NODES.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.35 + i * 0.13 }}
          >
            {/* Connection dot on pipeline */}
            <circle cx={node.x} cy={380} r="4"
              fill={node.color} opacity="0.7"
            />
            {/* Vertical connector */}
            <line
              x1={node.x} y1={380}
              x2={node.x} y2={node.y + NODE_H / 2 + 10}
              stroke={node.color} strokeWidth="1" opacity="0.3"
            />
            {/* Node box */}
            <rect
              x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
              width={NODE_W} height={NODE_H} rx="2"
              fill="rgba(2,4,8,0.88)"
            />
            <rect
              x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
              width={NODE_W} height={NODE_H} rx="2"
              stroke={node.color} strokeWidth="0.8"
              fill="none" opacity="0.5"
            />
            {/* Top accent bar */}
            <rect
              x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
              width={NODE_W} height="2.5" rx="1"
              fill={node.color} opacity="0.6"
            />
            {/* Label */}
            <text x={node.x} y={node.y - 5}
              fontFamily="'Space Mono',monospace" fontSize="9"
              fill={node.color} textAnchor="middle"
              letterSpacing="1" opacity="0.85"
            >
              {node.label}
            </text>
            {/* Sublabel */}
            <text x={node.x} y={node.y + 11}
              fontFamily="'Space Mono',monospace" fontSize="6.5"
              fill="rgba(232,229,222,0.25)" textAnchor="middle"
              letterSpacing="0.5"
            >
              {node.sub}
            </text>
          </motion.g>
        ))}

        {/* ── Vertical dimension lines ──────────────────────── */}
        {[200, 500, 750].map((y) => (
          <line key={y} x1="40" y1={y} x2="1400" y2={y}
            stroke="rgba(255,255,255,0.02)" strokeWidth="1"
            strokeDasharray="3 12"
          />
        ))}

        {/* ── Response flow (bottom) ────────────────────────── */}
        <motion.text
          x="720" y="580"
          fontFamily="'Space Mono',monospace" fontSize="7.5"
          fill="rgba(64,192,128,0.25)" textAnchor="middle" letterSpacing="1.5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          200 OK · MESSAGE RECEIVED
        </motion.text>

        {/* ── Corner brackets ───────────────────────────────── */}
        <path d="M20 64 L20 20 L64 20" stroke="rgba(255,69,0,0.1)" strokeWidth="1"/>
        <path d="M1376 20 L1420 20 L1420 64" stroke="rgba(255,69,0,0.1)" strokeWidth="1"/>
        <path d="M20 836 L20 880 L64 880" stroke="rgba(255,69,0,0.1)" strokeWidth="1"/>
        <path d="M1376 880 L1420 880 L1420 836" stroke="rgba(255,69,0,0.1)" strokeWidth="1"/>
      </svg>
    </div>
  );
}
