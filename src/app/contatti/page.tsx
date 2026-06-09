import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Magiu per il tuo prossimo progetto digitale. Ti risponderemo al più presto.",
};

export default function ContattiPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Parliamo del tuo progetto</h1>
          <p className="mt-6 text-lg text-muted">
            Compila il modulo e ti ricontatteremo al più presto. Preferisci
            scriverci direttamente? Trovi i nostri recapiti qui sotto.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm font-semibold text-brand">Email</dt>
              <dd className="mt-1 text-muted">
                <a href="mailto:info@magiu.it" className="hover:text-foreground">
                  info@magiu.it
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-brand">Dove siamo</dt>
              <dd className="mt-1 text-muted">Italia</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-brand">Orari</dt>
              <dd className="mt-1 text-muted">Lun – Ven, 9:00 – 18:00</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
