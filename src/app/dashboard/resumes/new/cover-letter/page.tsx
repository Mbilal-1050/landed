import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CoverLetterWizard from "@/components/CoverLetterWizard";
import AiComingSoon from "@/components/AiComingSoon";

export default function NewCoverLetterPage() {
  const aiAvailable = Boolean(process.env.ANTHROPIC_API_KEY);
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <Link href="/dashboard/resumes/new" className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back
      </Link>
      <h1 className="mb-2 font-display text-3xl text-fog">New cover letter</h1>
      <p className="mb-8 text-fog-dim">A few details in, a ready-to-send letter out.</p>
      {aiAvailable ? <CoverLetterWizard /> : <AiComingSoon tool="cover letter writer" />}
    </main>
  );
}
