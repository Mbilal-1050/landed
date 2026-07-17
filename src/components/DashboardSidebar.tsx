"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, CreditCard, Gift, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import LogoutButton from "./LogoutButton";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/resumes", label: "Resumes", icon: FileText },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/referrals", label: "Referrals", icon: Gift },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-line bg-surface/30 px-4 py-6">
      <Link href="/" className="mb-8 px-2 font-display text-xl text-fog">
        Landed<span className="text-amber">.</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((l) => {
          const active = l.href === "/dashboard" ? pathname === "/dashboard" : pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active ? "bg-amber/15 text-amber" : "text-fog-dim hover:bg-surface-2 hover:text-fog"
              }`}
            >
              <l.icon size={16} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={toggle}
        className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fog-dim transition hover:bg-surface-2 hover:text-fog cursor-pointer"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
      <LogoutButton />
    </aside>
  );
}
