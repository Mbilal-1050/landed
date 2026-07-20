"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-line bg-ink/85 py-2" : "border-transparent bg-ink/40 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="font-display text-xl tracking-tight text-fog">
          Landed<span className="text-amber">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-fog-dim sm:flex">
          <Link href="/#how" className="transition hover:text-fog">How it works</Link>
          <Link href="/#demo" className="transition hover:text-fog">Try it live</Link>
          <Link href="/#features" className="transition hover:text-fog">Features</Link>
          <Link href="/#pricing" className="transition hover:text-fog">Pricing</Link>
          <Link href="/faq" className="transition hover:text-fog">FAQ</Link>
          <Link href="/about" className="transition hover:text-fog">About</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-fog-dim transition hover:border-amber/50 hover:text-fog cursor-pointer"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link href="/login" className="hidden text-sm text-fog-dim transition hover:text-fog sm:block">
            Log in
          </Link>
          <Link
            href="/signup"
            className="hidden rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-soft sm:block"
          >
            Get started
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-fog sm:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-line bg-ink sm:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4 text-sm text-fog-dim">
            <Link href="/#how" className="py-2">How it works</Link>
            <Link href="/#features" className="py-2">Features</Link>
            <Link href="/#pricing" className="py-2">Pricing</Link>
            <Link href="/faq" className="py-2">FAQ</Link>
            <Link href="/about" className="py-2">About</Link>
            <Link href="/login" className="py-2">Log in</Link>
            <Link href="/signup" className="mt-2 rounded-lg bg-amber px-4 py-2 text-center font-semibold text-ink">
              Get started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
