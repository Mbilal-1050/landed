import { createClient } from "@/lib/supabase/server";
import CopyLinkButton from "@/components/CopyLinkButton";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Gift, Users, DollarSign, ExternalLink } from "lucide-react";

export default async function ReferralsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", user!.id)
    .single();

  const { data: count } = await supabase.rpc("get_referral_count", {
    code: profile?.referral_code ?? "",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.landedofficial.online";
  const referralLink = `${siteUrl}/signup?ref=${profile?.referral_code ?? ""}`;

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
      <h1 className="mb-2 font-display text-3xl text-fog">Refer & Earn</h1>
      <p className="mb-8 text-fog-dim">
        Share your link. Everyone who signs up through it is counted here.
      </p>

      <div className="rounded-2xl border border-line bg-surface/40 p-6">
        <div className="mb-6 flex items-center gap-2 text-fog-dim">
          <Gift size={16} className="text-amber" />
          <span className="text-sm">Your referral link</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            readOnly
            value={referralLink}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 font-mono text-xs text-fog-dim outline-none"
          />
          <CopyLinkButton text={referralLink} />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs text-fog-dim">Or share directly</p>
          <SocialShareButtons
            url={referralLink}
            text="I'm building my resume with Landed — it scores your resume against any job description before you apply."
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface/40 p-6">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal/10">
          <Users size={18} className="text-teal" />
        </div>
        <div>
          <p className="font-display text-2xl text-fog">{count ?? 0}</p>
          <p className="text-sm text-fog-dim">people signed up with your link</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber/30 bg-amber/5 p-6">
        <div className="mb-2 flex items-center gap-2 text-amber">
          <DollarSign size={16} />
          <p className="text-sm font-medium">Want to earn real money?</p>
        </div>
        <p className="text-sm text-fog-dim">
          Join Landed&apos;s affiliate program and earn <strong className="text-fog">30% recurring commission</strong> for
          every paying customer you bring — for as long as they stay subscribed.
        </p>
        <p className="mt-2 text-xs text-fog-dim">
          Payouts processed securely — powered by our payment partner.
        </p>
        <a
          href="https://whop.com/landed/affiliates"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft"
        >
          Activate payouts <ExternalLink size={13} />
        </a>
      </div>
    </main>
  );
}
