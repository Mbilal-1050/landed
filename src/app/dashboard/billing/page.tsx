import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, Clock, ExternalLink } from "lucide-react";

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, subscription_status")
    .eq("id", user!.id)
    .single();

  const isPaid = profile?.subscription_status === "active";
  const isTrialing = profile?.subscription_status === "trialing";

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
      <h1 className="mb-8 font-display text-3xl text-fog">Billing</h1>

      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-fog-dim">Current plan</p>
            <p className="mt-1 font-display text-2xl text-fog capitalize">
              {profile?.plan ?? "free"}
            </p>
          </div>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              isPaid
                ? "bg-teal/10 text-teal"
                : isTrialing
                ? "bg-amber/10 text-amber"
                : "border border-line text-fog-dim"
            }`}
          >
            {isPaid && <CheckCircle2 size={13} />}
            {isTrialing && <Clock size={13} />}
            {profile?.subscription_status ?? "inactive"}
          </span>
        </div>

        {isTrialing && (
          <p className="mt-3 text-sm text-fog-dim">
            Your trial is active. AI generation unlocks automatically once your first payment goes through.
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {!isPaid && !isTrialing && (
            <Link
              href="/pricing"
              className="rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft"
            >
              Upgrade plan
            </Link>
          )}
          {(isPaid || isTrialing) && (
            <Link
              href="/pricing"
              className="rounded-lg border border-line px-5 py-2.5 text-sm text-fog transition hover:border-amber/50"
            >
              Change plan
            </Link>
          )}
          <a
            href="https://whop.com/orders"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-line px-5 py-2.5 text-sm text-fog-dim transition hover:border-amber/50 hover:text-fog"
          >
            Manage subscription on Whop <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <p className="mt-4 text-xs text-fog-dim">
        Payments, invoices, and cancellations are handled securely by Whop. Your plan here updates
        automatically within a few seconds of any change you make there.
      </p>
    </main>
  );
}
