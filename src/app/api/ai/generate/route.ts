import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI generation isn't configured yet. Add an ANTHROPIC_API_KEY to enable it." },
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

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are an expert resume writer and career coach. Using ONLY the factual details the candidate gives you below, produce a tailored resume and cover letter for the specific job description provided. Do not invent employers, titles, dates, or achievements that were not mentioned — you may rephrase and emphasize what was given, but never fabricate facts.

CANDIDATE DETAILS
Name: ${fullName || "Not provided"}
Target role: ${targetRole}
Years of experience: ${yearsExperience || "Not provided"}
Work history (as given by candidate): ${workHistory}
Skills: ${skills || "Not provided"}
Key achievements: ${achievements || "Not provided"}
Education: ${education || "Not provided"}

JOB DESCRIPTION TO TAILOR AGAINST
${jobDescription}

Respond with ONLY a JSON object (no markdown fences, no preamble) with this exact shape:
{
  "summary": "a 2-3 sentence professional summary tailored to this role",
  "experience_bullets": ["bullet 1", "bullet 2", "..."],
  "skills_section": ["skill 1", "skill 2", "..."],
  "cover_letter": "a complete, ready-to-send cover letter, 3-4 short paragraphs",
  "resume_text": "the full resume assembled as plain text, combining the summary, experience bullets, skills, and education into one readable resume"
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from AI");
    }

    const cleaned = textBlock.text.replace(/^```json\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json({ error: "AI generation failed. Please try again." }, { status: 500 });
  }
}
