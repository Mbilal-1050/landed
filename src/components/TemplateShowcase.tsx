"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TEMPLATE_VARIANTS } from "@/lib/resume-templates/registry";
import { getTheme } from "@/lib/resume-templates/registry";
import { themeStyle } from "@/lib/resume-templates/themes";
import { SAMPLE_PROFILES } from "@/lib/resume-templates/types";

// Pick one representative variant per layout for a clean 8-up showcase
const FEATURED_KEYS = [
  "modern-minimal__amber",
  "ats-professional__navy",
  "two-column-sidebar__teal",
  "creative-colorful__coral",
  "executive-classic__slate",
  "tech-developer__amber",
  "academic__navy",
  "entry-level__teal",
];

export default function TemplateShowcase() {
  const featured = FEATURED_KEYS.map((k) => TEMPLATE_VARIANTS.find((v) => v.key === k)).filter(
    (v): v is NonNullable<typeof v> => Boolean(v)
  );

  return (
    <section id="templates" className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-amber">Templates</p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 max-w-lg font-display text-3xl text-fog sm:text-4xl"
            >
              Choose from 80 professional designs.
            </motion.h2>
          </div>
          <Link
            href="/templates"
            className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm text-fog transition hover:border-amber/50 shrink-0"
          >
            View all templates <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featured.map((v, i) => {
            const Comp = v.component;
            const theme = getTheme(v.themeId);
            return (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={`/templates?category=${encodeURIComponent(v.category)}`}
                  className="block overflow-hidden rounded-xl border border-line bg-white transition hover:border-amber/40"
                >
                  <div className="relative h-40 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 origin-top-left"
                      style={{ ...themeStyle(theme), width: "816px", height: "1056px", transform: "scale(0.196)" }}
                    >
                      <Comp data={SAMPLE_PROFILES[v.category]} />
                    </div>
                  </div>
                </Link>
                <p className="mt-2 text-center text-xs text-fog-dim">{v.layoutName}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
