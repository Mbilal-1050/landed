import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

export default function Academic({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-serif text-[13px] leading-relaxed">
      <h1 className="text-2xl font-semibold">{data.fullName}</h1>
      <p style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
      <p className="mt-1 text-xs text-gray-500">
        {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
      </p>

      <Section title="Education">
        {data.education.map((e, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{e.degree}</p>
            <p className="text-gray-600">{e.school}, {e.dates}</p>
          </div>
        ))}
      </Section>

      <Section title="Research & Summary">
        <p className="text-gray-700">{data.summary}</p>
      </Section>

      <Section title="Experience">
        {data.experience.map((e, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{e.title}, {e.company} <span className="font-normal text-gray-500">({e.dates})</span></p>
            <ul className="mt-1 list-disc pl-4 text-gray-700">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Skills & Methods">
        <p className="text-gray-700">{data.skills.join(", ")}</p>
      </Section>
    </div>
  );
}
