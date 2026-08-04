import type { CoverLetterData } from "@/lib/cover-letter-templates/types";

export default function Elegant({ data }: { data: CoverLetterData }) {
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  return (
    <div className="bg-white p-12 text-[#16202e] font-serif text-[13px] leading-relaxed">
      <div className="text-center">
        <p className="text-xl tracking-wide">{data.fullName}</p>
        <p className="mt-1 italic" style={{ color: "var(--r-accent)" }}>{data.targetRole}</p>
        <p className="mt-1 text-xs text-gray-500">
          {[data.email, data.phone, data.location].filter(Boolean).join("  ·  ")}
        </p>
        <div className="mx-auto mt-4 h-px w-20" style={{ backgroundColor: "var(--r-accent)" }} />
      </div>
      <p className="mt-8 text-xs text-gray-500">{data.date}</p>
      <p className="mt-4 mb-4">
        Dear Hiring Manager{data.company ? ` at ${data.company}` : ""},
      </p>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-4 text-gray-700">{p}</p>
      ))}
      <p className="mt-8">Warm regards,</p>
      <p className="mt-4 font-semibold">{data.fullName}</p>
    </div>
  );
}
