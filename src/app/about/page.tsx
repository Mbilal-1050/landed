"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Independent", body: "Self-funded, no ad-driven incentives." },
  { label: "Privacy-first", body: "Your resumes are yours. Delete anytime." },
  { label: "Built to ship", body: "Small team, fast iteration." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="grain px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs uppercase tracking-widest text-amber"
          >
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-4xl text-fog sm:text-5xl"
          >
            We built Landed because job hunting shouldn&apos;t feel like guessing.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-5 text-fog-dim leading-relaxed"
          >
            <p>
              Most job applications never reach a human. They&apos;re filtered by an applicant
              tracking system first, and that system is looking for specific language from the
              job posting — language most resumes simply don&apos;t have.
            </p>
            <p>
              Landed reads the job description the same way that filter does, checks your resume
              against it, and shows you exactly what&apos;s missing before you apply — not after
              you&apos;ve been rejected without knowing why.
            </p>
            <p>
              We&apos;re a small, independent team. No outside investors telling us to add features
              nobody asked for. Just a tool we wished existed when we were job hunting ourselves.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-line bg-surface/40 p-5"
              >
                <p className="font-display text-2xl text-fog">{s.label}</p>
                <p className="mt-1 text-sm text-fog-dim">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
