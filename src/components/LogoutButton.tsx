"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

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
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fog-dim transition hover:bg-coral/10 hover:text-coral cursor-pointer"
    >
      <LogOut size={16} />
      Log out
    </button>
  );
}
