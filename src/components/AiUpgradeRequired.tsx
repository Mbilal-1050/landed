import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AiUpgradeRequired({
  tool,
  isTrialing = false,
}: {
  tool: string;
  isTrialing?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-amber/30 bg-amber/5 p-10 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-amber/10 text-amber">
        <Sparkles size={20} />
      </div>
      <h2 className="font-display text-xl text-fog">
        {isTrialing ? "Almost there — one step left" : `AI ${tool} is a Pro feature`}
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-fog-dim">
        {isTrialing
          ? "Your trial is active, but AI generation unlocks once your first payment goes through — this happens automatically at the end of your trial, no action needed."
          : "Upgrade to a paid plan to unlock AI-generated resumes, cover letters, and summaries — each plan includes a monthly generation allowance."}
      </p>
      {!isTrialing && (
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft"
        >
          View plans
        </Link>
      )}
    </div>
  );
}
