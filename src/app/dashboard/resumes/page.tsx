import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Plus, FileText } from "lucide-react";

export default async function ResumesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-fog">Your resumes</h1>
        <Link
          href="/dashboard/resumes/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft"
        >
          <Plus size={15} /> New resume
        </Link>
      </div>

      <div className="mt-6 grid gap-3">
        {resumes && resumes.length > 0 ? (
          resumes.map((r) => (
            <Link
              key={r.id}
              href={`/dashboard/resumes/${r.id}`}
              className="flex items-center justify-between rounded-xl border border-line bg-surface/40 px-5 py-4 transition hover:border-amber/40"
            >
              <div className="flex items-center gap-3">
                {r.logo_url ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-md border border-line bg-surface">
                    <Image src={r.logo_url} alt="" fill className="object-contain p-0.5" unoptimized />
                  </div>
                ) : (
                  <FileText size={16} className="text-fog-dim" />
                )}
                <div>
                  <p className="text-fog">{r.title}</p>
                  <p className="text-xs text-fog-dim">{r.target_role || "No target role set"}</p>
                </div>
              </div>
              {r.ats_score != null && (
                <span className="font-mono text-sm text-teal">{r.ats_score}% match</span>
              )}
            </Link>
          ))
        ) : (
          <Link
            href="/dashboard/resumes/new"
            className="rounded-xl border border-dashed border-line px-5 py-10 text-center text-fog-dim transition hover:border-amber/40 hover:text-fog"
          >
            No resumes yet — create your first one to get an ATS match score.
          </Link>
        )}
      </div>
    </main>
  );
}
