"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { scoreResumeAgainstJob, type AtsResult } from "@/lib/ats";

export default function ResumeForm({
  initial,
  resumeId,
}: {
  initial?: { title: string; target_role: string; resume_text: string; job_description: string };
  resumeId?: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [targetRole, setTargetRole] = useState(initial?.target_role ?? "");
  const [resumeText, setResumeText] = useState(initial?.resume_text ?? "");
  const [jobDescription, setJobDescription] = useState(initial?.job_description ?? "");
  const [result, setResult] = useState<AtsResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleScan() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Paste both your resume text and the job description to scan.");
      return;
    }
    setError(null);
    setResult(scoreResumeAgainstJob(resumeText, jobDescription));
  }

  async function handleSave() {
    setError(null);
    if (!title.trim()) {
      setError("Give this resume a title.");
      return;
    }
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      user_id: user!.id,
      title,
      target_role: targetRole,
      ats_score: result?.score ?? null,
      content: { resume_text: resumeText, job_description: jobDescription },
      updated_at: new Date().toISOString(),
    };

    const { error: dbError } = resumeId
      ? await supabase.from("resumes").update(payload).eq("id", resumeId)
      : await supabase.from("resumes").insert(payload);

    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.push("/dashboard/resumes");
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-fog-dim">Resume title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Engineer — Acme Corp"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-fog-dim">Target role</label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Your resume text</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={10}
            placeholder="Paste your resume content here..."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Job description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            placeholder="Paste the job posting you're applying to..."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>

        {error && <p className="text-sm text-coral">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={handleScan}
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-fog transition hover:border-teal/50 cursor-pointer"
          >
            Scan match score
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
          >
            {saving ? "Saving…" : resumeId ? "Save changes" : "Save resume"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fog-dim">
          Match report
        </p>
        {result ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-fog">{result.score}%</span>
              <span className="text-sm text-fog-dim">match</span>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-xs uppercase tracking-wide text-teal">
                Matched keywords ({result.matched.length})
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
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-coral">
                  Missing keywords ({result.missing.length})
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
          </motion.div>
        ) : (
          <p className="text-sm text-fog-dim">
            Paste your resume and a job description, then click &quot;Scan match score&quot; to see how well they align.
          </p>
        )}
      </div>
    </div>
  );
}
