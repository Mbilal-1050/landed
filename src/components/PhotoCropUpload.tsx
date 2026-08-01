"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { X, Upload, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getCroppedImageBlob } from "@/lib/cropImage";

export default function PhotoCropUpload({
  value,
  onChange,
}: {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
}) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileSelect(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setError(null);
    setRawImage(URL.createObjectURL(file));
  }

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleSaveCrop() {
    if (!rawImage || !croppedAreaPixels) return;
    setUploading(true);
    setError(null);
    try {
      const blob = await getCroppedImageBlob(rawImage, croppedAreaPixels);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const path = `${user!.id}/${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("resume-photos")
        .upload(path, blob, { upsert: true, contentType: "image/jpeg" });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("resume-photos").getPublicUrl(path);
      onChange(data.publicUrl);
      setRawImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (rawImage) {
    return (
      <div className="rounded-xl border border-line bg-surface/40 p-4">
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-ink">
          <Cropper
            image={rawImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--color-amber)]"
        />
        {error && <p className="mt-2 text-xs text-coral">{error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSaveCrop}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-xs font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
          >
            <Check size={13} /> {uploading ? "Saving…" : "Save photo"}
          </button>
          <button
            onClick={() => setRawImage(null)}
            className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-xs text-fog-dim cursor-pointer"
          >
            <X size={13} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs text-fog-dim">Photo (optional)</label>
      {value ? (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-line">
            <Image src={value} alt="Profile" fill className="object-cover" unoptimized />
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
          className="flex items-center gap-2 rounded-lg border border-dashed border-line px-4 py-2.5 text-sm text-fog-dim transition hover:border-amber/50 hover:text-fog cursor-pointer"
        >
          <Upload size={14} /> Upload & crop photo
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
      />
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
