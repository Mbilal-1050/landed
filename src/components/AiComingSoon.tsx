import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AiComingSoon({
  tool,
  suggestManual,
}: {
  tool: string;
  suggestManual?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-amber/30 bg-amber/5 p-10 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-amber/10 text-amber">
        <Sparkles size={20} />
      </div>
      <h2 className="font-display text-xl text-fog">AI {tool} — coming very soon</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-fog-dim">
        We&apos;re finishing rollout on this feature. Check back shortly, or subscribe to be
        notified the moment it&apos;s live.
      </p>
      {suggestManual && (
        <Link
          href="/dashboard/resumes/new/resume"
          className="mt-6 inline-block rounded-lg border border-line px-5 py-2.5 text-sm text-fog transition hover:border-amber/50"
        >
          Paste your resume manually instead
        </Link>
      )}
    </div>
  );
}
