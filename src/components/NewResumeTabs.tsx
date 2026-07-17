"use client";

import { useState } from "react";
import { Sparkles, FileEdit } from "lucide-react";
import AiResumeWizard from "./AiResumeWizard";
import ResumeForm from "./ResumeForm";

export default function NewResumeTabs() {
  const [mode, setMode] = useState<"ai" | "manual">("ai");

  return (
    <div>
      <div className="mb-8 inline-flex rounded-lg border border-line p-1">
        <button
          onClick={() => setMode("ai")}
          className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm transition cursor-pointer ${
            mode === "ai" ? "bg-amber text-ink font-semibold" : "text-fog-dim hover:text-fog"
          }`}
        >
          <Sparkles size={14} /> Build with AI
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm transition cursor-pointer ${
            mode === "manual" ? "bg-amber text-ink font-semibold" : "text-fog-dim hover:text-fog"
          }`}
        >
          <FileEdit size={14} /> Paste manually
        </button>
      </div>

      {mode === "ai" ? <AiResumeWizard /> : <ResumeForm />}
    </div>
  );
}
