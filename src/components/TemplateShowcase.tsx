"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LAYOUTS } from "@/lib/resume-templates/registry";
import { COLOR_THEMES, themeStyle } from "@/lib/resume-templates/themes";
import { SAMPLE_PROFILES } from "@/lib/resume-templates/types";

// One card per layout (all 16), cycling through color themes for variety —
// gives an honest, scrollable sense of the full range without claiming
// to show all 80 color combinations individually.
const SHOWCASE_ITEMS = LAYOUTS.map((layout, i) => ({
  layout,
  theme: COLOR_THEMES[i % COLOR_THEMES.length],
}));

export default function TemplateShowcase() {
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
              16 signature styles. 80 combinations with color themes.
            </motion.h2>
            <p className="mt-2 max-w-lg text-sm text-fog-dim">
              Scroll to preview every style — each one also comes in 5 color themes.
            </p>
          </div>
          <Link
            href="/templates"
            className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm text-fog transition hover:border-amber/50 shrink-0"
          >
            View all 80 templates <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 [scrollbar-width:thin]">
          {SHOWCASE_ITEMS.map(({ layout, theme }, i) => {
            const Comp = layout.component;
            return (
              <motion.div
                key={layout.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.4 }}
                className="w-40 shrink-0 snap-start sm:w-48"
              >
                <Link
                  href={`/templates?category=${encodeURIComponent(layout.category)}`}
                  className="block overflow-hidden rounded-xl border border-line bg-white transition hover:border-amber/40"
                >
                  <div className="relative h-48 overflow-hidden sm:h-56">
                    <div
                      className="absolute left-0 top-0 origin-top-left"
                      style={{ ...themeStyle(theme), width: "816px", height: "1056px", transform: "scale(0.235)" }}
                    >
                      <Comp data={SAMPLE_PROFILES[layout.category]} />
                    </div>
                  </div>
                </Link>
                <p className="mt-2 text-center text-xs text-fog-dim">{layout.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
