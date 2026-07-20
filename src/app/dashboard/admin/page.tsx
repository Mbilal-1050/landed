import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());
  if (!user?.email || !adminEmails.includes(user.email.toLowerCase())) {
    redirect("/dashboard");
  }

  const admin = createAdminClient();

  const { data: breakdown } = await admin.rpc("get_referral_source_breakdown");
  const { count: totalUsers } = await admin.from("profiles").select("*", { count: "exact", head: true });
  const { count: paidUsers } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("subscription_status", "active");
  const { count: trialingUsers } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("subscription_status", "trialing");
  const { count: totalDocs } = await admin.from("resumes").select("*", { count: "exact", head: true });

  const sources = (breakdown ?? []) as { source: string; count: number }[];
  const maxCount = Math.max(...sources.map((s) => s.count), 1);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <h1 className="mb-2 font-display text-3xl text-fog">Growth analytics</h1>
      <p className="mb-8 text-fog-dim">Admin-only view of signups, conversions, and where traffic comes from.</p>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="text-xs uppercase tracking-wide text-fog-dim">Total signups</p>
          <p className="mt-2 font-display text-2xl text-fog">{totalUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="text-xs uppercase tracking-wide text-fog-dim">Paying</p>
          <p className="mt-2 font-display text-2xl text-teal">{paidUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="text-xs uppercase tracking-wide text-fog-dim">Trialing</p>
          <p className="mt-2 font-display text-2xl text-amber">{trialingUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/40 p-5">
          <p className="text-xs uppercase tracking-wide text-fog-dim">Documents made</p>
          <p className="mt-2 font-display text-2xl text-fog">{totalDocs ?? 0}</p>
        </div>
      </div>

      <h2 className="mt-10 mb-4 font-display text-xl text-fog">Where signups come from</h2>
      <div className="space-y-3">
        {sources.length > 0 ? (
          sources.map((s) => (
            <div key={s.source}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-fog">{s.source}</span>
                <span className="font-mono text-fog-dim">{s.count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-amber"
                  style={{ width: `${(s.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-fog-dim">No signups yet.</p>
        )}
      </div>
    </main>
  );
}
