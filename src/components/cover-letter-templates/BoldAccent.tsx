import type { CoverLetterData } from "@/lib/cover-letter-templates/types";

export default function BoldAccent({ data }: { data: CoverLetterData }) {
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  return (
    <div className="flex bg-white text-[#16202e] font-sans text-[13px] leading-relaxed">
      <div className="w-2" style={{ backgroundColor: "var(--r-accent)" }} />
      <div className="flex-1 p-10">
        <p className="text-xl font-bold" style={{ color: "var(--r-accent)" }}>{data.fullName}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-6 text-xs text-gray-500">{data.date}</p>
        <p className="mt-4 mb-4 font-medium">
          Re: Application for {data.targetRole}{data.company ? ` at ${data.company}` : ""}
        </p>
        <p className="mb-4">Dear Hiring Manager,</p>
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-gray-700">{p}</p>
        ))}
        <p className="mt-6">Sincerely,</p>
        <p className="mt-4 font-semibold">{data.fullName}</p>
      </div>
    </div>
  );
}
