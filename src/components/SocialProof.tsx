"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "80+", label: "resume templates" },
  { value: "92%", label: "avg. ATS match score" },
  { value: "3 min", label: "avg. time to tailor a resume" },
];

export default function SocialProof() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-line bg-surface/40 p-6 text-center"
            >
              <p className="font-display text-4xl text-amber">{s.value}</p>
              <p className="mt-1 text-sm text-fog-dim">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
