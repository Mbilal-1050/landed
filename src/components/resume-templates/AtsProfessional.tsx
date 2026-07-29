import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Deliberately plain: no columns, no graphics, standard fonts — built to
// parse cleanly in every applicant tracking system.
export default function AtsProfessional({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-black font-sans text-[13px] leading-relaxed">
      <h1 className="text-2xl font-bold">{data.fullName}</h1>
      <p className="text-sm">{data.targetRole}</p>
      <p className="mt-1 text-xs text-gray-700">
        {[data.email, data.phone, data.location, data.linkedin].filter(Boolean).join(" | ")}
      </p>

      <Section title="Summary" plain>
        <p>{data.summary}</p>
      </Section>

      <Section title="Experience" plain>
        {data.experience.map((e, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{e.title} — {e.company} ({e.dates})</p>
            <ul className="mt-1 list-disc pl-5">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education" plain>
        {data.education.map((e, i) => (
          <p key={i}>{e.degree}, {e.school} ({e.dates})</p>
        ))}
      </Section>

      <Section title="Skills" plain>
        <p>{data.skills.join(", ")}</p>
      </Section>
    </div>
  );
}
