import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const isPaid = profile?.subscription_status === "active";

  return (
    <div className="min-h-screen bg-ink">
      <header className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
        <Link href="/" className="font-display text-xl text-fog">
          Landed<span className="text-amber">.</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fog-dim">
            {profile?.plan?.toUpperCase() ?? "FREE"} · {profile?.subscription_status ?? "inactive"}
          </span>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <h1 className="font-display text-3xl text-fog">
          Welcome, {profile?.full_name || user.email?.split("@")[0]}
        </h1>
        <p className="mt-2 text-fog-dim">
          {isPaid
            ? "You're on a paid plan — unlimited tailored resumes and cover letters."
            : "You're on the free plan. Upgrade to unlock unlimited ATS-tailored resumes."}
        </p>

        {!isPaid && (
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft"
          >
            Upgrade plan →
          </Link>
        )}

        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-display text-xl text-fog">Your resumes</h2>
          <button className="rounded-lg border border-line px-4 py-2 text-sm text-fog transition hover:border-amber/50 cursor-pointer">
            + New resume
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          {resumes && resumes.length > 0 ? (
            resumes.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-line bg-surface/40 px-5 py-4"
              >
                <div>
                  <p className="text-fog">{r.title}</p>
                  <p className="text-xs text-fog-dim">{r.target_role || "No target role set"}</p>
                </div>
                {r.ats_score != null && (
                  <span className="font-mono text-sm text-teal">{r.ats_score}% match</span>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-line px-5 py-10 text-center text-fog-dim">
              No resumes yet. Create your first one to get an ATS match score.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
