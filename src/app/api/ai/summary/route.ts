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

  const { targetRole, background, tone } = await req.json();

  if (!targetRole || !background) {
    return NextResponse.json(
      { error: "Target role and your background are required." },
      { status: 400 }
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are an expert resume writer. Write a professional summary (for the top of a resume or a LinkedIn "About" section) using ONLY the facts given below — never invent experience.

Target role: ${targetRole}
Background/experience: ${background}
Tone: ${tone || "confident and concise"}

Respond with ONLY a JSON object (no markdown fences, no preamble):
{ "summary": "a 2-4 sentence professional summary", "linkedin_about": "a slightly longer, first-person version suitable for a LinkedIn About section" }`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });
    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") throw new Error("No text response");
    const cleaned = textBlock.text.replace(/^```json\s*|\s*```$/g, "").trim();
    return NextResponse.json(JSON.parse(cleaned));
  } catch (err) {
    console.error("Summary generation error:", err);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
