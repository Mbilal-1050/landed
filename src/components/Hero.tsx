"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ATSGauge from "./ATSGauge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-fog-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            built for the bots that read you first
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl leading-[1.08] text-fog sm:text-5xl lg:text-6xl"
          >
            Your resume,
            <br />
            <span className="italic text-amber">cleared for takeoff.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-fog-dim"
          >
            Most resumes die inside an applicant tracking system before a
            human ever sees them. Landed rewrites yours against the exact
            job description, scores the match, and hands you a cover letter
            to go with it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex items-center gap-4"
          >
            <Link
              href="/signup"
              className="rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-soft"
            >
              Build your first resume — free
            </Link>
            <a href="#how" className="text-sm text-fog-dim transition hover:text-fog">
              See how it works ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="runway-line mt-14 h-[2px] w-full origin-left"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl border border-line bg-surface/40 p-8"
        >
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-fog-dim">
            Live scan against job posting
          </p>
          <ATSGauge />
          <div className="mt-6 space-y-2 font-mono text-xs text-fog-dim">
            <div className="flex justify-between">
              <span>Keywords matched</span>
              <span className="text-teal">18 / 20</span>
            </div>
            <div className="flex justify-between">
              <span>Formatting</span>
              <span className="text-teal">passes</span>
            </div>
            <div className="flex justify-between">
              <span>Missing skills flagged</span>
              <span className="text-coral">2</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
