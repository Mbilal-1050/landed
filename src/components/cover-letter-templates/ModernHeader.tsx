import type { CoverLetterData } from "@/lib/cover-letter-templates/types";

export default function ModernHeader({ data }: { data: CoverLetterData }) {
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  return (
    <div className="bg-white text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="p-8 text-white" style={{ backgroundColor: "var(--r-accent)" }}>
        <h1 className="text-2xl font-bold">{data.fullName}</h1>
        <p className="mt-1 text-white/90">Application for {data.targetRole}</p>
        <p className="mt-2 text-xs text-white/75">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="p-8">
        <p className="mb-6 text-xs text-gray-500">{data.date}</p>
        <p className="mb-4">
          Dear Hiring Manager{data.company ? ` at ${data.company}` : ""},
        </p>
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-gray-700">{p}</p>
        ))}
        <p className="mt-6">Best regards,</p>
        <p className="mt-4 font-semibold" style={{ color: "var(--r-accent)" }}>{data.fullName}</p>
      </div>
    </div>
  );
}
