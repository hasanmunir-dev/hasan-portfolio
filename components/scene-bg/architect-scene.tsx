"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

/* Draws an animated connecting line between two points */
function ConnLine({
  x1, y1, x2, y2,
  inView,
  delay = 0,
  opacity = "rgba(232,229,222,0.09)",
}: {
  x1: number; y1: number; x2: number; y2: number;
  inView: boolean; delay?: number; opacity?: string;
}) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={opacity}
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 1.4, ease: easeOut, delay }}
    />
  );
}

/* Service box with label */
function ServiceBox({
  x, y, w, h, label, sub, inView, delay = 0, accent = false,
}: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string;
  inView: boolean; delay?: number; accent?: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      <rect
        x={x} y={y} width={w} height={h}
        stroke={accent ? "rgba(255,69,0,0.2)" : "rgba(232,229,222,0.1)"}
        strokeWidth="1"
        fill={accent ? "rgba(255,69,0,0.03)" : "rgba(232,229,222,0.02)"}
      />
      <text
        x={x + w / 2} y={y + h / 2 - (sub ? 6 : 0)}
        fontFamily="'Space Mono',monospace"
        fontSize="9"
        fill={accent ? "rgba(255,69,0,0.55)" : "rgba(232,229,222,0.35)"}
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="1.2"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2} y={y + h / 2 + 10}
          fontFamily="'Space Mono',monospace"
          fontSize="7"
          fill="rgba(232,229,222,0.18)"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="1"
        >
          {sub}
        </text>
      )}
    </motion.g>
  );
}

/* Database cylinder shape */
function DbShape({
  x, y, w, h, label, inView, delay = 0,
}: {
  x: number; y: number; w: number; h: number;
  label: string; inView: boolean; delay?: number;
}) {
  const rx = w / 2;
  const ry = 8;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      {/* Body */}
      <rect x={x} y={y + ry} width={w} height={h - ry} fill="rgba(232,229,222,0.02)" stroke="rgba(232,229,222,0.1)" strokeWidth="1"/>
      {/* Top ellipse */}
      <ellipse cx={x + rx} cy={y + ry} rx={rx} ry={ry} fill="rgba(232,229,222,0.04)" stroke="rgba(232,229,222,0.12)" strokeWidth="1"/>
      {/* Bottom ellipse arc */}
      <path
        d={`M ${x},${y + h} a ${rx},${ry} 0 0 0 ${w},0`}
        fill="none"
        stroke="rgba(232,229,222,0.08)"
        strokeWidth="1"
      />
      <text
        x={x + rx} y={y + h / 2 + ry / 2}
        fontFamily="'Space Mono',monospace"
        fontSize="8"
        fill="rgba(232,229,222,0.3)"
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="1"
      >
        {label}
      </text>
    </motion.g>
  );
}

/* Arrow tip */
function Arrow({ x, y, dir }: { x: number; y: number; dir: "down" | "right" | "left" }) {
  const d =
    dir === "down"  ? `M${x-4},${y-6} L${x},${y} L${x+4},${y-6}` :
    dir === "right" ? `M${x-6},${y-4} L${x},${y} L${x-6},${y+4}` :
                     `M${x+6},${y-4} L${x},${y} L${x+6},${y+4}`;
  return <path d={d} stroke="rgba(232,229,222,0.14)" strokeWidth="1" fill="none"/>;
}

