import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6">
      <Link href="/" className="mb-8 font-display text-xl tracking-tight text-fog">
        Landed<span className="text-amber">.</span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface/40 p-8">
        <h1 className="mb-1 font-display text-2xl text-fog">Welcome back</h1>
        <p className="mb-6 text-sm text-fog-dim">Log in to keep building your resume.</p>
        <AuthForm mode="login" />
      </div>
      <p className="mt-6 text-sm text-fog-dim">
        New to Landed?{" "}
        <Link href="/signup" className="text-amber hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
