import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { restaurants, formatVisit } from "@/lib/ristoranti";
import { Stars } from "@/components/stars";

export const metadata: Metadata = {
  title: "Ristoranti",
  description:
    "I ristoranti visitati di recente: recensioni, voti, piatti provati e mappe.",
};

export default function RistorantiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Ristoranti visitati</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Una raccolta dei locali provati di recente, con voti, piatti consigliati
        e recensioni.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((r) => (
          <Link
            key={r.slug}
            href={`/ristoranti/${r.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              {r.photos[0] ? (
                <Image
                  src={r.photos[0]}
                  alt={r.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/20 to-brand/5 text-6xl">
                  {r.emoji}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <Stars rating={r.rating} />
                <span className="text-sm font-medium text-muted">
                  {r.priceRange}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold group-hover:text-brand">
                {r.name}
              </h2>
              <p className="text-sm text-muted">
                {r.cuisine} · {r.city}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-foreground/80">
                {r.shortReview}
              </p>
              <p className="mt-4 text-xs text-muted">
                Visitato a {formatVisit(r.visitedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
