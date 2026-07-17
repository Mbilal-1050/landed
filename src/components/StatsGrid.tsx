"use client";

import { motion } from "framer-motion";

export default function StatsGrid({
  stats,
}: {
  stats: { label: string; value: string; color?: string }[];
}) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ y: -2 }}
          className="rounded-xl border border-line bg-surface/40 p-5"
        >
          <p className="text-xs uppercase tracking-wide text-fog-dim">{s.label}</p>
          <p className={`mt-2 font-display text-2xl ${s.color ?? "text-fog"}`}>{s.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
