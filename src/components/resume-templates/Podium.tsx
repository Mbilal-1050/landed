import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Second Executive layout: left-aligned two-column header with photo slot,
// distinct from Sterling's centered, photo-free formal layout.
export default function Podium({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-serif text-[13px] leading-relaxed">
      <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: "var(--r-accent)" }}>
        <div className="flex items-center gap-4">
          {data.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- print/export document
            <img src={data.photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
          )}
          <div>
            <h1 className="text-2xl font-semibold">{data.fullName}</h1>
            <p style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-500">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
      </div>

      <p className="mt-5 text-gray-700">{data.summary}</p>

      <Section title="Leadership Experience">
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

      <div className="grid grid-cols-2 gap-8">
        <Section title="Education">
          {data.education.map((e, i) => (
            <p key={i} className="text-gray-700">{e.degree}, {e.school} — {e.dates}</p>
          ))}
        </Section>
        <Section title="Core Competencies">
          <p className="text-gray-700">{data.skills.join(", ")}</p>
        </Section>
      </div>
    </div>
  );
}
