"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Paste the job posting",
    body: "Drop in the job description or a link. Landed reads what the employer is actually screening for.",
  },
  {
    n: "02",
    title: "Upload your background",
    body: "Bring an existing resume or start from LinkedIn. Nothing to reformat by hand.",
  },
  {
    n: "03",
    title: "Get a scored, tailored draft",
    body: "See your match score, the gaps it found, and a rewritten resume plus cover letter ready to send.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs uppercase tracking-widest text-amber"
        >
          Boarding process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-lg font-display text-3xl text-fog sm:text-4xl"
        >
          Three steps between you and an interview.
        </motion.h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative rounded-2xl border border-line bg-surface/30 p-6"
            >
              <span className="font-mono text-sm text-fog-dim">{s.n}</span>
              <h3 className="mt-3 font-display text-xl text-fog">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-dim">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
