import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Eye, Download, FileText } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: resumes } = await supabase
    .from("resumes")
    .select("id, title, doc_type")
    .eq("user_id", user!.id);

  const { data: events } = await supabase
    .from("resume_events")
    .select("resume_id, event_type")
    .eq("user_id", user!.id);

  const totalViews = events?.filter((e) => e.event_type === "view").length ?? 0;
  const totalDownloads = events?.filter((e) => e.event_type === "download").length ?? 0;

  const perResume = (resumes ?? []).map((r) => ({
    ...r,
    views: events?.filter((e) => e.resume_id === r.id && e.event_type === "view").length ?? 0,
    downloads: events?.filter((e) => e.resume_id === r.id && e.event_type === "download").length ?? 0,
  }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <h1 className="mb-2 font-display text-3xl text-fog">Analytics</h1>
      <p className="mb-8 text-fog-dim">Views and downloads across all your documents.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="text-xs uppercase tracking-wide text-fog-dim">Documents</p>
          <p className="mt-2 font-display text-2xl text-fog">{resumes?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-fog-dim"><Eye size={12} /> Total views</p>
          <p className="mt-2 font-display text-2xl text-fog">{totalViews}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-fog-dim"><Download size={12} /> Total downloads</p>
          <p className="mt-2 font-display text-2xl text-teal">{totalDownloads}</p>
        </div>
      </div>

      <h2 className="mt-10 mb-4 font-display text-xl text-fog">By document</h2>
      <div className="space-y-2">
        {perResume.length > 0 ? (
          perResume.map((r) => (
            <Link
              key={r.id}
              href={`/dashboard/resumes/${r.id}`}
              className="flex items-center justify-between rounded-xl border border-line bg-surface/40 px-5 py-4 transition hover:border-amber/40"
            >
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-fog-dim" />
                <span className="text-fog">{r.title}</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-fog-dim">
                <span className="flex items-center gap-1"><Eye size={12} /> {r.views}</span>
                <span className="flex items-center gap-1"><Download size={12} /> {r.downloads}</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-fog-dim">No documents yet.</p>
        )}
      </div>
    </main>
  );
}
