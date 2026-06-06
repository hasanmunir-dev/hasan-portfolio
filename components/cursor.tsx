"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 28, stiffness: 700, mass: 0.5 };
  const ringConfig  = { damping: 30, stiffness: 180, mass: 0.8 };

  const dotXS  = useSpring(dotX, springConfig);
  const dotYS  = useSpring(dotY, springConfig);
  const ringXS = useSpring(dotX, ringConfig);
  const ringYS = useSpring(dotY, ringConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest(
        "a, button, [data-hover], .btn-accent, .btn-outline, .nav-link"
      );
      setHovering(!!isHoverable);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: dotXS,
          y: dotYS,
          translateX: "-50%",
          translateY: "-50%",
          scale: hovering ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
      <motion.div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
        style={{
          x: ringXS,
          y: ringYS,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  );
}
