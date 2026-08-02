"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Rewrote my resume against a job posting in about five minutes and finally got a callback after weeks of silence.",
    name: "Priya S.",
    role: "Operations Manager",
  },
  {
    quote: "The match score showed me exactly which keywords were missing. Small changes, real difference in responses.",
    name: "Marcus W.",
    role: "UX Designer",
  },
  {
    quote: "Cover letter and resume matched the same job in one sitting. Cut my application time in half.",
    name: "Sam O.",
    role: "Backend Engineer",
  },
];

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

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-2xl border border-line bg-surface/40 p-6"
            >
              <div className="mb-3 flex gap-0.5 text-amber">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-fog-dim">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-fog">{t.name}</p>
              <p className="text-xs text-fog-dim">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
