"use client";

import { useState } from "react";
import { Copy, Check, Printer } from "lucide-react";
import { getCoverLetterLayout } from "@/lib/cover-letter-templates/registry";
import { getTheme } from "@/lib/resume-templates/registry";
import { themeStyle } from "@/lib/resume-templates/themes";
import ResumePreviewFrame from "./ResumePreviewFrame";

export default function DocumentViewer({
  docType,
  content,
  templateId,
  colorTheme,
}: {
  docType: "cover_letter" | "summary";
  content: {
    cover_letter?: string;
    summary?: string;
    linkedin_about?: string;
    fullName?: string;
    company?: string;
  };
  templateId?: string;
  colorTheme?: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (docType === "cover_letter") {
    const Layout = getCoverLetterLayout(templateId ?? "classic-letter").component;
    const theme = getTheme(colorTheme ?? "amber");
    const previewData = {
      fullName: content.fullName || "Your Name",
      targetRole: "",
      company: content.company,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      body: content.cover_letter ?? "",
    };

    return (
      <div>
        <div className="mb-3 flex items-center justify-end gap-3">
          <button
            onClick={() => copy(content.cover_letter ?? "", "cl")}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
          >
            {copied === "cl" ? <Check size={13} /> : <Copy size={13} />} {copied === "cl" ? "Copied" : "Copy text"}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
          >
            <Printer size={13} /> Print / PDF
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-line shadow-lg">
          <ResumePreviewFrame>
            <div style={themeStyle(theme)}>
              <Layout data={previewData} />
            </div>
          </ResumePreviewFrame>
        </div>
        <div id="print-area" className="hidden print:block" style={themeStyle(theme)}>
          <Layout data={previewData} />
        </div>
      </div>
    );
  }

  const theme = getTheme(colorTheme ?? "amber");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6" style={{ borderColor: `${theme.accent}40`, backgroundColor: `${theme.accentSoft}20` }}>
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: theme.accent }}>Resume summary</p>
          <button
            onClick={() => copy(content.summary ?? "", "s")}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-fog cursor-pointer"
          >
            {copied === "s" ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
        <p className="text-sm text-fog">{content.summary}</p>
      </div>
      <div className="rounded-2xl border p-6" style={{ borderColor: `${theme.accent}40`, backgroundColor: `${theme.accentSoft}20` }}>
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: theme.accent }}>LinkedIn About</p>
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
