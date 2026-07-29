import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

export default function CreativeColorful({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="p-8 text-white" style={{ backgroundColor: "var(--r-accent)" }}>
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="mt-1 text-white/90">{data.targetRole}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/80">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>

      <div className="p-8">
        <p className="rounded-xl p-4 text-gray-700" style={{ backgroundColor: "var(--r-accent-soft)" }}>{data.summary}</p>

        <Section title="Experience">
          {data.experience.map((e, i) => (
            <div key={i} className="mb-4 border-l-2 pl-4" style={{ borderColor: "var(--r-accent)" }}>
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

        <div className="mt-5 grid grid-cols-2 gap-8">
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span key={s} className="rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ backgroundColor: "var(--r-accent)" }}>{s}</span>
              ))}
            </div>
          </Section>
          <Section title="Education">
            {data.education.map((e, i) => (
              <p key={i} className="text-gray-700">{e.degree}, {e.school} — {e.dates}</p>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}
