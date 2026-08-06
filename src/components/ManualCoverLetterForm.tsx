"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileEdit, Printer } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { COVER_LETTER_LAYOUTS, getCoverLetterLayout } from "@/lib/cover-letter-templates/registry";
import { COLOR_THEMES, themeStyle } from "@/lib/resume-templates/themes";
import { getTheme } from "@/lib/resume-templates/registry";
import ResumePreviewFrame from "./ResumePreviewFrame";

export default function ManualCoverLetterForm() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [company, setCompany] = useState("");
  const [body, setBody] = useState("");
  const [templateId, setTemplateId] = useState("classic-letter");
  const [themeId, setThemeId] = useState("amber");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const Layout = getCoverLetterLayout(templateId).component;
  const theme = getTheme(themeId);

  const previewData = {
    fullName: fullName || "Your Name",
    targetRole: targetRole || "Target Role",
    company,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    body: body || "Paste your cover letter text here to see it formatted in this template...",
  };

  async function handleSave() {
    setError(null);
    if (!body.trim()) {
      setError("Paste your cover letter text first.");
      return;
    }
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: dbError } = await supabase.from("resumes").insert({
      user_id: user!.id,
      title: `Cover letter — ${targetRole || "Untitled"}${company ? ` at ${company}` : ""}`,
      target_role: targetRole,
      doc_type: "cover_letter",
      template_id: templateId,
      color_theme: themeId,
      content: { cover_letter: body, fullName, company },
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
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        <input
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Target role"
          className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          placeholder="Paste your own cover letter text here — we'll format it into a polished template."
          className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />

        <div className="rounded-xl border border-line bg-surface/30 p-4">
          <p className="mb-2 text-xs text-fog-dim">Template</p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {COVER_LETTER_LAYOUTS.map((l) => (
              <button
                key={l.id}
                onClick={() => setTemplateId(l.id)}
                className={`rounded-full px-3 py-1 text-xs transition cursor-pointer ${
                  templateId === l.id ? "bg-amber text-ink font-semibold" : "border border-line text-fog-dim"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
          <p className="mb-2 text-xs text-fog-dim">Color</p>
          <div className="flex gap-2">
            {COLOR_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`h-6 w-6 rounded-full border-2 cursor-pointer ${themeId === t.id ? "border-fog" : "border-transparent"}`}
                style={{ backgroundColor: t.accent }}
                aria-label={t.name}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-coral">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
          >
            <FileEdit size={15} /> {saving ? "Saving…" : "Save to my documents"}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-line px-5 py-2.5 text-sm text-fog transition hover:border-amber/50 cursor-pointer"
          >
            <Printer size={15} /> Download PDF
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wide text-fog-dim">Live preview</p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-xl border border-line shadow-lg">
          <ResumePreviewFrame>
            <div style={themeStyle(theme)}>
              <Layout data={previewData} />
            </div>
          </ResumePreviewFrame>
        </motion.div>
      </div>

      <div id="print-area" className="hidden print:block" style={themeStyle(theme)}>
        <Layout data={previewData} />
      </div>
    </div>
  );
}
