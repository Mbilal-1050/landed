import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Second Modern & Minimal layout: centered header, timeline-style
// experience with dot markers instead of a plain list — visually distinct
// from Aspen's left-aligned, bordered-header layout.
export default function Nova({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="text-center">
        <h1 className="text-3xl font-light tracking-tight">{data.fullName}</h1>
        <p className="mt-1 text-sm font-medium" style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
        <p className="mt-2 text-xs text-gray-500">
          {[data.email, data.phone, data.location].filter(Boolean).join("  ·  ")}
        </p>
      </div>

      <p className="mx-auto mt-5 max-w-lg text-center text-gray-700">{data.summary}</p>

      <div className="mt-8">
        <Section title="Experience">
          <div className="relative pl-4">
            <div className="absolute bottom-2 left-1 top-2 w-px bg-gray-200" />
            {data.experience.map((e, i) => (
              <div key={i} className="relative mb-5 pl-4">
                <div
                  className="absolute -left-[15px] top-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--r-accent)" }}
                />
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">{e.title} · {e.company}</h3>
                  <span className="text-xs text-gray-500">{e.dates}</span>
                </div>
                <ul className="mt-1 list-disc pl-4 text-gray-700">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-2 gap-8">
          <Section title="Education">
            {data.education.map((e, i) => (
              <p key={i} className="text-gray-700">{e.degree}, {e.school} — {e.dates}</p>
            ))}
          </Section>
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span key={s} className="rounded-full px-2.5 py-0.5 text-xs" style={{ backgroundColor: "var(--r-accent-soft)", color: "var(--r-accent)" }}>{s}</span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
