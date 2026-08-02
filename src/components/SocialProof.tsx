"use client";

import { motion } from "framer-motion";
import { Sparkles, ScanSearch } from "lucide-react";

const items = [
  { type: "stat" as const, value: "80+", label: "resume templates" },
  { type: "feature" as const, icon: Sparkles, label: "AI-tailored in minutes" },
  { type: "feature" as const, icon: ScanSearch, label: "Real-time ATS scoring" },
];

export default function SocialProof() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-line bg-surface/40 p-6 text-center"
            >
              {item.type === "stat" ? (
                <p className="font-display text-4xl text-amber">{item.value}</p>
              ) : (
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-amber/10 text-amber">
                  <item.icon size={18} />
                </div>
              )}
              <p className="mt-2 text-sm text-fog-dim">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
