import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRestaurantById } from "@/lib/restaurants-store";
import { RestaurantForm } from "@/components/restaurant-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Modifica ristorante",
  robots: { index: false, follow: false },
};

export default async function ModificaRistorantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurantById(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link
        href="/gestione"
        className="text-sm font-medium text-brand hover:underline"
      >
        ← Torna alla gestione
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">
        Modifica ristorante
      </h1>

      <div className="mt-10">
        <RestaurantForm restaurant={restaurant} />
      </div>
    </div>
  );
}
