import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

export default function ModernMinimal({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="flex items-start justify-between border-b-2 pb-4" style={{ borderColor: "var(--r-accent)" }}>
        <div className="flex items-center gap-4">
          {data.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- print/export document, not a Next-optimized page
            <img src={data.photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
          )}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{data.fullName}</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-500 leading-relaxed">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
          {data.linkedin && <p>{data.linkedin}</p>}
        </div>
      </div>

      <p className="mt-4 text-gray-700">{data.summary}</p>

      <Section title="Experience">
        {data.experience.map((e, i) => (
          <div key={i} className="mb-4">
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

      <Section title="Education">
        {data.education.map((e, i) => (
          <div key={i} className="mb-1 flex items-baseline justify-between">
            <span>{e.degree}, {e.school}</span>
            <span className="text-xs text-gray-500">{e.dates}</span>
          </div>
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
  );
}
