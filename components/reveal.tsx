"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

/** Fades + lifts its children into view once, on scroll. */
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: easeExpo, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type RevealTag = "div" | "h1" | "h2" | "h3" | "p" | "span";

/** Wipes its children up from behind a clipping mask once, on scroll. */
export function RevealText({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Rendered element for the animated inner node — use "h1" for page headings. */
  as?: RevealTag;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const MotionTag = motion[as] as React.ElementType;
  return (
    <div ref={ref} className="overflow-hidden">
      <MotionTag
        initial={{ y: "105%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.55, ease: easeExpo, delay }}
        className={className}
      >
        {children}
      </MotionTag>
    </div>
  );
}
