import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "I servizi di Magiu: siti web, applicazioni, e-commerce, consulenza e ottimizzazione.",
};

const SERVICES = [
  {
    icon: "🌐",
    title: "Siti web",
    text: "Siti vetrina, landing page e portali aziendali, veloci e ottimizzati per i motori di ricerca.",
  },
  {
    icon: "📱",
    title: "Web app",
    text: "Applicazioni interattive con aree riservate, dashboard e funzionalità su misura.",
  },
  {
    icon: "🛒",
    title: "E-commerce",
    text: "Negozi online completi, dalla gestione prodotti ai pagamenti sicuri.",
  },
  {
    icon: "🔍",
    title: "SEO & Performance",
    text: "Ottimizzazione tecnica per migliorare velocità, posizionamento e conversioni.",
  },
  {
    icon: "🎯",
    title: "Consulenza digitale",
    text: "Analisi, strategia e affiancamento per portare la tua presenza online al livello successivo.",
  },
  {
    icon: "🛠️",
    title: "Manutenzione",
    text: "Aggiornamenti, monitoraggio e supporto continuo per mantenere tutto efficiente.",
  },
];

export default function ServiziPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">I nostri servizi</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Soluzioni complete per ogni fase del tuo progetto digitale, dalla
        progettazione alla manutenzione.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="text-3xl">{s.icon}</div>
            <h2 className="mt-4 text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card p-10 text-center">
        <h2 className="text-2xl font-bold">Non trovi quello che cerchi?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Ogni progetto è unico. Parlaci della tua esigenza e troveremo la
          soluzione giusta.
        </p>
        <a
          href="mailto:info@magiu.it"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Richiedi una consulenza
        </a>
      </div>
    </div>
  );
}
