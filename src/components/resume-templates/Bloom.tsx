import type { ResumeData } from "@/lib/resume-templates/types";
import { Section } from "./shared";

// Second Creative layout: diagonal split header instead of Prism's solid
// color block, plus a two-column skills/education footer.
export default function Bloom({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="relative overflow-hidden p-8 pb-14">
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rotate-45"
          style={{ backgroundColor: "var(--r-accent-soft)" }}
        />
        <div className="relative">
          <h1 className="text-3xl font-bold" style={{ color: "var(--r-accent)" }}>{data.fullName}</h1>
          <p className="mt-1 text-gray-700">{data.targetRole}</p>
          <p className="mt-2 text-xs text-gray-500">
            {[data.email, data.phone, data.location].filter(Boolean).join("  ·  ")}
          </p>
        </div>
      </div>

      <div className="px-8 pb-8">
        <p className="text-gray-700">{data.summary}</p>

        <Section title="Experience">
          {data.experience.map((e, i) => (
            <div key={i} className="mb-4 rounded-xl bg-gray-50 p-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold" style={{ color: "var(--r-accent)" }}>{e.title} · {e.company}</h3>
                <span className="text-xs text-gray-500">{e.dates}</span>
              </div>
              <ul className="mt-1 list-disc pl-4 text-gray-700">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        <div className="grid grid-cols-2 gap-8">
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
