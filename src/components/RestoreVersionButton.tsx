"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ResumeData } from "@/lib/resume-templates/types";

export default function RestoreVersionButton({
  resumeId,
  content,
  title,
}: {
  resumeId: string;
  content: ResumeData;
  title: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [restoring, setRestoring] = useState(false);

  async function handleRestore() {
    setRestoring(true);
    await supabase.from("resumes").update({ content, title, updated_at: new Date().toISOString() }).eq("id", resumeId);
    setRestoring(false);
    router.push(`/dashboard/resumes/${resumeId}`);
    router.refresh();
  }

  return (
    <button
      onClick={handleRestore}
      disabled={restoring}
      className="rounded-lg border border-line px-3 py-1.5 text-xs text-fog transition hover:border-amber/50 disabled:opacity-60 cursor-pointer"
    >
      {restoring ? "Restoring…" : "Restore this version"}
    </button>
  );
}
