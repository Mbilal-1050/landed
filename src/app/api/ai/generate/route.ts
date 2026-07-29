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

  // Require a logged-in user so this can't be used as a free, unlimited API proxy.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // AI generation is gated behind an active paid plan with a monthly cap,
  // so cost always scales with revenue rather than with visitor traffic.
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

  const intake = await req.json();
  const {
    fullName,
    targetRole,
    yearsExperience,
    workHistory,
    skills,
    achievements,
    education,
    jobDescription,
  } = intake;

  if (!targetRole || !workHistory || !jobDescription) {
    return NextResponse.json(
      { error: "Target role, work history, and the job description are required." },
      { status: 400 }
    );
  }

  const prompt = `You are an expert resume writer and career coach. Using ONLY the factual details the candidate gives you below, produce a tailored, structured resume and a cover letter for the specific job description provided. Do not invent employers, titles, dates, or achievements that were not mentioned — you may rephrase and emphasize what was given, but never fabricate facts. Break the candidate's freeform work history into separate, structured job entries.

CANDIDATE DETAILS
Name: ${fullName || "Not provided"}
Target role: ${targetRole}
Years of experience: ${yearsExperience || "Not provided"}
Work history (as given by candidate, may cover multiple jobs — split these into separate entries): ${workHistory}
Skills: ${skills || "Not provided"}
Key achievements: ${achievements || "Not provided"}
Education: ${education || "Not provided"}

JOB DESCRIPTION TO TAILOR AGAINST
${jobDescription}

Respond with ONLY a JSON object (no markdown fences, no preamble) with this exact shape:
{
  "summary": "a 2-3 sentence professional summary tailored to this role",
  "experience": [
    { "title": "job title", "company": "company name", "dates": "e.g. 2022 — Present", "bullets": ["bullet 1", "bullet 2"] }
  ],
  "education": [
    { "school": "school name", "degree": "degree/program", "dates": "e.g. 2020" }
  ],
  "skills": ["skill 1", "skill 2", "..."],
  "cover_letter": "a complete, ready-to-send cover letter, 3-4 short paragraphs",
  "resume_text": "the full resume assembled as plain text, combining the summary, experience bullets, skills, and education into one readable resume — used for ATS keyword scoring"
}
If the candidate gave no education details, return an empty array for "education". Always return at least one experience entry if any work history was given.`;

  try {
    const text = await generateJSON(prompt, 2048);
    const cleaned = text.replace(/^```json\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json({ error: "AI generation failed. Please try again." }, { status: 500 });
  }
}
