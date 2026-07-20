"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scoreResumeAgainstJob, type AtsResult } from "@/lib/ats";
import Link from "next/link";
import { PlayCircle, ArrowRight } from "lucide-react";

const SAMPLE_RESUME = `Marketing coordinator with 3 years of experience running email campaigns and managing social media calendars. Skilled in Canva, Mailchimp, and basic HTML. Grew Instagram following from 2k to 15k in 8 months. Comfortable working with cross-functional teams and reporting on campaign performance.`;

const SAMPLE_JOB = `We're hiring a Marketing Manager to lead our email and social strategy. You'll own email campaigns end-to-end (Klaviyo experience preferred), manage our content calendar across Instagram and TikTok, analyze campaign performance with Google Analytics, and collaborate with design and sales teams. 3+ years experience required. SEO knowledge a plus.`;

export default function LiveDemo() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB);
  const [result, setResult] = useState<AtsResult | null>(null);
  const [scanning, setScanning] = useState(false);

  function handleScan() {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(scoreResumeAgainstJob(resumeText, jobDescription));
      setScanning(false);
    }, 700);
  }

  return (
    <section id="demo" className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber">
          <PlayCircle size={14} />
          Try it live — no signup required
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 max-w-lg font-display text-3xl text-fog sm:text-4xl"
        >
          See your match score right now.
        </motion.h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-fog-dim">Resume text</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-amber/60"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-fog-dim">Job description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-amber/60"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={scanning}
              className="rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
            >
              {scanning ? "Scanning…" : "Scan match score"}
            </button>
          </div>

          <div className="rounded-2xl border border-line bg-surface/40 p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fog-dim">Match report</p>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="font-display text-5xl text-fog">{result.score}%</span>
                    <span className="text-sm text-fog-dim">match</span>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2 text-xs uppercase tracking-wide text-teal">
                      Matched ({result.matched.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matched.map((k) => (
                        <span key={k} className="rounded-full bg-teal/10 px-2.5 py-1 text-xs text-teal">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                  {result.missing.length > 0 && (
                    <div className="mb-6">
                      <p className="mb-2 text-xs uppercase tracking-wide text-coral">
                        Missing ({result.missing.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.missing.map((k) => (
                          <span key={k} className="rounded-full bg-coral/10 px-2.5 py-1 text-xs text-coral">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link
                    href="/signup"
                    className="flex items-center gap-1.5 text-sm font-medium text-amber hover:underline"
                  >
                    Create your free account to save this <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ) : (
                <p className="text-sm text-fog-dim">
                  Edit the sample text or paste your own, then hit scan to see a real, live match score.
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
