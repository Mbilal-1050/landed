"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Check } from "lucide-react";
import { TEMPLATE_VARIANTS, CATEGORIES, getTheme } from "@/lib/resume-templates/registry";
import { themeStyle } from "@/lib/resume-templates/themes";
import { SAMPLE_RESUME_DATA } from "@/lib/resume-templates/types";

export default function TemplateGallery({
  onSelect,
  selectedKey,
}: {
  onSelect?: (layoutId: string, themeId: string) => void;
  selectedKey?: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = TEMPLATE_VARIANTS.filter((v) => {
    const matchesCategory = category === "All" || v.category === category;
    const matchesQuery =
      query.trim() === "" ||
      v.layoutName.toLowerCase().includes(query.toLowerCase()) ||
      v.themeName.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function handlePick(layoutId: string, themeId: string) {
    if (onSelect) {
      onSelect(layoutId, themeId);
    } else {
      router.push(`/dashboard/resumes/new/resume?template=${layoutId}&theme=${themeId}`);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fog-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="w-full rounded-lg border border-line bg-surface py-2 pl-8 pr-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-xs transition cursor-pointer ${
                category === c ? "bg-amber text-ink font-semibold" : "border border-line text-fog-dim hover:text-fog"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs text-fog-dim">{filtered.length} templates</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((v) => {
          const Comp = v.component;
          const theme = getTheme(v.themeId);
          const isSelected = selectedKey === v.key;
          return (
            <motion.button
              key={v.key}
              onClick={() => handlePick(v.layoutId, v.themeId)}
              whileHover={{ y: -3 }}
              className={`group overflow-hidden rounded-xl border bg-surface/40 text-left transition ${
                isSelected ? "border-amber ring-1 ring-amber" : "border-line hover:border-amber/40"
              }`}
            >
              <div className="relative h-40 overflow-hidden bg-white">
                <div
                  className="absolute left-0 top-0 origin-top-left"
                  style={{ ...themeStyle(theme), width: "816px", height: "1056px", transform: "scale(0.196)" }}
                >
                  <Comp data={SAMPLE_RESUME_DATA} />
                </div>
                {isSelected && (
                  <div className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-amber text-ink">
                    <Check size={13} />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-fog">{v.layoutName}</p>
                <p className="text-[11px] text-fog-dim">{v.themeName} theme</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
