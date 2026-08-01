import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Leads with education and projects — built for students and early-career
// candidates who have less work history to show.
export default function EntryLevel({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--r-accent-soft)" }}>
        <div className="flex items-center gap-3">
          {data.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- print/export document
            <img src={data.photoUrl} alt="" className="h-14 w-14 rounded-full object-cover" />
          )}
          <div>
            <h1 className="text-2xl font-bold">{data.fullName}</h1>
            <p style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
      </div>

      <p className="mt-4 text-gray-700">{data.summary}</p>

      <Section title="Education">
        {data.education.map((e, i) => (
          <div key={i} className="mb-2 flex items-baseline justify-between">
            <span className="font-semibold">{e.degree}, {e.school}</span>
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
  );
}
