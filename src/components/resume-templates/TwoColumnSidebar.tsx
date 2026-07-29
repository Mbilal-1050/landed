import type { ResumeData } from "@/lib/resume-templates/types";

export default function TwoColumnSidebar({ data }: { data: ResumeData }) {
  return (
    <div className="flex bg-white text-[#16202e] font-sans text-[13px] leading-relaxed min-h-full">
      <aside className="w-[34%] p-6 text-white" style={{ backgroundColor: "var(--r-ink)" }}>
        <h1 className="text-xl font-semibold">{data.fullName}</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--r-accent-soft)" }}>{data.targetRole}</p>

        <div className="mt-6 space-y-1 text-xs text-gray-300">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
          {data.linkedin && <p>{data.linkedin}</p>}
        </div>

        <h2 className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent-soft)" }}>Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s) => (
            <span key={s} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">{s}</span>
          ))}
        </div>

        <h2 className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent-soft)" }}>Education</h2>
        {data.education.map((e, i) => (
          <div key={i} className="mb-2 text-xs text-gray-300">
            <p className="text-white">{e.degree}</p>
            <p>{e.school} · {e.dates}</p>
          </div>
        ))}
      </aside>

      <main className="flex-1 p-8">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent)" }}>Profile</h2>
        <p className="text-gray-700">{data.summary}</p>

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
    </div>
  );
}
