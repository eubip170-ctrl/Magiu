import type { Metadata } from "next";
import Link from "next/link";
import { formatVisit } from "@/lib/ristoranti";
import { getRestaurants, isSupabaseConfigured } from "@/lib/restaurants-store";
import { Stars } from "@/components/stars";
import { DeleteRestaurantButton } from "@/components/delete-restaurant-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gestione ristoranti",
  robots: { index: false, follow: false },
};

export default async function GestionePage() {
  const configured = isSupabaseConfigured();
  const restaurants = await getRestaurants();

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Gestione ristoranti</h1>
        {configured && (
          <Link
            href="/gestione/nuovo"
            className="rounded-full bg-brand px-5 py-2.5 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            + Aggiungi
          </Link>
        )}
      </div>

      {!configured && (
        <div className="mt-8 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6">
          <p className="font-semibold">⚠️ Database non ancora collegato</p>
          <p className="mt-2 text-sm text-muted">
            Per aggiungere e salvare i ristoranti in modo permanente serve
            collegare Supabase. Finché non è configurato, qui sotto vedi i
            ristoranti di esempio e non è possibile modificarli. Una volta
            impostate le variabili <code>SUPABASE_URL</code> e{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code>, il pannello si attiva
            automaticamente.
          </p>
        </div>
      )}

      <div className="mt-8 space-y-3">
        {restaurants.map((r) => (
          <div
            key={r.id ?? r.slug}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted">
                    {r.city} · Visitato a {formatVisit(r.visitedAt)}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <Stars rating={r.rating} />
              </div>
            </div>

            {configured && r.id && (
              <div className="flex gap-2">
                <Link
                  href={`/gestione/${r.id}/modifica`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background"
                >
                  Modifica
                </Link>
                <DeleteRestaurantButton id={r.id} name={r.name} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
