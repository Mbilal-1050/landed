"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function establishSession() {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          setReady(true);
          setChecking(false);
          return;
        }
      }
      // Fallback: some Supabase configs deliver the recovery session directly
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setReady(Boolean(session));
      setChecking(false);
    }
    establishSession();
  }, [supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setStatus("error");
      return;
    }
    setStatus("done");
    setTimeout(() => router.push("/login"), 2000);
  }

  if (checking) {
    return <p className="text-sm text-fog-dim">Verifying your reset link…</p>;
  }

  if (!ready) {
    return (
      <p className="text-sm text-coral">
        This reset link is invalid or has expired. Please request a new one from the forgot password page.
      </p>
    );
  }

  if (status === "done") {
    return <p className="text-sm text-teal">Password updated — redirecting you to log in…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="password"
        required
        minLength={6}
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
      />
      {error && <p className="text-sm text-coral">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-amber px-4 py-3 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
