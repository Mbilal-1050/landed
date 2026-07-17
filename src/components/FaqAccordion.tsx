"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the ATS match score work?",
    a: "Landed pulls the key terms and skills out of the job description you paste in, then checks how many of those actually appear in your resume text. The score reflects how closely your resume's language mirrors what the posting is screening for.",
  },
  {
    q: "Will my resume still sound like me?",
    a: "Yes. Landed doesn't invent experience or rewrite your voice — it highlights which of the job's key terms are missing from your resume so you can decide how to add them in your own words.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Subscriptions are billed and managed through Whop, and you can cancel from your Whop account at any time. You'll keep access until the end of your current billing period.",
  },
  {
    q: "Is my resume data private?",
    a: "Your resumes are only visible to you — protected at the database level with row-level security, not just hidden in the interface. You can delete any resume, or your whole account, at any time from Settings.",
  },
  {
    q: "What happens on the free plan?",
    a: "Free accounts can create one tailored resume and run ATS match scans. Upgrading to Pro removes that limit and adds AI cover letters and full version history.",
  },
  {
    q: "Do you offer refunds?",
    a: "If something isn't working as expected, contact us within 7 days of your charge and we'll make it right.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line">
      {faqs.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
          >
            <span className="font-display text-lg text-fog">{item.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={18} className="text-fog-dim" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-fog-dim">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
