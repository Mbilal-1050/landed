"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Trash2, Sparkles, Printer, Save, Palette } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { scoreResumeAgainstJob } from "@/lib/ats";
import { getLayout, getTheme } from "@/lib/resume-templates/registry";
import { themeStyle } from "@/lib/resume-templates/themes";
import type { ResumeData, ResumeExperience, ResumeEducation } from "@/lib/resume-templates/types";
import LogoUpload from "./LogoUpload";

const EMPTY_DATA: ResumeData = {
  fullName: "",
  targetRole: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  photoUrl: null,
  summary: "",
  experience: [],
  education: [],
  skills: [],
};

export default function ResumeBuilder({
  resumeId,
  initialData,
  initialTemplateId = "modern-minimal",
  initialThemeId = "amber",
  initialTitle = "",
  aiAvailable = true,
}: {
  resumeId?: string;
  initialData?: ResumeData;
  initialTemplateId?: string;
  initialThemeId?: string;
  initialTitle?: string;
  aiAvailable?: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(initialTitle);
  const [data, setData] = useState<ResumeData>(initialData ?? EMPTY_DATA);
  const [templateId] = useState(initialTemplateId);
  const [themeId] = useState(initialThemeId);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const [aiOpen, setAiOpen] = useState(!initialData && aiAvailable);
  const [workHistoryDraft, setWorkHistoryDraft] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const Layout = getLayout(templateId).component;
  const theme = getTheme(themeId);

  function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function addExperience() {
    update("experience", [...data.experience, { title: "", company: "", dates: "", bullets: [""] } as ResumeExperience]);
  }
  function updateExperience(i: number, patch: Partial<ResumeExperience>) {
    const next = [...data.experience];
    next[i] = { ...next[i], ...patch };
    update("experience", next);
  }
  function removeExperience(i: number) {
    update("experience", data.experience.filter((_, idx) => idx !== i));
  }

  function addEducation() {
    update("education", [...data.education, { school: "", degree: "", dates: "" } as ResumeEducation]);
  }
  function updateEducation(i: number, patch: Partial<ResumeEducation>) {
    const next = [...data.education];
    next[i] = { ...next[i], ...patch };
    update("education", next);
  }
  function removeEducation(i: number) {
    update("education", data.education.filter((_, idx) => idx !== i));
  }

  async function handleAiFill() {
    setError(null);
    if (!data.targetRole || !workHistoryDraft || !jobDescription) {
      setError("Fill in target role, work history, and the job description first.");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          targetRole: data.targetRole,
          workHistory: workHistoryDraft,
          skills: data.skills.join(", "),
          education: data.education.map((e) => `${e.degree}, ${e.school}, ${e.dates}`).join("; "),
          jobDescription,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Generation failed");

      setData((prev) => ({
        ...prev,
        summary: result.summary ?? prev.summary,
        experience: Array.isArray(result.experience) && result.experience.length > 0 ? result.experience : prev.experience,
        education: Array.isArray(result.education) && result.education.length > 0 ? result.education : prev.education,
        skills: Array.isArray(result.skills) && result.skills.length > 0 ? result.skills : prev.skills,
      }));
      setAiOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  function resumeTextForScoring() {
    return [
      data.summary,
      ...data.experience.flatMap((e) => [`${e.title} ${e.company}`, ...e.bullets]),
      data.skills.join(" "),
      ...data.education.map((e) => `${e.degree} ${e.school}`),
    ].join("\n");
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

    const atsScore = jobDescription.trim()
      ? scoreResumeAgainstJob(resumeTextForScoring(), jobDescription).score
      : null;

    const payload = {
      user_id: user!.id,
      title,
      target_role: data.targetRole,
      doc_type: "resume",
      template_id: templateId,
      color_theme: themeId,
      logo_url: logoUrl,
      ats_score: atsScore,
      content: { ...data, job_description: jobDescription },
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
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Resume title (for your dashboard)</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Product Manager — Acme Corp"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>

        <div className="rounded-xl border border-line bg-surface/30 p-4">
          <button
            onClick={() => aiAvailable && setAiOpen((v) => !v)}
            disabled={!aiAvailable}
            className="flex w-full items-center justify-between text-sm font-medium text-fog disabled:opacity-60 cursor-pointer"
          >
            <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-amber" /> Let AI draft this for you</span>
            <span className="text-xs text-fog-dim">
              {!aiAvailable ? "Pro feature" : aiOpen ? "Hide" : "Show"}
            </span>
          </button>
          {!aiAvailable && (
            <p className="mt-2 text-xs text-fog-dim">
              Upgrade to a paid plan to have AI draft your summary and experience bullets. You can still fill everything in manually below — free, no limit.
            </p>
          )}
          {aiAvailable && aiOpen && (
            <div className="mt-4 space-y-3">
              <textarea
                value={workHistoryDraft}
                onChange={(e) => setWorkHistoryDraft(e.target.value)}
                rows={4}
                placeholder="Paste your rough work history — jobs, dates, what you did..."
                className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
              />
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                placeholder="Paste the job description you're targeting..."
                className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
              />
              <button
                onClick={handleAiFill}
                disabled={generating}
                className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-50 cursor-pointer"
              >
                <Sparkles size={14} /> {generating ? "Drafting…" : "Fill in with AI"}
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Full name" className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />
          <input value={data.targetRole} onChange={(e) => update("targetRole", e.target.value)} placeholder="Target role" className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />
          <input value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />
          <input value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone" className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />
          <input value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="Location" className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />
          <input value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="LinkedIn URL" className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />
        </div>

        <textarea value={data.summary} onChange={(e) => update("summary", e.target.value)} rows={3} placeholder="Professional summary" className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60" />

        <LogoUpload value={logoUrl} onChange={setLogoUrl} />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-fog-dim">Experience</p>
            <button onClick={addExperience} className="flex items-center gap-1 text-xs text-amber cursor-pointer"><Plus size={13} /> Add job</button>
          </div>
          <div className="space-y-3">
            {data.experience.map((exp, i) => (
              <div key={i} className="rounded-lg border border-line bg-surface/30 p-3">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="grid flex-1 gap-2 sm:grid-cols-3">
                    <input value={exp.title} onChange={(e) => updateExperience(i, { title: e.target.value })} placeholder="Job title" className="rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none" />
                    <input value={exp.company} onChange={(e) => updateExperience(i, { company: e.target.value })} placeholder="Company" className="rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none" />
                    <input value={exp.dates} onChange={(e) => updateExperience(i, { dates: e.target.value })} placeholder="Dates" className="rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none" />
                  </div>
                  <button onClick={() => removeExperience(i)} className="text-fog-dim hover:text-coral cursor-pointer"><Trash2 size={14} /></button>
                </div>
                <textarea
                  value={exp.bullets.join("\n")}
                  onChange={(e) => updateExperience(i, { bullets: e.target.value.split("\n") })}
                  rows={3}
                  placeholder="One bullet point per line"
                  className="w-full rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-fog-dim">Education</p>
            <button onClick={addEducation} className="flex items-center gap-1 text-xs text-amber cursor-pointer"><Plus size={13} /> Add school</button>
          </div>
          <div className="space-y-2">
            {data.education.map((edu, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-surface/30 p-2">
                <input value={edu.degree} onChange={(e) => updateEducation(i, { degree: e.target.value })} placeholder="Degree" className="flex-1 rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none" />
                <input value={edu.school} onChange={(e) => updateEducation(i, { school: e.target.value })} placeholder="School" className="flex-1 rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none" />
                <input value={edu.dates} onChange={(e) => updateEducation(i, { dates: e.target.value })} placeholder="Dates" className="w-20 rounded border border-line bg-surface px-2 py-1.5 text-xs outline-none" />
                <button onClick={() => removeEducation(i)} className="text-fog-dim hover:text-coral cursor-pointer"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Skills (comma separated)</label>
          <input
            value={data.skills.join(", ")}
            onChange={(e) => update("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            placeholder="Figma, SQL, Project management..."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>

        {error && <p className="text-sm text-coral">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer">
            <Save size={15} /> {saving ? "Saving…" : "Save resume"}
          </button>
          <Link href="/dashboard/resumes/templates" className="flex items-center gap-1.5 rounded-lg border border-line px-5 py-2.5 text-sm text-fog transition hover:border-amber/50">
            <Palette size={15} /> Change template
          </Link>
        </div>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-fog-dim">Live preview — {getLayout(templateId).name}</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-line shadow-lg">
          <div className="max-h-[70vh] overflow-y-auto">
            <div style={themeStyle(theme)}>
              <Layout data={data} />
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => window.print()}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line px-5 py-2.5 text-sm text-fog transition hover:border-amber/50 cursor-pointer"
        >
          <Printer size={15} /> Preview print / Save as PDF
        </motion.button>
      </div>

      {/* Hidden print target — only this renders when printing */}
      <div id="print-area" className="hidden print:block" style={themeStyle(theme)}>
        <Layout data={data} />
      </div>
    </div>
  );
}
