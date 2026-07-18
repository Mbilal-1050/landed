import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import StatsGrid from "@/components/StatsGrid";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false })
    .limit(5);

  const isPaid = profile?.subscription_status === "active";
  const avgScore =
    resumes && resumes.length > 0
      ? Math.round(
          resumes.reduce((sum, r) => sum + (r.ats_score ?? 0), 0) /
            resumes.filter((r) => r.ats_score != null).length || 0
        )
      : 0;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-fog">
            Welcome, {profile?.full_name || user?.email?.split("@")[0]}
          </h1>
          <p className="mt-1 text-fog-dim">
            {isPaid ? "You're on a paid plan." : "You're on the free plan."}
          </p>
        </div>
        <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fog-dim">
          {profile?.plan?.toUpperCase() ?? "FREE"}
        </span>
      </div>

      <StatsGrid
        stats={[
          { label: "Resumes", value: String(resumes?.length ?? 0) },
          { label: "Avg. match score", value: avgScore ? `${avgScore}%` : "—", color: "text-teal" },
          { label: "Plan status", value: profile?.subscription_status ?? "inactive" },
        ]}
      />

      {!isPaid && (
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft"
        >
          Upgrade plan →
        </Link>
      )}

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl text-fog">Recent documents</h2>
        <Link
          href="/dashboard/resumes/new"
          className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm text-fog transition hover:border-amber/50"
        >
          <Plus size={15} /> New
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        {resumes && resumes.length > 0 ? (
          resumes.map((r) => (
            <Link
              key={r.id}
              href={`/dashboard/resumes/${r.id}`}
              className="flex items-center justify-between rounded-xl border border-line bg-surface/40 px-5 py-4 transition hover:border-amber/40"
            >
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-fog-dim" />
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
            Nothing here yet — create a resume, cover letter, or summary to get started.
          </Link>
        )}
      </div>
    </main>
  );
}
