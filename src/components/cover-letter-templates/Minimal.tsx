import type { CoverLetterData } from "@/lib/cover-letter-templates/types";

export default function Minimal({ data }: { data: CoverLetterData }) {
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  return (
    <div className="bg-white p-12 text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="mb-10 flex items-baseline justify-between border-b-2 pb-3" style={{ borderColor: "var(--r-accent)" }}>
        <div>
          <p className="text-lg font-semibold">{data.fullName}</p>
          <p className="text-xs text-gray-500">{data.targetRole}</p>
        </div>
        <p className="text-xs text-gray-500">{data.date}</p>
      </div>
      <p className="mb-4">
        Dear Hiring Manager{data.company ? ` at ${data.company}` : ""},
      </p>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-4 text-gray-700">{p}</p>
      ))}
      <p className="mt-8">
        Best,<br />
        <span className="font-semibold">{data.fullName}</span>
      </p>
      <p className="mt-4 text-xs text-gray-500">
        {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
      </p>
    </div>
  );
}
