"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { scoreResumeAgainstJob } from "@/lib/ats";
import LogoUpload from "./LogoUpload";

interface Intake {
  fullName: string;
  targetRole: string;
  yearsExperience: string;
  workHistory: string;
  skills: string;
  achievements: string;
  education: string;
  jobDescription: string;
}

interface AiOutput {
  summary: string;
  experience_bullets: string[];
  skills_section: string[];
  cover_letter: string;
  resume_text: string;
}

const steps = ["Basics", "Background", "Target job", "Result"];

export default function AiResumeWizard() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [intake, setIntake] = useState<Intake>({
    fullName: "",
    targetRole: "",
    yearsExperience: "",
    workHistory: "",
    skills: "",
    achievements: "",
    education: "",
    jobDescription: "",
  });
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiOutput | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof Intake>(key: K, value: Intake[K]) {
    setIntake((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intake),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const atsResult = scoreResumeAgainstJob(result.resume_text, intake.jobDescription);

    const { error: dbError } = await supabase.from("resumes").insert({
      user_id: user!.id,
      title: `${intake.targetRole} — ${intake.fullName || "Untitled"}`,
      target_role: intake.targetRole,
      ats_score: atsResult.score,
      logo_url: logoUrl,
      content: {
        resume_text: result.resume_text,
        job_description: intake.jobDescription,
        summary: result.summary,
        experience_bullets: result.experience_bullets,
        skills_section: result.skills_section,
        cover_letter: result.cover_letter,
      },
    });

    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.push("/dashboard/resumes");
    router.refresh();
  }

  const canNext =
    (step === 0 && intake.targetRole.trim()) ||
    (step === 1 && intake.workHistory.trim()) ||
    step === 2;

  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
      {step < 3 && (
        <div className="mb-8 flex items-center gap-2">
          {steps.slice(0, 3).map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-amber" : "bg-line"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
            <div className="mb-6 flex items-center gap-2 text-amber">
              <Sparkles size={16} />
              <span className="font-mono text-xs uppercase tracking-widest">Step 1 · Basics</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-fog-dim">Your name</label>
                <input
                  value={intake.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs text-fog-dim">Target role *</label>
                  <input
                    value={intake.targetRole}
                    onChange={(e) => update("targetRole", e.target.value)}
                    placeholder="e.g. Product Designer"
                    className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-fog-dim">Years of experience</label>
                  <input
                    value={intake.yearsExperience}
                    onChange={(e) => update("yearsExperience", e.target.value)}
                    placeholder="e.g. 4"
                    className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
            <div className="mb-6 flex items-center gap-2 text-amber">
              <Sparkles size={16} />
              <span className="font-mono text-xs uppercase tracking-widest">Step 2 · Background</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-fog-dim">Work history *</label>
                <textarea
                  value={intake.workHistory}
                  onChange={(e) => update("workHistory", e.target.value)}
                  rows={5}
                  placeholder="List your roles: company, title, dates, and what you did. e.g. Acme Inc, Marketing Associate, 2022-2024: ran email campaigns, managed social calendar..."
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-fog-dim">Skills</label>
                <textarea
                  value={intake.skills}
                  onChange={(e) => update("skills", e.target.value)}
                  rows={2}
                  placeholder="e.g. Figma, SQL, project management, Spanish (fluent)"
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-fog-dim">Key achievements</label>
                <textarea
                  value={intake.achievements}
                  onChange={(e) => update("achievements", e.target.value)}
                  rows={2}
                  placeholder="e.g. Grew newsletter from 2k to 20k subscribers"
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-fog-dim">Education</label>
                <input
                  value={intake.education}
                  onChange={(e) => update("education", e.target.value)}
                  placeholder="e.g. BA Communications, XYZ University, 2021"
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
            <div className="mb-6 flex items-center gap-2 text-amber">
              <Sparkles size={16} />
              <span className="font-mono text-xs uppercase tracking-widest">Step 3 · Target job</span>
            </div>
            <label className="mb-1.5 block text-xs text-fog-dim">Paste the job description *</label>
            <textarea
              value={intake.jobDescription}
              onChange={(e) => update("jobDescription", e.target.value)}
              rows={10}
              placeholder="Paste the full job posting here..."
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
            />
            {error && <p className="mt-3 text-sm text-coral">{error}</p>}
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="mb-6 flex items-center gap-2 text-teal">
              <Check size={16} />
              <span className="font-mono text-xs uppercase tracking-widest">Ready to save</span>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1.5 text-xs uppercase tracking-wide text-fog-dim">Summary</p>
                <p className="text-sm text-fog">{result.summary}</p>
              </div>
              <div>
                <p className="mb-1.5 text-xs uppercase tracking-wide text-fog-dim">Experience</p>
                <ul className="list-disc space-y-1 pl-4 text-sm text-fog">
                  {result.experience_bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-xs uppercase tracking-wide text-fog-dim">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.skills_section.map((s) => (
                    <span key={s} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-fog">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs uppercase tracking-wide text-fog-dim">Cover letter</p>
                <p className="whitespace-pre-line text-sm text-fog-dim">{result.cover_letter}</p>
              </div>

              <LogoUpload value={logoUrl} onChange={setLogoUrl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        {step > 0 && step < 3 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog cursor-pointer"
          >
            <ArrowLeft size={15} /> Back
          </button>
        ) : (
          <span />
        )}

        {step < 2 && (
          <button
            onClick={() => canNext && setStep((s) => s + 1)}
            disabled={!canNext}
            className="flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-40 cursor-pointer"
          >
            Next <ArrowRight size={15} />
          </button>
        )}
        {step === 2 && (
          <button
            onClick={handleGenerate}
            disabled={!intake.jobDescription.trim() || generating}
            className="flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-40 cursor-pointer"
          >
            <Sparkles size={15} />
            {generating ? "Generating…" : "Generate with AI"}
          </button>
        )}
        {step === 3 && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="ml-auto rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
          >
            {saving ? "Saving…" : "Save resume"}
          </button>
        )}
      </div>
    </div>
  );
}
