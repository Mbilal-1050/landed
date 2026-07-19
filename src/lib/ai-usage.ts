import { SupabaseClient } from "@supabase/supabase-js";

const RESET_INTERVAL_DAYS = 30;
const LIMITS: Record<string, number> = {
  pro: 60,
  business: 200,
};

export interface UsageCheckResult {
  allowed: boolean;
  reason?: "not_subscribed" | "limit_reached";
  remaining?: number;
  limit?: number;
}

/**
 * Gates AI generation behind an active paid subscription and a rolling
 * monthly usage cap per user, so cost always tracks revenue instead of
 * traffic. Uses the admin client so it can update usage counters that are
 * not directly writable by the user via RLS.
 */
export async function checkAndConsumeAiUsage(
  admin: SupabaseClient,
  userId: string
): Promise<UsageCheckResult> {
  const { data: profile, error } = await admin
    .from("profiles")
    .select("plan, subscription_status, ai_usage_count, ai_usage_reset_at")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return { allowed: false, reason: "not_subscribed" };
  }

  if (profile.subscription_status !== "active") {
    return { allowed: false, reason: "not_subscribed" };
  }

  const limit = LIMITS[profile.plan] ?? LIMITS.pro;

  const resetAt = new Date(profile.ai_usage_reset_at);
  const msSinceReset = Date.now() - resetAt.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  let count = profile.ai_usage_count;

  if (msSinceReset > RESET_INTERVAL_DAYS * dayMs) {
    count = 0;
    await admin
      .from("profiles")
      .update({ ai_usage_count: 0, ai_usage_reset_at: new Date().toISOString() })
      .eq("id", userId);
  }

  if (count >= limit) {
    return { allowed: false, reason: "limit_reached", remaining: 0, limit };
  }

  await admin
    .from("profiles")
    .update({ ai_usage_count: count + 1 })
    .eq("id", userId);

  return { allowed: true, remaining: limit - count - 1, limit };
}
