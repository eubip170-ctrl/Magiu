import type { Metadata } from "next";
import { Suspense } from "react";
import { AccediForm } from "@/components/accedi-form";

export const metadata: Metadata = {
  title: "Accesso",
  description: "Inserisci il PIN per accedere al sito.",
  robots: { index: false, follow: false },
};

export default function AccediPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 text-center">
        <p className="text-2xl font-bold">
          Mag<span className="text-brand">iu</span>
        </p>
        <h1 className="mt-6 text-xl font-semibold">Inserisci il PIN</h1>
        <p className="mt-2 text-sm text-muted">
          Questa area è protetta. Digita il PIN per continuare.
        </p>

        <div className="mt-6">
          <Suspense>
            <AccediForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
