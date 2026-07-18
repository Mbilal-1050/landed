"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Check, Copy } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SummaryWizard() {
  const router = useRouter();
  const supabase = createClient();

  const [targetRole, setTargetRole] = useState("");
  const [background, setBackground] = useState("");
  const [tone, setTone] = useState("confident and concise");

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ summary: string; linkedin_about: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, background, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data);
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

    const { error: dbError } = await supabase.from("resumes").insert({
      user_id: user!.id,
      title: `Summary — ${targetRole}`,
      target_role: targetRole,
      doc_type: "summary",
      content: result,
    });

    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.push("/dashboard/resumes");
    router.refresh();
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Target role *</label>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. UX Researcher"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Your background *</label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            rows={7}
            placeholder="Years of experience, key skills, notable achievements..."
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-fog-dim">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-amber/60"
          >
            <option>confident and concise</option>
            <option>warm and personable</option>
            <option>formal and executive</option>
            <option>bold and results-driven</option>
          </select>
        </div>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={!targetRole || !background || generating}
          className="flex items-center gap-1.5 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-40 cursor-pointer"
        >
          <Sparkles size={15} /> {generating ? "Writing…" : "Generate summary"}
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fog-dim">Result</p>
        {result ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-fog-dim">Resume summary</p>
                <button onClick={() => copy(result.summary, "s")} className="text-fog-dim hover:text-fog cursor-pointer">
                  {copied === "s" ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
              <p className="text-sm text-fog">{result.summary}</p>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-fog-dim">LinkedIn About</p>
                <button onClick={() => copy(result.linkedin_about, "l")} className="text-fog-dim hover:text-fog cursor-pointer">
                  {copied === "l" ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
              <p className="text-sm text-fog">{result.linkedin_about}</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving…" : "Save to my documents"}
            </button>
          </motion.div>
        ) : (
          <p className="text-sm text-fog-dim">Fill in the details and generate to see your summary here.</p>
        )}
      </div>
    </div>
  );
}
