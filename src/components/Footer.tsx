import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/" className="font-display text-lg text-fog">
          Landed<span className="text-amber">.</span>
        </Link>
        <p className="text-xs text-fog-dim">© {new Date().getFullYear()} Landed. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-fog-dim">
          <a href="#pricing" className="hover:text-fog">Pricing</a>
          <Link href="/login" className="hover:text-fog">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
