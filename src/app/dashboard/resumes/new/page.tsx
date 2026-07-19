import Link from "next/link";
import { ArrowLeft, FileText, Mail, AlignLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const tools = [
  {
    href: "/dashboard/resumes/new/resume",
    icon: FileText,
    title: "Resume",
    body: "Full resume tailored and scored against a specific job description.",
  },
  {
    href: "/dashboard/resumes/new/cover-letter",
    icon: Mail,
    title: "Cover letter",
    body: "A complete, ready-to-send cover letter for a specific role.",
  },
  {
    href: "/dashboard/resumes/new/summary",
    icon: AlignLeft,
    title: "Professional summary",
    body: "A sharp 2-4 sentence summary for your resume header or LinkedIn.",
  },
];

export default async function NewDocumentHub() {
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
  const isPaid = profile?.subscription_status === "active";

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <Link href="/dashboard/resumes" className="mb-6 flex items-center gap-1.5 text-sm text-fog-dim hover:text-fog">
        <ArrowLeft size={15} /> Back to resumes
      </Link>
      <h1 className="mb-2 font-display text-3xl text-fog">What do you want to create?</h1>
      <p className="mb-8 text-fog-dim">Tell us a bit about the role — AI writes the first draft.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {tools.map((t) => {
          const isResume = t.href === "/dashboard/resumes/new/resume";
          const badge = !aiConfigured ? "soon" : !isPaid ? "pro" : null;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="group relative rounded-2xl border border-line bg-surface/40 p-6 transition hover:border-amber/50 hover:bg-surface-2"
            >
              {badge && (
                <span className="absolute right-4 top-4 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-fog-dim">
                  {badge}
                </span>
              )}
              <div className="grid h-11 w-11 place-items-center rounded-full bg-amber/10 text-amber transition group-hover:bg-amber group-hover:text-ink">
                <t.icon size={18} />
              </div>
              <h2 className="mt-4 font-display text-lg text-fog">{t.title}</h2>
              <p className="mt-1.5 text-sm text-fog-dim">
                {t.body}
                {isResume && !isPaid && " Manual paste + scoring is free."}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
