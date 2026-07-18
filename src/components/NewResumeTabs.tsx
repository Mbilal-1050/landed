"use client";

import { useState } from "react";
import { Sparkles, FileEdit } from "lucide-react";
import AiResumeWizard from "./AiResumeWizard";
import ResumeForm from "./ResumeForm";
import AiComingSoon from "./AiComingSoon";

export default function NewResumeTabs({ aiAvailable = true }: { aiAvailable?: boolean }) {
  const [mode, setMode] = useState<"ai" | "manual">(aiAvailable ? "ai" : "manual");

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
          {!aiAvailable && (
            <span className="ml-1 rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] text-fog-dim">
              soon
            </span>
          )}
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

      {mode === "ai" ? aiAvailable ? <AiResumeWizard /> : <AiComingSoon tool="resume builder" /> : <ResumeForm />}
    </div>
  );
}
