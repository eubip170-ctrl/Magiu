import type { Metadata } from "next";
import Link from "next/link";
import { RestaurantForm } from "@/components/restaurant-form";

export const metadata: Metadata = {
  title: "Nuovo ristorante",
  robots: { index: false, follow: false },
};

export default function NuovoRistorantePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link
        href="/gestione"
        className="text-sm font-medium text-brand hover:underline"
      >
        ← Torna alla gestione
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">
        Nuovo ristorante
      </h1>
      <p className="mt-3 text-muted">
        Compila i campi e salva. I campi con * sono obbligatori.
      </p>

      <div className="mt-10">
        <RestaurantForm />
      </div>
    </div>
  );
}
