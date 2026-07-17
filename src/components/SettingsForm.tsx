"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SettingsForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState(initialName);
  const [nameStatus, setNameStatus] = useState<"idle" | "saving" | "done">("idle");

  const [newPassword, setNewPassword] = useState("");
  const [pwStatus, setPwStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [pwError, setPwError] = useState<string | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function saveName(e: React.FormEvent) {
    e.preventDefault();
    setNameStatus("saving");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("profiles").update({ full_name: fullName }).eq("id", user!.id);
    setNameStatus("done");
    router.refresh();
    setTimeout(() => setNameStatus("idle"), 2000);
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus("saving");
    setPwError(null);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPwError(error.message);
      setPwStatus("error");
      return;
    }
    setNewPassword("");
    setPwStatus("done");
    setTimeout(() => setPwStatus("idle"), 2000);
  }

  async function deleteAccount() {
    setDeleting(true);
    const res = await fetch("/api/account/delete", { method: "POST" });
    if (res.ok) {
      await supabase.auth.signOut();
      router.push("/");
    } else {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={saveName} className="rounded-2xl border border-line bg-surface/40 p-6">
        <h2 className="mb-4 font-display text-lg text-fog">Profile</h2>
        <label className="mb-1.5 block text-xs text-fog-dim">Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-amber/60"
        />
        <label className="mb-1.5 mt-4 block text-xs text-fog-dim">Email</label>
        <input
          value={email}
          disabled
          className="w-full max-w-sm rounded-lg border border-line bg-surface/60 px-3 py-2.5 text-sm text-fog-dim outline-none"
        />
        <button
          type="submit"
          disabled={nameStatus === "saving"}
          className="mt-4 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
        >
          {nameStatus === "saving" ? "Saving…" : nameStatus === "done" ? "Saved ✓" : "Save changes"}
        </button>
      </form>

      <form onSubmit={changePassword} className="rounded-2xl border border-line bg-surface/40 p-6">
        <h2 className="mb-4 font-display text-lg text-fog">Change password</h2>
        <label className="mb-1.5 block text-xs text-fog-dim">New password</label>
        <input
          type="password"
          minLength={6}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 6 characters"
          className="w-full max-w-sm rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />
        {pwError && <p className="mt-2 text-sm text-coral">{pwError}</p>}
        <div>
          <button
            type="submit"
            disabled={pwStatus === "saving"}
            className="mt-4 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-fog transition hover:border-amber/50 disabled:opacity-60 cursor-pointer"
          >
            {pwStatus === "saving" ? "Updating…" : pwStatus === "done" ? "Updated ✓" : "Update password"}
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-coral/30 bg-coral/5 p-6">
        <h2 className="mb-2 font-display text-lg text-fog">Delete account</h2>
        <p className="mb-4 text-sm text-fog-dim">
          This permanently deletes your account, resumes, and profile data. This can&apos;t be undone.
        </p>
        {deleteConfirm ? (
          <div className="flex items-center gap-3">
            <button
              onClick={deleteAccount}
              disabled={deleting}
              className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
            >
              {deleting ? "Deleting…" : "Yes, permanently delete"}
            </button>
            <button onClick={() => setDeleteConfirm(false)} className="text-sm text-fog-dim cursor-pointer">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setDeleteConfirm(true)}
            className="rounded-lg border border-coral/40 px-4 py-2 text-sm text-coral transition hover:bg-coral/10 cursor-pointer"
          >
            Delete my account
          </button>
        )}
      </div>
    </div>
  );
}
