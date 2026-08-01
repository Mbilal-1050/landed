import type { ResumeData } from "@/lib/resume-templates/types";

// Second ATS-safe layout: ultra-plain, dates in a left column so parsers
// never confuse them with job titles. Different structure from Beacon.
export default function Clarity({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 text-black font-sans text-[13px] leading-relaxed">
      <h1 className="text-2xl font-bold">{data.fullName}</h1>
      <p className="text-sm text-gray-700">{data.targetRole}</p>
      <p className="mt-1 text-xs text-gray-600">
        {[data.email, data.phone, data.location].filter(Boolean).join(" | ")}
      </p>
      <div className="mt-4 h-px bg-gray-300" />

      <div className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">Summary</h2>
        <p className="mt-1">{data.summary}</p>
      </div>

      <div className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">Experience</h2>
        {data.experience.map((e, i) => (
          <div key={i} className="mt-3 grid grid-cols-[90px_1fr] gap-3">
            <div className="text-xs text-gray-500">{e.dates}</div>
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-xs text-gray-600">{e.company}</p>
              <ul className="mt-1 list-disc pl-4">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">Education</h2>
        {data.education.map((e, i) => (
          <div key={i} className="mt-2 grid grid-cols-[90px_1fr] gap-3">
            <div className="text-xs text-gray-500">{e.dates}</div>
            <div>{e.degree}, {e.school}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">Skills</h2>
        <p className="mt-1">{data.skills.join(", ")}</p>
      </div>
    </div>
  );
}
