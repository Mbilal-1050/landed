import Link from "next/link";
import { LogoFull } from "@/components/Logo";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6">
      <Link href="/" className="mb-8 inline-flex">
        <LogoFull size={24} />
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface/40 p-8">
        <h1 className="mb-1 font-display text-2xl text-fog">Reset your password</h1>
        <p className="mb-6 text-sm text-fog-dim">We&apos;ll email you a link to set a new one.</p>
        <ForgotPasswordForm />
      </div>
      <p className="mt-6 text-sm text-fog-dim">
        <Link href="/login" className="text-amber hover:underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
