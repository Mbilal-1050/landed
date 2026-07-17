"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/5 px-5 py-4 text-teal"
      >
        <Check size={18} /> Message sent — we&apos;ll get back to you soon.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
        />
      </div>
      <textarea
        required
        rows={6}
        placeholder="How can we help?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-fog-dim focus:border-amber/60"
      />
      {status === "error" && (
        <p className="text-sm text-coral">Something went wrong — please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-amber px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-soft disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
