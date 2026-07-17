import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewResumeTabs from "@/components/NewResumeTabs";

export default function NewResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <Link href="/dashboard/resumes" className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back to resumes
      </Link>
      <h1 className="mb-2 font-display text-3xl text-fog">New resume</h1>
      <p className="mb-8 text-fog-dim">Let AI build it from a few details, or paste your own text and scan it.</p>
      <NewResumeTabs />
    </main>
  );
}
