import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResumeForm from "@/components/ResumeForm";

export default function NewResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <Link href="/dashboard/resumes" className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back to resumes
      </Link>
      <h1 className="mb-8 font-display text-3xl text-fog">New resume</h1>
      <ResumeForm />
    </main>
  );
}
