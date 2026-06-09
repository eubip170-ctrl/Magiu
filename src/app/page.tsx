import Link from "next/link";

const FEATURES = [
  {
    icon: "🚀",
    title: "Veloce e moderno",
    description:
      "Siti costruiti con Next.js e ottimizzati per Vercel: prestazioni elevate e SEO curata.",
  },
  {
    icon: "🎨",
    title: "Design su misura",
    description:
      "Interfacce eleganti e responsive, pensate per il tuo brand e i tuoi utenti.",
  },
  {
    icon: "⚙️",
    title: "Funzionalità dinamiche",
    description:
      "Form, API e integrazioni lato server per trasformare il sito in uno strumento di lavoro.",
  },
  {
    icon: "📈",
    title: "Pronti a crescere",
    description:
      "Architettura scalabile che cresce con la tua attività, senza dover rifare tutto.",
  },
];

const STATS = [
  { value: "100%", label: "Progetti consegnati" },
  { value: "<1s", label: "Tempo di caricamento" },
  { value: "24/7", label: "Online e affidabile" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/10 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="inline-block rounded-full border border-border bg-card px-4 py-1 text-sm text-muted">
            Soluzioni digitali su misura
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Costruiamo il tuo progetto{" "}
            <span className="text-brand">digitale</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Magiu progetta e realizza siti web e applicazioni veloci, eleganti e
            pensate per far crescere la tua attività online.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@magiu.it"
              className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              Iniziamo insieme
            </a>
            <Link
              href="/servizi"
              className="w-full rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-card sm:w-auto"
            >
              Scopri i servizi
            </Link>
          </div>
        </div>
      </section>

      {/* Funzionalità */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistiche */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 rounded-3xl border border-border bg-card p-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-brand">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-bold">Hai un&apos;idea da realizzare?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Raccontaci il tuo progetto: ti risponderemo con una proposta su misura.
        </p>
        <a
          href="mailto:info@magiu.it"
          className="mt-8 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Contattaci ora
        </a>
      </section>
    </div>
  );
}