export function ArchitectScene() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div className="scene-layer" aria-hidden="true">
      <div className="ambient-blue" />
      <div className="ambient-tr" />

      {/*
        Architecture positioned right-center (x: 700-1400, y: 60-640)
        Opacity kept very low so content reads clearly.

        Layout:
          CLIENT APP (1040-1220, 60-104)
               |
          API GATEWAY (860-1260, 164-208)
           /        |        \
         AUTH   CORE SVC   NOTIFIER
        (860-1010,268-312) (1060-1210,268-312) (1260-1390,268-312)
           |        |           |
        REDIS  POSTGRES      MONGO
        (860-990,400-460) (1060-1210,400-460) (1260-1390,400-460)
               |
             QUEUE
            (960-1110,520-560)
      */}
      <svg
        ref={ref}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* ── SECTION LABEL ── */}
        <motion.text
          x="720" y="60"
          fontFamily="'Space Mono',monospace"
          fontSize="9"
          fill="rgba(232,229,222,0.1)"
          textAnchor="middle"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          SYSTEM ARCHITECTURE
        </motion.text>

        {/* ── SERVICE NODES ── */}
        <ServiceBox x={1040} y={80} w={180} h={44} label="CLIENT APP" sub="BROWSER · MOBILE" inView={inView} delay={0.1} accent/>
        <ServiceBox x={860} y={178} w={400} h={44} label="API GATEWAY" sub="ROUTING · AUTH · RATE LIMIT" inView={inView} delay={0.3}/>
        <ServiceBox x={856} y={278} w={148} h={44} label="AUTH SVC" inView={inView} delay={0.5}/>
        <ServiceBox x={1055} y={278} w={150} h={44} label="CORE API" inView={inView} delay={0.55}/>
        <ServiceBox x={1258} y={278} w={142} h={44} label="NOTIFIER" inView={inView} delay={0.6}/>

        {/* ── DATABASE NODES ── */}
        <DbShape x={856} y={390} w={130} h={56} label="REDIS" inView={inView} delay={0.75}/>
        <DbShape x={1048} y={390} w={162} h={56} label="POSTGRES" inView={inView} delay={0.8}/>
        <DbShape x={1258} y={390} w={142} h={56} label="MONGO" inView={inView} delay={0.85}/>
        <ServiceBox x={950} y={500} w={158} h={40} label="EVENT QUEUE" inView={inView} delay={0.9}/>

        {/* ── CONNECTIONS ── */}
        {/* CLIENT → API GATEWAY */}
        <ConnLine x1={1130} y1={124} x2={1060} y2={178} inView={inView} delay={0.35}/>
        <Arrow x={1063} y={178} dir="down"/>
        {/* API GATEWAY → AUTH */}
        <ConnLine x1={930} y1={222} x2={930} y2={278} inView={inView} delay={0.55}/>
        <Arrow x={930} y={278} dir="down"/>
        {/* API GATEWAY → CORE */}
        <ConnLine x1={1130} y1={222} x2={1130} y2={278} inView={inView} delay={0.6}/>
        <Arrow x={1130} y={278} dir="down"/>
        {/* API GATEWAY → NOTIFIER */}
        <ConnLine x1={1260} y1={222} x2={1330} y2={278} inView={inView} delay={0.65}/>
        <Arrow x={1327} y={278} dir="down"/>
        {/* AUTH → REDIS */}
        <ConnLine x1={921} y1={322} x2={921} y2={390} inView={inView} delay={0.8}/>
        <Arrow x={921} y={390} dir="down"/>
        {/* CORE → POSTGRES */}
        <ConnLine x1={1130} y1={322} x2={1130} y2={390} inView={inView} delay={0.85}/>
        <Arrow x={1130} y={390} dir="down"/>
        {/* NOTIFIER → MONGO */}
        <ConnLine x1={1330} y1={322} x2={1330} y2={390} inView={inView} delay={0.9}/>
        <Arrow x={1330} y={390} dir="down"/>
        {/* CORE → QUEUE */}
        <ConnLine x1={1130} y1={446} x2={1029} y2={500} inView={inView} delay={0.95}/>

        {/* ── DECORATIVE OUTER FRAME ── */}
        <motion.rect
          x={830} y={50} width={600} height={530}
          stroke="rgba(232,229,222,0.04)"
          strokeWidth="1"
          strokeDasharray="6 8"
          fill="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.text
          x={832} y={44}
          fontFamily="'Space Mono',monospace"
          fontSize="8"
          fill="rgba(255,69,0,0.2)"
          letterSpacing="1.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          PRODUCTION ENVIRONMENT
        </motion.text>

        {/* ── CORNER BRACKETS ON FRAME ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <path d="M830 80 L830 50 L860 50" stroke="rgba(255,69,0,0.15)" strokeWidth="1"/>
          <path d="M1400 50 L1430 50 L1430 80" stroke="rgba(255,69,0,0.15)" strokeWidth="1"/>
          <path d="M830 550 L830 580 L860 580" stroke="rgba(255,69,0,0.15)" strokeWidth="1"/>
          <path d="M1400 580 L1430 580 L1430 550" stroke="rgba(255,69,0,0.15)" strokeWidth="1"/>
        </motion.g>

        {/* ── SIDE LABELS ── */}
        <motion.text
          x="800" y="300"
          fontFamily="'Space Mono',monospace"
          fontSize="8"
          fill="rgba(232,229,222,0.12)"
          textAnchor="middle"
          letterSpacing="1"
          transform="rotate(-90, 800, 300)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          SERVICES LAYER
        </motion.text>
        <motion.text
          x="800" y="430"
          fontFamily="'Space Mono',monospace"
          fontSize="8"
          fill="rgba(232,229,222,0.1)"
          textAnchor="middle"
          letterSpacing="1"
          transform="rotate(-90, 800, 430)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          PERSISTENCE LAYER
        </motion.text>
      </svg>
    </div>
  );
}
