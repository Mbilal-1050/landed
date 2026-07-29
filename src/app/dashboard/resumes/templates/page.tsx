import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TemplateGallery from "@/components/TemplateGallery";

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <Link href="/dashboard/resumes" className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back to resumes
      </Link>
      <h1 className="mb-2 font-display text-3xl text-fog">Choose a template</h1>
      <p className="mb-8 text-fog-dim">Pick a design — you&apos;ll fill in your details next.</p>
      <TemplateGallery />
    </main>
  );
}
