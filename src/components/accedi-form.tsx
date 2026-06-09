"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AccediForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/accedi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "PIN errato. Riprova.");
        setPin("");
        return;
      }

      const next = searchParams.get("next") || "/";
      router.replace(next);
      router.refresh();
    } catch {
      setError("Si è verificato un errore. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        inputMode="numeric"
        autoFocus
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="••••"
        aria-label="PIN di accesso"
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-brand"
      />

      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || pin.length === 0}
        className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Verifica..." : "Entra"}
      </button>
    </form>
  );
}
