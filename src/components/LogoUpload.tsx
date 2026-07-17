"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB.");
      return;
    }
    setUploading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("resume-logos")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("resume-logos").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs text-fog-dim">Logo / personal mark (optional)</label>
      {value ? (
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-line bg-surface">
            <Image src={value} alt="Logo" fill className="object-contain p-1" unoptimized />
          </div>
          <button
            onClick={() => onChange(null)}
            className="flex items-center gap-1 text-xs text-fog-dim hover:text-coral cursor-pointer"
          >
            <X size={13} /> Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg border border-dashed border-line px-4 py-2.5 text-sm text-fog-dim transition hover:border-amber/50 hover:text-fog cursor-pointer"
        >
          <Upload size={14} />
          {uploading ? "Uploading…" : "Upload logo"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
