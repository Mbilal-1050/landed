import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-xl text-fog">
              Landed<span className="text-amber">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-fog-dim">
              Resumes tailored to the exact job you&apos;re applying to, scored before you send them.
            </p>
            <div className="mt-5">
              <p className="mb-2 text-xs text-fog-dim">Get product updates</p>
              <NewsletterForm />
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fog">Product</p>
            <ul className="space-y-2 text-sm text-fog-dim">
              <li><Link href="/#how" className="hover:text-fog">How it works</Link></li>
              <li><Link href="/#features" className="hover:text-fog">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-fog">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-fog">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fog">Company</p>
            <ul className="space-y-2 text-sm text-fog-dim">
              <li><Link href="/about" className="hover:text-fog">About</Link></li>
              <li><Link href="/contact" className="hover:text-fog">Contact</Link></li>
              <li><Link href="/login" className="hover:text-fog">Log in</Link></li>
              <li><Link href="/signup" className="hover:text-fog">Sign up</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fog">Legal</p>
            <ul className="space-y-2 text-sm text-fog-dim">
              <li><Link href="/legal/terms" className="hover:text-fog">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-fog">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-fog-dim">© {new Date().getFullYear()} Landed. All rights reserved.</p>
          <p className="text-xs text-fog-dim">Payments securely processed by Whop.</p>
        </div>
      </div>
    </footer>
  );
}
