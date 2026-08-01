import type { ResumeData } from "@/lib/resume-templates/types";

// Second Two-Column layout: sidebar on the RIGHT (not left like Meridian),
// light sidebar background instead of dark, different section grouping.
export default function Harbor({ data }: { data: ResumeData }) {
  return (
    <div className="flex bg-white text-[#16202e] font-sans text-[13px] leading-relaxed min-h-full">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">{data.fullName}</h1>
        <p className="mt-0.5 text-sm" style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
        <p className="mt-4 text-gray-700">{data.summary}</p>

        <h2 className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent)" }}>Experience</h2>
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
      </main>

      <aside className="w-[32%] p-6" style={{ backgroundColor: "var(--r-accent-soft)" }}>
        <div className="space-y-1 text-xs text-gray-700">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
          {data.linkedin && <p>{data.linkedin}</p>}
        </div>

        <h2 className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent)" }}>Skills</h2>
        <div className="flex flex-col gap-1.5">
          {data.skills.map((s) => (
            <span key={s} className="text-xs text-gray-800">— {s}</span>
          ))}
        </div>

        <h2 className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent)" }}>Education</h2>
        {data.education.map((e, i) => (
          <div key={i} className="mb-2 text-xs text-gray-800">
            <p className="font-medium">{e.degree}</p>
            <p className="text-gray-600">{e.school} · {e.dates}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
