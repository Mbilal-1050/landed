import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

export default function TechDeveloper({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold">{data.fullName}</h1>
          <p className="font-mono text-sm" style={{ color: "var(--r-accent)" }}>&gt; {data.targetRole}</p>
        </div>
        <div className="text-right font-mono text-xs text-gray-500">
          {data.email && <p>{data.email}</p>}
          {data.linkedin && <p>{data.linkedin}</p>}
        </div>
      </div>

      <p className="mt-4 border-l-2 pl-3 text-gray-700" style={{ borderColor: "var(--r-accent)" }}>{data.summary}</p>

      <Section title="// Skills">
        <div className="flex flex-wrap gap-1.5 font-mono">
          {data.skills.map((s) => (
            <span key={s} className="rounded px-2 py-0.5 text-xs" style={{ backgroundColor: "var(--r-accent-soft)", color: "var(--r-accent)" }}>{s}</span>
          ))}
        </div>
      </Section>

      <Section title="// Experience">
        {data.experience.map((e, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-baseline justify-between font-mono">
              <h3 className="font-semibold">{e.title} @ {e.company}</h3>
              <span className="text-xs text-gray-500">{e.dates}</span>
            </div>
            <ul className="mt-1 list-disc pl-4 text-gray-700">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="// Education">
        {data.education.map((e, i) => (
          <p key={i} className="font-mono text-gray-700">{e.degree}, {e.school} ({e.dates})</p>
        ))}
      </Section>
    </div>
  );
}
