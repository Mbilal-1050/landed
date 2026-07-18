"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Check, Copy } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CoverLetterWizard() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [company, setCompany] = useState("");
  const [background, setBackground] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, targetRole, company, background, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setLetter(data.cover_letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!letter) return;
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: dbError } = await supabase.from("resumes").insert({
      user_id: user!.id,
      title: `Cover letter — ${targetRole}${company ? ` at ${company}` : ""}`,
      target_role: targetRole,
      doc_type: "cover_letter",
      content: { cover_letter: letter, job_description: jobDescription },
    });

    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.push("/dashboard/resumes");
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-fog-dim">Your name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-amber/60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-fog-dim">Company (optional)</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-amber/60"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Target role *</label>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Product Marketing Manager"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Your background *</label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            rows={6}
            placeholder="A few sentences on your relevant experience and strengths..."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Job description *</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            placeholder="Paste the job posting..."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={!targetRole || !background || !jobDescription || generating}
          className="flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-40 cursor-pointer"
        >
          <Sparkles size={15} /> {generating ? "Writing…" : "Generate cover letter"}
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-fog-dim">Draft</p>
          {letter && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(letter);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
        {letter ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="whitespace-pre-line text-sm leading-relaxed text-fog">{letter}</p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-6 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving…" : "Save to my documents"}
            </button>
          </motion.div>
        ) : (
          <p className="text-sm text-fog-dim">
            Fill in the details and generate — your cover letter will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
