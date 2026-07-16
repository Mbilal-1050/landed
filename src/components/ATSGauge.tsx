"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function ATSGauge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);
  const target = 92;
  const radius = 84;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div ref={ref} className="relative mx-auto flex h-56 w-56 items-center justify-center">
      <svg width="224" height="224" viewBox="0 0 224 224" className="-rotate-90">
        <circle
          cx="112"
          cy="112"
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="10"
        />
        <motion.circle
          cx="112"
          cy="112"
          r={radius}
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? offset : circumference }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-4xl font-medium text-fog">{display}%</span>
        <span className="mt-1 text-xs uppercase tracking-widest text-fog-dim">match score</span>
      </div>
    </div>
  );
}
