import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, History } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ResumeForm from "@/components/ResumeForm";
import ResumeBuilder from "@/components/ResumeBuilder";
import DeleteResumeButton from "@/components/DeleteResumeButton";
import DocumentViewer from "@/components/DocumentViewer";
import type { ResumeData } from "@/lib/resume-templates/types";

export default async function EditResumePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: resume } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (!resume) notFound();

  // Fire-and-forget view tracking — doesn't block rendering
  supabase
    .from("resume_events")
    .insert({ resume_id: resume.id, user_id: user!.id, event_type: "view" })
    .then(() => {});

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user!.id)
    .single();
  const aiConfigured = Boolean(process.env.ANTHROPIC_API_KEY || process.env.GROQ_API_KEY);
  const aiAvailable = aiConfigured && profile?.subscription_status === "active";

  const content = (resume.content ?? {}) as ResumeData & {
    resume_text?: string;
    job_description?: string;
    cover_letter?: string;
    summary?: string;
    linkedin_about?: string;
  };

  const isStructured = Array.isArray(content.experience);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/dashboard/resumes" className="flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
          <ArrowLeft size={15} /> Back to documents
        </Link>
        <div className="flex items-center gap-3">
          {isStructured && (
            <Link
              href={`/dashboard/resumes/${resume.id}/history`}
              className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm text-fog-dim transition hover:border-amber/50 hover:text-fog"
            >
              <History size={15} /> History
            </Link>
          )}
          <DeleteResumeButton id={resume.id} />
        </div>
      </div>
      <h1 className="mb-8 font-display text-3xl text-fog">{resume.title}</h1>

      {resume.doc_type === "resume" || !resume.doc_type ? (
        isStructured ? (
          <ResumeBuilder
            resumeId={resume.id}
            initialTitle={resume.title}
            initialTemplateId={resume.template_id || "modern-minimal"}
            initialThemeId={resume.color_theme || "amber"}
            initialData={content as ResumeData}
            aiAvailable={aiAvailable}
          />
        ) : (
          <ResumeForm
            resumeId={resume.id}
            initial={{
              title: resume.title,
              target_role: resume.target_role ?? "",
              resume_text: content.resume_text ?? "",
              job_description: content.job_description ?? "",
            }}
          />
        )
      ) : (
        <DocumentViewer
          docType={resume.doc_type as "cover_letter" | "summary"}
          content={content}
        />
      )}
    </main>
  );
}
