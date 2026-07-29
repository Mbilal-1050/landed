import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

// Enforces a single canonical host (www) so session cookies are never split
// across the apex domain and the www subdomain. Runs before anything else.
function enforceCanonicalHost(request: NextRequest): NextResponse | null {
  if (!ROOT_DOMAIN) return null;
  const host = request.headers.get("host") ?? "";
  const canonicalHost = `www.${ROOT_DOMAIN}`;
  if (host === ROOT_DOMAIN) {
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }
  return null;
}

// Refreshes the Supabase auth session on every request and protects /dashboard.
export async function updateSession(request: NextRequest) {
  const hostRedirect = enforceCanonicalHost(request);
  if (hostRedirect) return hostRedirect;

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: ROOT_DOMAIN
        ? { domain: `.${ROOT_DOMAIN}`, path: "/", sameSite: "lax", secure: true }
        : undefined,
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
