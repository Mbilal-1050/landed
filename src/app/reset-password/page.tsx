import Link from "next/link";
import { LogoFull } from "@/components/Logo";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6">
      <Link href="/" className="mb-8 inline-flex">
        <LogoFull size={24} />
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface/40 p-8">
        <h1 className="mb-1 font-display text-2xl text-fog">Set a new password</h1>
        <p className="mb-6 text-sm text-fog-dim">Choose a new password for your account.</p>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
