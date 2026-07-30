"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  FileText,
  LayoutTemplate,
  CreditCard,
  Gift,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/resumes", label: "Resumes", icon: FileText },
  { href: "/dashboard/resumes/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/referrals", label: "Referrals", icon: Gift },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <div className="flex h-full flex-col px-4 py-6">
      <Link href="/" className="mb-8 px-2 font-display text-xl text-fog">
        Landed<span className="text-amber">.</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {(() => {
          const matching = links.filter(
            (l) => pathname === l.href || pathname?.startsWith(l.href + "/")
          );
          const mostSpecific = matching.reduce(
            (a, b) => (b.href.length > a.href.length ? b : a),
            links[0]
          );
          return links.map((l) => {
            const active = l.href === mostSpecific.href && matching.length > 0;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active ? "bg-amber/15 text-amber" : "text-fog-dim hover:bg-surface-2 hover:text-fog"
                }`}
              >
                <l.icon size={16} />
                {l.label}
              </Link>
            );
          });
        })()}
      </nav>

      <button
        onClick={toggle}
        className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fog-dim transition hover:bg-surface-2 hover:text-fog cursor-pointer"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
      <LogoutButton />
    </div>
  );
}

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-60 shrink-0 border-r border-line bg-surface/30 md:block">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-ink/90 px-4 py-3 backdrop-blur-md md:hidden">
        <Link href="/" className="font-display text-lg text-fog">
          Landed<span className="text-amber">.</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-fog"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Mobile off-canvas drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-ink border-r border-line md:hidden"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-line text-fog-dim"
              >
                <X size={14} />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
