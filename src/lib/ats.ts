// A real, deterministic ATS match scorer: extracts meaningful keywords from
// a job description and checks how many appear in the resume text. No
// external AI API required — this mirrors how real ATS keyword filters work.

const STOP_WORDS = new Set([
  "the","and","for","are","with","that","this","from","have","will","your",
  "you","our","who","what","when","where","why","how","a","an","of","to",
  "in","on","at","by","is","as","it","be","or","we","us","their","they",
  "job","role","team","work","working","looking","strong","ability","years",
  "experience","required","preferred","plus","etc","including","using",
]);

function extractKeywords(text: string, max = 25): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([w]) => w);
}

export interface AtsResult {
  score: number;
  matched: string[];
  missing: string[];
}

export function scoreResumeAgainstJob(resumeText: string, jobDescription: string): AtsResult {
  const keywords = extractKeywords(jobDescription);
  const resumeLower = resumeText.toLowerCase();

  const matched = keywords.filter((k) => resumeLower.includes(k));
  const missing = keywords.filter((k) => !resumeLower.includes(k));

  const score = keywords.length === 0 ? 0 : Math.round((matched.length / keywords.length) * 100);

  return { score, matched, missing };
}
