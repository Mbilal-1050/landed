"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading one-time values from the URL on mount, not a render loop
    if (ref) setRefCode(ref);

    const template = params.get("template");
    const theme = params.get("theme");
    if (template) {
      window.localStorage.setItem(
        "landed-pending-template",
        JSON.stringify({ template, theme: theme || "amber" })
      );
    }
  }, []);

  function getPendingTemplateNext(): string {
    try {
      const raw = window.localStorage.getItem("landed-pending-template");
      if (!raw) return "/dashboard";
      const { template, theme } = JSON.parse(raw);
      window.localStorage.removeItem("landed-pending-template");
      return `/dashboard/resumes/new/resume?template=${template}&theme=${theme}`;
    } catch {
      return "/dashboard";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, referred_by: refCode, referral_source: referralSource || null } },
      });
      if (error) setError(error.message);
      else setNotice("Check your inbox to confirm your email, then log in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else window.location.href = getPendingTemplateNext();
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setError(null);
    const next = getPendingTemplateNext();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
  }

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-fog transition hover:border-amber/50 hover:bg-surface-2 cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z" />
          <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
        </svg>
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-fog-dim">
        <div className="h-px flex-1 bg-line" />
        or with email
        <div className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <input
            type="text"
            required
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
          />
        )}
        {mode === "signup" && (
          <select
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fog-dim outline-none focus:border-amber/60"
          >
            <option value="">How did you hear about us? (optional)</option>
            <option value="Product Hunt">Product Hunt</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="X / Twitter">X / Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube</option>
            <option value="Reddit">Reddit</option>
            <option value="Google Search">Google Search</option>
            <option value="Friend / Colleague">Friend / Colleague</option>
            <option value="Other">Other</option>
          </select>
        )}
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />

        {mode === "login" && (
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-fog-dim hover:text-amber">
              Forgot password?
            </Link>
          </div>
        )}

        {error && <p className="text-sm text-coral">{error}</p>}
        {notice && <p className="text-sm text-teal">{notice}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber px-4 py-3 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
        >
          {loading
            ? "Please wait…"
            : mode === "signup"
            ? "Create account"
            : "Log in"}
        </button>
      </form>
    </div>
  );
}
