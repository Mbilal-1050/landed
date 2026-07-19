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
    case "membership.activated": {
      // Fires when a membership becomes valid — including the moment a free
      // trial starts, before any money has moved. We mark this as
      // "trialing" (not "active") so AI generation stays locked until a
      // real payment confirms via payment.succeeded below. This keeps AI
      // cost tied to confirmed revenue, not signups.
      const membership = event.data;
      const email: string | undefined = membership?.user?.email;
      const planId: string | undefined = membership?.plan?.id;

      if (email) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: "trialing",
            plan: PLAN_MAP[planId ?? ""] ?? "pro",
            whop_membership_id: membership?.id ?? null,
          })
          .eq("email", email);
      }
      break;
    }
    case "membership.deactivated": {
      const membership = event.data;
      const email: string | undefined = membership?.user?.email;

      if (email) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: "canceled",
            plan: "free",
            whop_membership_id: membership?.id ?? null,
          })
          .eq("email", email);
      }
      break;
    }
    case "payment.succeeded": {
      // The only event that confirms real money was actually charged.
      // This is what unlocks AI generation — trial starts alone don't.
      const payment = event.data;
      const email: string | undefined = payment?.user?.email;
      const planId: string | undefined = payment?.plan?.id;

      if (email) {
        await supabase
          .from("profiles")
          .update({
            subscription_status: "active",
            plan: PLAN_MAP[planId ?? ""] ?? "pro",
          })
          .eq("email", email);
      }
      break;
    }
    case "refund.created": {
      // Honors the 7-day money-back guarantee — revoke paid access the
      // moment a refund is issued, whether done manually or automatically.
      const refund = event.data;
      const email: string | undefined = refund?.user?.email ?? refund?.payment?.user?.email;

      if (email) {
        await supabase
          .from("profiles")
          .update({ subscription_status: "canceled", plan: "free" })
          .eq("email", email);
      }
      break;
    }
    default:
      // Ignore events we don't act on
      break;
  }

  // Respond quickly — Whop retries on non-2xx or slow responses.
  return NextResponse.json({ received: true });
}
