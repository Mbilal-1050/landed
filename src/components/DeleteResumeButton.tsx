"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteResumeButton({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    await supabase.from("resumes").delete().eq("id", id);
    router.push("/dashboard/resumes");
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-fog-dim">Delete this resume?</span>
        <button onClick={handleDelete} className="font-medium text-coral cursor-pointer">
          Yes, delete
        </button>
        <button onClick={() => setConfirming(false)} className="text-fog-dim cursor-pointer">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm text-fog-dim transition hover:border-coral/50 hover:text-coral cursor-pointer"
    >
      <Trash2 size={15} /> Delete
    </button>
  );
}
