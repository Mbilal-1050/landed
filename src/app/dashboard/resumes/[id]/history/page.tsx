import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, History as HistoryIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import RestoreVersionButton from "@/components/RestoreVersionButton";
import type { ResumeData } from "@/lib/resume-templates/types";

export default async function ResumeHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: resume } = await supabase
    .from("resumes")
    .select("id, title")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!resume) notFound();

  const { data: versions } = await supabase
    .from("resume_versions")
    .select("*")
    .eq("resume_id", id)
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
      <Link href={`/dashboard/resumes/${id}`} className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back to resume
      </Link>
      <h1 className="mb-2 flex items-center gap-2 font-display text-3xl text-fog">
        <HistoryIcon size={22} className="text-amber" /> Version history
      </h1>
      <p className="mb-8 text-fog-dim">Every save creates a snapshot. Restore any earlier version.</p>

      <div className="space-y-3">
        {versions && versions.length > 0 ? (
          versions.map((v, i) => (
            <div key={v.id} className="rounded-xl border border-line bg-surface/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-fog">{v.title}</p>
                  <p className="text-xs text-fog-dim">
                    {new Date(v.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    {i === 0 && <span className="ml-2 rounded-full bg-teal/10 px-2 py-0.5 text-teal">Latest</span>}
                  </p>
                </div>
                {i !== 0 && (
                  <RestoreVersionButton resumeId={resume.id} content={v.content as ResumeData} title={v.title} />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-fog-dim">No saved versions yet — save this resume to start building history.</p>
        )}
      </div>
    </main>
  );
}
