import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

// Whop sends a signature in the "whop-signature" header. We verify it using
// the webhook secret from your Whop dashboard (Developer > Webhooks) before
// trusting the payload — never process an unverified webhook.
function isValidSignature(rawBody: string, signature: string | null) {
  if (!signature || !process.env.WHOP_WEBHOOK_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", process.env.WHOP_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("whop-signature");

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const supabase = createAdminClient();

  // Whop membership payloads include the buyer's email and a plan/product id.
  // Map that plan id to your own 'pro' / 'business' labels below.
  const PLAN_MAP: Record<string, string> = {
    plan_I8fEhVrzXnOTh: "pro",
    plan_iQOhmvBoNNNI2: "business",
  };

  switch (event.action) {
    case "membership.went_valid":
    case "membership.went_invalid":
    case "membership.updated": {
      const membership = event.data;
      const email: string | undefined = membership?.user?.email ?? membership?.email;
      const planId: string | undefined = membership?.plan_id;
      const status =
        event.action === "membership.went_valid" ? "active" : "canceled";

      if (email) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: status,
            plan: status === "active" ? PLAN_MAP[planId ?? ""] ?? "pro" : "free",
            whop_membership_id: membership?.id ?? null,
          })
          .eq("email", email);
      }
      break;
    }
    default:
      // Ignore events we don't act on
      break;
  }

  return NextResponse.json({ received: true });
}
