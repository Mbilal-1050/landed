import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Second Academic layout: publication/CV style with numbered entries,
// distinct from Scholar's prose-paragraph education-first layout.
export default function Thesis({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-serif text-[13px] leading-relaxed">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{data.fullName}</h1>
        <p style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
        <p className="mt-1 text-xs text-gray-500">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="mx-auto mt-3 h-px w-32 bg-gray-300" />

      <Section title="Summary">
        <p className="text-gray-700">{data.summary}</p>
      </Section>

      <Section title="Appointments & Experience">
        <ol className="space-y-3">
          {data.experience.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-gray-400">{i + 1}.</span>
              <div>
                <p className="font-semibold">{e.title}, {e.company} <span className="font-normal text-gray-500">({e.dates})</span></p>
                <ul className="mt-1 list-disc pl-4 text-gray-700">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <ol className="space-y-1">
          {data.education.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-gray-400">{i + 1}.</span>
              <span>{e.degree}, {e.school} ({e.dates})</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Skills & Methods">
        <p className="text-gray-700">{data.skills.join(" · ")}</p>
      </Section>
    </div>
  );
}
