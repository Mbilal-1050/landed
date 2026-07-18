"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function DocumentViewer({
  docType,
  content,
}: {
  docType: "cover_letter" | "summary";
  content: { cover_letter?: string; summary?: string; linkedin_about?: string };
}) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (docType === "cover_letter") {
    return (
      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-fog-dim">Cover letter</p>
          <button
            onClick={() => copy(content.cover_letter ?? "", "cl")}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
          >
            {copied === "cl" ? <Check size={13} /> : <Copy size={13} />} {copied === "cl" ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed text-fog">{content.cover_letter}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-fog-dim">Resume summary</p>
          <button
            onClick={() => copy(content.summary ?? "", "s")}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
          >
            {copied === "s" ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
        <p className="text-sm text-fog">{content.summary}</p>
      </div>
      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-fog-dim">LinkedIn About</p>
          <button
            onClick={() => copy(content.linkedin_about ?? "", "l")}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
          >
            {copied === "l" ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
        <p className="text-sm text-fog">{content.linkedin_about}</p>
      </div>
    </div>
  );
}
