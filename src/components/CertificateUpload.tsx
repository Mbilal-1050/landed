"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ResumeCertificate } from "@/lib/resume-templates/types";

export default function CertificateUpload({
  value,
  onChange,
}: {
  value: ResumeCertificate[];
  onChange: (files: ResumeCertificate[]) => void;
}) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB.");
      return;
    }
    setError(null);
    setUploading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("resume-certificates")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("resume-certificates").getPublicUrl(path);
    onChange([...value, { name: file.name.replace(/\.[^.]+$/, ""), url: data.publicUrl }]);
    setUploading(false);
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs text-fog-dim">Certificates / documents (optional)</label>
      <div className="space-y-2">
        {value.map((f, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-line bg-surface/30 px-3 py-2">
            <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-fog hover:text-amber">
              <FileText size={13} /> {f.name}
            </a>
            <button onClick={() => remove(i)} className="text-fog-dim hover:text-coral cursor-pointer">
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-line px-4 py-2.5 text-sm text-fog-dim transition hover:border-amber/50 hover:text-fog cursor-pointer disabled:opacity-60"
      >
        <Upload size={14} /> {uploading ? "Uploading…" : "Upload certificate (PDF or image)"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/png,image/jpeg"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
