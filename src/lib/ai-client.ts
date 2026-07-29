import Anthropic from "@anthropic-ai/sdk";
import Groq from "groq-sdk";

// Tries Anthropic (Claude Sonnet 5) first. If it's unavailable or errors,
// automatically falls back to Groq so a single provider outage or rate
// limit doesn't take AI generation down for users.
export async function generateJSON(prompt: string, maxTokens: number): Promise<string> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  if (anthropicKey) {
    try {
      const anthropic = new Anthropic({ apiKey: anthropicKey });
      const response = await anthropic.messages.create({
        model: "claude-sonnet-5",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      });
      const textBlock = response.content.find((b) => b.type === "text");
      if (textBlock && textBlock.type === "text") return textBlock.text;
    } catch (err) {
      console.error("Anthropic generation failed, falling back to Groq:", err);
    }
  }

  if (groqKey) {
    const groq = new Groq({ apiKey: groqKey });
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    });
    const text = completion.choices[0]?.message?.content;
    if (text) return text;
  }

  throw new Error("No AI provider available or all providers failed.");
}

export function aiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.GROQ_API_KEY);
}
