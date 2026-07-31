"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScanSearch, Sparkles, FileText, Mail, AlignLeft } from "lucide-react";
import ATSGauge from "./ATSGauge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pt-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-amber/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-teal/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-fog-dim"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-teal"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
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
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            scale: { duration: 0.8, delay: 0.3 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="relative rounded-2xl border border-line bg-surface/40 p-8 shadow-[0_0_60px_-15px_rgba(232,163,61,0.15)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -left-6 -top-4 hidden items-center gap-1.5 rounded-full border border-line bg-ink px-3 py-1.5 font-mono text-[10px] text-teal shadow-lg sm:flex"
          >
            ✓ keywords matched
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -right-4 top-1/3 hidden rounded-full border border-line bg-ink px-3 py-1.5 font-mono text-[10px] text-amber shadow-lg sm:block"
          >
            real-time scoring
          </motion.div>

          <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-fog-dim">
            Live scan against job posting
          </p>
          <ATSGauge />
          <div className="mt-6 space-y-2 font-mono text-xs text-fog-dim">
            {[
              { label: "Keywords matched", value: "18 / 20", color: "text-teal" },
              { label: "Formatting", value: "passes", color: "text-teal" },
              { label: "Missing skills flagged", value: "2", color: "text-coral" },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.15 }}
                className="flex justify-between"
              >
                <span>{row.label}</span>
                <span className={row.color}>{row.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-5"
      >
        {[
          { icon: ScanSearch, label: "ATS Optimized" },
          { icon: Sparkles, label: "AI Powered" },
          { icon: FileText, label: "Resume Builder" },
          { icon: Mail, label: "Cover Letters" },
          { icon: AlignLeft, label: "Professional Summaries" },
        ].map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-2 text-center">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-line text-amber">
              <f.icon size={16} />
            </div>
            <span className="text-xs text-fog-dim">{f.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

