import type { ResumeData } from "@/lib/resume-templates/types";

// Second Tech & Developer layout: card-based skill "chips" grid and a
// terminal-prompt-style header, distinct from Terminal's inline mono style.
export default function Cursor({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="rounded-lg bg-[#0d1117] p-4 font-mono text-xs text-green-400">
        <p>$ whoami</p>
        <p className="mt-1 text-white">{data.fullName.toLowerCase().replace(/\s+/g, "_")}</p>
        <p className="mt-2">$ cat role.txt</p>
        <p className="text-white">{data.targetRole}</p>
      </div>

      <p className="mt-4 text-gray-700">{data.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {data.skills.map((s) => (
          <span
            key={s}
            className="rounded-md border px-2.5 py-1 font-mono text-xs"
            style={{ borderColor: "var(--r-accent)", color: "var(--r-accent)" }}
          >
            {s}
          </span>
        ))}
      </div>

      <h2 className="mt-6 mb-2 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent)" }}>
        experience[]
      </h2>
      {data.experience.map((e, i) => (
        <div key={i} className="mb-4 border-l-2 pl-3" style={{ borderColor: "var(--r-accent)" }}>
          <div className="flex items-baseline justify-between font-mono">
            <h3 className="font-semibold">{e.title}</h3>
            <span className="text-xs text-gray-500">{e.dates}</span>
          </div>
          <p className="text-xs text-gray-500">{e.company}</p>
          <ul className="mt-1 list-disc pl-4 text-gray-700">
            {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>
      ))}

      <h2 className="mt-6 mb-2 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: "var(--r-accent)" }}>
        education[]
      </h2>
      {data.education.map((e, i) => (
        <p key={i} className="font-mono text-gray-700">{e.degree}, {e.school} ({e.dates})</p>
      ))}
    </div>
  );
}
