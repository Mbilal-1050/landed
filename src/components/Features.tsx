"use client";

import { motion } from "framer-motion";
import { ScanSearch, FileEdit, Mail, History } from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "ATS match scoring",
    body: "Every edit updates your score in real time, so you know exactly what's still missing before you apply.",
  },
  {
    icon: FileEdit,
    title: "Role-specific rewrites",
    body: "Bullet points restated in the employer's own language, without inventing experience you don't have.",
  },
  {
    icon: Mail,
    title: "Matching cover letters",
    body: "Generated from the same job posting and your actual resume, not a generic template.",
  },
  {
    icon: History,
    title: "Version history",
    body: "Keep a tailored copy for every application. Nothing overwrites the resume you sent last week.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs uppercase tracking-widest text-amber"
        >
          What&apos;s on board
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-lg font-display text-3xl text-fog sm:text-4xl"
        >
          Everything a job search actually needs.
        </motion.h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-ink p-8"
            >
              <f.icon className="h-6 w-6 text-teal" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg text-fog">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-dim">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
