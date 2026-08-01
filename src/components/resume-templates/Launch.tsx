import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Second Entry-Level layout: bold banner header with skill "badges" grid,
// distinct from Horizon's soft rounded-card header.
export default function Launch({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="p-8 text-white" style={{ backgroundColor: "var(--r-ink)" }}>
        <h1 className="text-2xl font-bold">{data.fullName}</h1>
        <p className="mt-1" style={{ color: "var(--r-accent-soft)" }}>{data.targetRole}</p>
        <p className="mt-2 text-xs text-gray-300">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
      </div>

      <div className="p-8">
        <p className="text-gray-700">{data.summary}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {data.skills.map((s) => (
            <div key={s} className="rounded-lg border py-2 text-center text-xs" style={{ borderColor: "var(--r-accent)", color: "var(--r-accent)" }}>
              {s}
            </div>
          ))}
        </div>

        <Section title="Education">
          {data.education.map((e, i) => (
            <div key={i} className="mb-2 flex items-baseline justify-between">
              <span className="font-semibold">{e.degree}, {e.school}</span>
              <span className="text-xs text-gray-500">{e.dates}</span>
            </div>
          ))}
        </Section>

        <Section title="Experience">
          {data.experience.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">{e.title} · {e.company}</h3>
                <span className="text-xs text-gray-500">{e.dates}</span>
              </div>
              <ul className="mt-1 list-disc pl-4 text-gray-700">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}
