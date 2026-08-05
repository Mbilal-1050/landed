"use client";

import { useState } from "react";
import { Sparkles, FileEdit } from "lucide-react";
import CoverLetterWizard from "./CoverLetterWizard";
import ManualCoverLetterForm from "./ManualCoverLetterForm";
import AiComingSoon from "./AiComingSoon";
import AiUpgradeRequired from "./AiUpgradeRequired";

export default function NewCoverLetterTabs({
  aiAvailable = true,
  aiConfigured = true,
  isTrialing = false,
}: {
  aiAvailable?: boolean;
  aiConfigured?: boolean;
  isTrialing?: boolean;
}) {
  const [mode, setMode] = useState<"ai" | "manual">(aiAvailable ? "ai" : "manual");

  function renderAiPane() {
    if (!aiConfigured) return <AiComingSoon tool="cover letter writer" />;
    if (!aiAvailable) return <AiUpgradeRequired tool="cover letter writer" isTrialing={isTrialing} />;
    return <CoverLetterWizard />;
  }

  return (
    <div>
      <div className="mb-8 inline-flex rounded-lg border border-line p-1">
        <button
          onClick={() => setMode("ai")}
          className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm transition cursor-pointer ${
            mode === "ai" ? "bg-amber text-ink font-semibold" : "text-fog-dim hover:text-fog"
          }`}
        >
          <Sparkles size={14} /> Write with AI
          {!aiAvailable && (
            <span className="ml-1 rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] text-fog-dim">
              {aiConfigured ? "pro" : "soon"}
            </span>
          )}
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm transition cursor-pointer ${
            mode === "manual" ? "bg-amber text-ink font-semibold" : "text-fog-dim hover:text-fog"
          }`}
        >
          <FileEdit size={14} /> Paste my own & format
        </button>
      </div>

      {mode === "ai" ? renderAiPane() : <ManualCoverLetterForm />}
    </div>
  );
}
