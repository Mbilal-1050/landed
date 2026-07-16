"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="font-display text-xl tracking-tight text-fog">
          Landed<span className="text-amber">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-fog-dim sm:flex">
          <a href="#how" className="transition hover:text-fog">How it works</a>
          <a href="#features" className="transition hover:text-fog">Features</a>
          <a href="#pricing" className="transition hover:text-fog">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-fog-dim transition hover:text-fog">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-soft"
          >
            Get started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
