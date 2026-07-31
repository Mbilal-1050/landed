import Link from "next/link";
import { LogoFull } from "@/components/Logo";
import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6">
      <Link href="/" className="mb-8 inline-flex">
        <LogoFull size={24} />
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface/40 p-8">
        <h1 className="mb-1 font-display text-2xl text-fog">Create your account</h1>
        <p className="mb-6 text-sm text-fog-dim">Free to start. Upgrade when you&apos;re ready to send.</p>
        <AuthForm mode="signup" />
      </div>
      <p className="mt-6 text-sm text-fog-dim">
        Already have an account?{" "}
        <Link href="/login" className="text-amber hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
