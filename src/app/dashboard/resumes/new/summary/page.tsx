import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SummaryWizard from "@/components/SummaryWizard";
import AiComingSoon from "@/components/AiComingSoon";
import AiUpgradeRequired from "@/components/AiUpgradeRequired";

export default async function NewSummaryPage() {
  const aiConfigured = Boolean(process.env.ANTHROPIC_API_KEY);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user!.id)
    .single();
  const aiAvailable = aiConfigured && profile?.subscription_status === "active";

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <Link href="/dashboard/resumes/new" className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back
      </Link>
      <h1 className="mb-2 font-display text-3xl text-fog">New professional summary</h1>
      <p className="mb-8 text-fog-dim">A sharp summary for your resume header or LinkedIn About section.</p>
      {aiAvailable ? (
        <SummaryWizard />
      ) : aiConfigured ? (
        <AiUpgradeRequired tool="summary writer" />
      ) : (
        <AiComingSoon tool="summary writer" />
      )}
    </main>
  );
}
