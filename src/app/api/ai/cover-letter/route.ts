import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { checkAndConsumeAiUsage } from "@/lib/ai-usage";
import { generateJSON, aiConfigured } from "@/lib/ai-client";

export async function POST(req: NextRequest) {
  if (!aiConfigured()) {
    return NextResponse.json(
      { error: "AI generation isn't configured yet. Add an ANTHROPIC_API_KEY or GROQ_API_KEY to enable it." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const usage = await checkAndConsumeAiUsage(admin, user.id);
  if (!usage.allowed) {
    if (usage.reason === "not_subscribed") {
      return NextResponse.json(
        { error: "AI generation is available on paid plans. Upgrade to unlock it.", code: "UPGRADE_REQUIRED" },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: `You've used all ${usage.limit} AI generations for this billing period. It resets automatically.`, code: "LIMIT_REACHED" },
      { status: 429 }
    );
  }

  const { fullName, targetRole, company, background, jobDescription } = await req.json();

  if (!targetRole || !background || !jobDescription) {
    return NextResponse.json(
      { error: "Target role, your background, and the job description are required." },
      { status: 400 }
    );
  }

  const prompt = `You are an expert career coach writing a cover letter on behalf of a candidate. You must WRITE ORIGINAL PROSE — full sentences and paragraphs in a natural, professional voice. You must NOT copy, paste, list, or concatenate the raw inputs below. Do not simply restate the job description. Do not dump the candidate's background as a list. Every sentence must be newly composed by you, using only true facts from the inputs (never invent employers, dates, or achievements).

Candidate name: ${fullName || "Not provided"}
Target role: ${targetRole}
Company (if known): ${company || "Not specified — write it generically, without inventing a company name"}
Candidate background/experience (facts only — do not copy this text into the letter): ${background}

Job description, for context only — do NOT quote or restate this text in the letter, only use it to understand what to emphasize:
${jobDescription}

Write a complete, ready-to-send cover letter: an opening that states the role and genuine interest, 1-2 body paragraphs connecting the candidate's real experience to what the role needs (in the writer's own words, not copied), and a closing paragraph. 3-4 short paragraphs total, natural professional tone.

Respond with ONLY a JSON object (no markdown fences, no preamble):
{ "cover_letter": "the full cover letter, written in original prose, ready to send" }`;

  function looksLikeRawConcatenation(letter: string): boolean {
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
    const letterNorm = normalize(letter);
    // If a large chunk of the job description or background appears
    // verbatim in the output, the model dumped raw input instead of writing.
    const chunks = [jobDescription, background].filter(Boolean);
    for (const chunk of chunks) {
      const chunkNorm = normalize(chunk);
      if (chunkNorm.length > 60 && letterNorm.includes(chunkNorm.slice(0, 60))) {
        return true;
      }
    }
    return false;
  }

  try {
    const text = await generateJSON(prompt, 1024);
    const cleaned = text.replace(/^```json\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (!parsed.cover_letter || looksLikeRawConcatenation(parsed.cover_letter)) {
      return NextResponse.json(
        { error: "The AI draft didn't come out right — please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Cover letter generation error:", err);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
