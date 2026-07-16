import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/server";

// Whop webhooks follow the Standard Webhooks spec:
// https://docs.whop.com/developer/guides/webhooks
//
// Headers:
//   webhook-id        — unique event id
//   webhook-timestamp — unix seconds
//   webhook-signature — one or more "v1,<base64-hmac-sha256>" values, space separated
//
// Signed content = `${id}.${timestamp}.${rawBody}`, HMAC-SHA256 with the
// webhook secret (as raw bytes), base64-encoded.
function isValidSignature(
  id: string | null,
  timestamp: string | null,
  rawBody: string,
  signatureHeader: string | null
) {
  if (!id || !timestamp || !signatureHeader || !process.env.WHOP_WEBHOOK_SECRET) {
    return false;
  }

  // Reject events older than 5 minutes to guard against replay attacks.
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (Number.isNaN(age) || age > 300) return false;

  const signedContent = `${id}.${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", process.env.WHOP_WEBHOOK_SECRET)
    .update(signedContent)
    .digest("base64");

  return signatureHeader
    .split(" ")
    .some((sig) => {
      const [, value] = sig.split(",");
      if (!value) return false;
      try {
        return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(value));
      } catch {
        return false; // length mismatch etc.
      }
    });
}

// Maps your real Whop plan IDs to the internal plan names stored in Supabase.
const PLAN_MAP: Record<string, string> = {
  plan_I8fEhVrzXnOTh: "pro",
  plan_iQOhmvBoNNNI2: "business",
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const id = req.headers.get("webhook-id");
  const timestamp = req.headers.get("webhook-timestamp");
  const signature = req.headers.get("webhook-signature");

  if (!isValidSignature(id, timestamp, rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const supabase = createAdminClient();

  switch (event.type) {
    case "membership.activated":
    case "membership.deactivated": {
      const membership = event.data;
      const email: string | undefined = membership?.user?.email;
      const planId: string | undefined = membership?.plan?.id;
      const status = event.type === "membership.activated" ? "active" : "canceled";

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
    case "payment.succeeded": {
      // Optional: log/record successful renewal payments. Membership status
      // is already kept in sync by membership.activated/deactivated above.
      break;
    }
    default:
      // Ignore events we don't act on
      break;
  }

  // Respond quickly — Whop retries on non-2xx or slow responses.
  return NextResponse.json({ received: true });
}
