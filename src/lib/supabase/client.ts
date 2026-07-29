import { createBrowserClient } from "@supabase/ssr";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

// Browser-side Supabase client. Safe to use in "use client" components.
// Sets the cookie domain to the root domain (e.g. ".landedofficial.online")
// in production so the session cookie works across both the apex domain
// and the www subdomain — without this, a login started on one host and
// completed on the other loses its session entirely.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    ROOT_DOMAIN
      ? { cookieOptions: { domain: `.${ROOT_DOMAIN}`, path: "/", sameSite: "lax", secure: true } }
      : undefined
  );
}
