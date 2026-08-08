import Link from "next/link";
import { LogoFull } from "./Logo";
import { XIcon, LinkedInIcon, YouTubeIcon, InstagramIcon } from "./BrandIcons";
import NewsletterForm from "./NewsletterForm";
import { CATEGORIES } from "@/lib/resume-templates/registry";

const SOCIALS: { icon: (props: { size?: number }) => React.JSX.Element; href: string; label: string }[] = [
  { icon: XIcon, href: "https://x.com/officiallanded", label: "X (Twitter)" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/muhammad-bilal-623982426", label: "LinkedIn" },
  { icon: YouTubeIcon, href: "https://youtube.com/@landedofficial.online", label: "YouTube" },
  { icon: InstagramIcon, href: "https://www.instagram.com/landedofficial.online?igsh=YzFwazF5M2l6Z21p", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex">
              <LogoFull size={22} />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-fog-dim">
              Resumes tailored to the exact job you&apos;re applying to, scored before you send them.
            </p>
            {SOCIALS.length > 0 && (
              <div className="mt-5 flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-8 w-8 place-items-center rounded-full border border-line text-fog-dim transition hover:border-amber/50 hover:text-amber"
                  >
                    <s.icon size={14} />
                  </a>
                ))}
              </div>
            )}
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
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fog">Templates</p>
            <ul className="space-y-2 text-sm text-fog-dim">
              <li><Link href="/templates" className="hover:text-fog">All templates</Link></li>
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link href={`/templates?category=${encodeURIComponent(c)}`} className="hover:text-fog">
                    {c}
                  </Link>
                </li>
              ))}
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
