import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { checkAndConsumeAiUsage } from "@/lib/ai-usage";

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI generation isn't configured yet. Add an ANTHROPIC_API_KEY to enable it." },
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

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are an expert career coach. Write a complete, ready-to-send cover letter using ONLY the facts given below — never invent employers, dates, or achievements.

Candidate name: ${fullName || "Not provided"}
Target role: ${targetRole}
Company (if known): ${company || "Not specified — write it generically, without inventing a company name"}
Candidate background/experience: ${background}

Job description to tailor against:
${jobDescription}

Respond with ONLY a JSON object (no markdown fences, no preamble):
{ "cover_letter": "the full cover letter, 3-4 short paragraphs, ready to send" }`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") throw new Error("No text response");
    const cleaned = textBlock.text.replace(/^```json\s*|\s*```$/g, "").trim();
    return NextResponse.json(JSON.parse(cleaned));
  } catch (err) {
    console.error("Cover letter generation error:", err);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
