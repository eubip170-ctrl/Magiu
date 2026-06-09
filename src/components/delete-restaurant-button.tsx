"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteRestaurantButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Eliminare "${name}"? L'operazione non è reversibile.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/ristoranti/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Eliminazione non riuscita.");
        return;
      }
      router.refresh();
    } catch {
      alert("Eliminazione non riuscita. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg border border-red-500/40 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10 disabled:opacity-50 dark:text-red-400"
    >
      {loading ? "..." : "Elimina"}
    </button>
  );
}
