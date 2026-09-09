"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Lightweight animated background: drifting aurora blobs + a parallaxed grid.
 * Pure CSS transforms — no canvas, no 3D — so it stays cheap to render.
 */
export function Backdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <div className="backdrop" aria-hidden>
      <motion.div style={{ y: reduce ? 0 : auroraY }} className="absolute inset-0">
        <div className="backdrop__aurora backdrop__a1" />
        <div className="backdrop__aurora backdrop__a2" />
        <div className="backdrop__aurora backdrop__a3" />
      </motion.div>
      <motion.div style={{ y: reduce ? 0 : gridY }} className="backdrop__grid" />
      <div className="backdrop__vignette" />
    </div>
  );
}
