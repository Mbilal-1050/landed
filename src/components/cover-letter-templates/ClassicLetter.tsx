import type { CoverLetterData } from "@/lib/cover-letter-templates/types";

export default function ClassicLetter({ data }: { data: CoverLetterData }) {
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  return (
    <div className="bg-white p-12 text-[#16202e] font-serif text-[13px] leading-relaxed">
      <div className="mb-8">
        <p className="font-semibold">{data.fullName}</p>
        <p className="text-xs text-gray-600">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
      </div>
      <p className="mb-6 text-xs text-gray-500">{data.date}</p>
      <p className="mb-4">
        Dear Hiring Manager{data.company ? ` at ${data.company}` : ""},
      </p>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-4 text-gray-800">{p}</p>
      ))}
      <p className="mt-8">Sincerely,</p>
      <p className="mt-6 font-semibold" style={{ color: "var(--r-accent)" }}>{data.fullName}</p>
    </div>
  );
}
