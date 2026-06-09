import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  restaurants,
  getRestaurantBySlug,
  formatVisit,
  mapEmbedUrl,
} from "@/lib/ristoranti";
import { Stars } from "@/components/stars";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRestaurantBySlug(slug);

  if (!r) {
    return { title: "Ristorante non trovato" };
  }

  return {
    title: `${r.name} — ${r.city}`,
    description: r.shortReview,
  };
}

export default async function RistorantePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getRestaurantBySlug(slug);

  if (!r) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link
        href="/ristoranti"
        className="text-sm font-medium text-brand hover:underline"
      >
        ← Tutti i ristoranti
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <Stars rating={r.rating} />
          <span className="text-sm font-medium text-muted">{r.priceRange}</span>
          <span className="text-sm text-muted">
            · Visitato a {formatVisit(r.visitedAt)}
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{r.name}</h1>
        <p className="mt-2 text-muted">
          {r.cuisine} · {r.city}
        </p>
      </header>

      {/* Galleria foto */}
      {r.photos.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {r.photos.map((src, i) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`${r.name} — foto ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 text-7xl">
          {r.emoji}
        </div>
      )}

      {/* Recensione */}
      <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/90">
        {r.review.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Piatti provati */}
      {r.dishes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Piatti provati</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {r.dishes.map((dish) => (
              <li
                key={dish}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm"
              >
                {dish}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mappa incorporata */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Dove si trova</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <iframe
            title={`Mappa di ${r.name}`}
            src={mapEmbedUrl(r.mapQuery)}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {r.website && (
        <a
          href={r.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Visita il sito
        </a>
      )}
    </article>
  );
}
