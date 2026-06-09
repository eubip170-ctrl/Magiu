"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Restaurant } from "@/lib/ristoranti";

const inputClass =
  "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-brand";

function linesToText(arr: string[]): string {
  return arr.join("\n");
}

export function RestaurantForm({ restaurant }: { restaurant?: Restaurant }) {
  const router = useRouter();
  const isEdit = Boolean(restaurant?.id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(event.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const splitLines = (k: string) =>
      get(k)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    const splitCommas = (k: string) =>
      get(k)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
      name: get("name"),
      city: get("city"),
      cuisine: get("cuisine"),
      rating: Number(get("rating")),
      visitedAt: get("visitedAt"),
      priceRange: get("priceRange"),
      emoji: get("emoji"),
      shortReview: get("shortReview"),
      review: splitLines("review"),
      dishes: splitCommas("dishes"),
      photos: splitLines("photos"),
      mapQuery: get("mapQuery"),
      website: get("website"),
    };

    try {
      const url = isEdit
        ? `/api/ristoranti/${restaurant!.id}`
        : "/api/ristoranti";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Si è verificato un errore.");
        return;
      }

      router.push("/gestione");
      router.refresh();
    } catch {
      setError("Impossibile salvare. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  const r = restaurant;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nome *
          <input name="name" required defaultValue={r?.name} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Città / zona *
          <input name="city" required defaultValue={r?.city} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Tipo di cucina
          <input name="cuisine" defaultValue={r?.cuisine} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Voto
          <select name="rating" defaultValue={r?.rating ?? 5} className={inputClass}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)} ({n})
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Data della visita
          <input
            type="date"
            name="visitedAt"
            defaultValue={r?.visitedAt}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium">
          Fascia di prezzo
          <select
            name="priceRange"
            defaultValue={r?.priceRange ?? "€€"}
            className={inputClass}
          >
            {["€", "€€", "€€€", "€€€€"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Emoji (copertina senza foto)
          <input
            name="emoji"
            defaultValue={r?.emoji ?? "🍽️"}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Recensione breve (appare nell&apos;elenco)
        <textarea
          name="shortReview"
          rows={2}
          defaultValue={r?.shortReview}
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium">
        Recensione completa (un paragrafo per riga)
        <textarea
          name="review"
          rows={5}
          defaultValue={r ? linesToText(r.review) : ""}
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium">
        Piatti provati (separati da virgola)
        <input
          name="dishes"
          defaultValue={r?.dishes.join(", ")}
          placeholder="Cacio e pepe, Supplì, Tiramisù"
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium">
        Foto (un percorso per riga, es. /ristoranti/foto.jpg)
        <textarea
          name="photos"
          rows={2}
          defaultValue={r ? linesToText(r.photos) : ""}
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Indirizzo per la mappa
          <input
            name="mapQuery"
            defaultValue={r?.mapQuery}
            placeholder="Nome ristorante, Città"
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium">
          Sito web (facoltativo)
          <input
            name="website"
            type="url"
            defaultValue={r?.website}
            placeholder="https://..."
            className={inputClass}
          />
        </label>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Salvataggio..." : isEdit ? "Salva modifiche" : "Aggiungi ristorante"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/gestione")}
          className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-card"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}
