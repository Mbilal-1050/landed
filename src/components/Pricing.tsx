"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import LaunchBanner from "./LaunchBanner";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    href: "/signup",
    cta: "Start free",
    highlight: false,
    features: [
      "1 tailored resume",
      "ATS match scoring",
      "Basic formatting check",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    href: process.env.NEXT_PUBLIC_WHOP_PRO_LINK || "https://whop.com/checkout/plan_I8fEhVrzXnOTh",
    cta: "Get Pro",
    highlight: true,
    features: [
      "60 AI generations / month",
      "Resumes, cover letters & summaries",
      "ATS match scoring",
      "Version history",
    ],
  },
  {
    name: "Business",
    price: "$49",
    period: "/ month",
    href: process.env.NEXT_PUBLIC_WHOP_BUSINESS_LINK || "https://whop.com/checkout/plan_iQOhmvBoNNNI2",
    cta: "Get Business",
    highlight: false,
    features: [
      "200 AI generations / month",
      "5 team seats",
      "Shared resume library",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs uppercase tracking-widest text-amber"
        >
          Fares
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-lg font-display text-3xl text-fog sm:text-4xl"
        >
          Pick a plan. Cancel anytime.
        </motion.h2>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-fog-dim">
          <ShieldCheck size={15} className="text-teal" />
          7-day money-back guarantee — full refund, no questions asked.
        </p>

        <div className="mt-10">
          <LaunchBanner />
        </div>

        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative rounded-2xl border p-8 ${
                p.highlight
                  ? "border-amber bg-surface/60 shadow-[0_0_0_1px_var(--color-amber)]"
                  : "border-line bg-surface/30"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-amber px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
                  Most booked
                </span>
              )}
              <h3 className="font-display text-xl text-fog">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl text-fog">{p.price}</span>
                <span className="text-sm text-fog-dim">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fog-dim">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                className={`mt-8 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-amber text-ink hover:bg-amber-soft"
                    : "border border-line text-fog hover:border-amber/50"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-fog-dim">
          Payments handled securely by Whop. <span className="text-teal">7-day money-back guarantee</span> on every paid plan — no questions asked.
        </p>
        <p className="mx-auto mt-3 max-w-md text-center text-xs text-fog-dim">
          <strong className="text-fog">What&apos;s an &quot;AI generation&quot;?</strong> Each time AI drafts or rewrites a resume, cover letter, or summary counts as one generation. Editing your own text afterward doesn&apos;t use any — only new AI drafts do.
        </p>
      </div>
    </section>
  );
}
