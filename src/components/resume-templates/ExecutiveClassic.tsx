import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

export default function ExecutiveClassic({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-serif text-[13px] leading-relaxed">
      <div className="text-center">
        <h1 className="text-3xl tracking-wide">{data.fullName}</h1>
        <p className="mt-1 italic" style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
        <p className="mt-2 text-xs text-gray-500">
          {[data.email, data.phone, data.location].filter(Boolean).join("  ·  ")}
        </p>
        <div className="mx-auto mt-4 h-px w-24" style={{ backgroundColor: "var(--r-accent)" }} />
      </div>

      <p className="mt-5 text-center text-gray-700">{data.summary}</p>

      <Section title="Professional Experience">
        {data.experience.map((e, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">{e.title}, {e.company}</h3>
              <span className="text-xs text-gray-500">{e.dates}</span>
            </div>
            <ul className="mt-1 list-disc pl-4 text-gray-700">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {data.education.map((e, i) => (
          <p key={i}>{e.degree}, {e.school} — {e.dates}</p>
        ))}
      </Section>

      <Section title="Core Competencies">
        <p className="text-gray-700">{data.skills.join("  ·  ")}</p>
      </Section>
    </div>
  );
}
