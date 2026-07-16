"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="rounded-lg border border-line px-4 py-2 text-sm text-fog-dim transition hover:border-coral/50 hover:text-coral cursor-pointer"
    >
      Log out
    </button>
  );
}
