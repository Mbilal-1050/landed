"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles } from "lucide-react";

export default function LaunchBanner() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText("LAUNCH50");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-amber/30 bg-amber/5 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber/15 text-amber">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-fog">Launch week — 50% off your first payment</p>
          <p className="text-xs text-fog-dim">Use code at checkout · New customers only</p>
        </div>
      </div>
      <button
        onClick={copy}
        className="flex shrink-0 items-center gap-2 rounded-lg border border-amber/40 bg-ink px-4 py-2 font-mono text-sm text-amber transition hover:bg-amber/10 cursor-pointer"
      >
        LAUNCH50 {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </motion.div>
  );
}
