import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Scopri chi è Magiu: il team, i valori e il modo in cui trasformiamo le idee in prodotti digitali.",
};

const VALUES = [
  {
    title: "Qualità",
    text: "Codice pulito, design curato e attenzione ai dettagli in ogni progetto.",
  },
  {
    title: "Trasparenza",
    text: "Comunicazione chiara, tempi e costi definiti fin dall'inizio.",
  },
  {
    title: "Collaborazione",
    text: "Lavoriamo al tuo fianco, ascoltando obiettivi ed esigenze reali.",
  },
];

export default function ChiSiamoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Chi siamo</h1>
      <p className="mt-6 text-lg text-muted">
        Magiu nasce dalla passione per il web e la tecnologia. Aiutiamo aziende e
        professionisti a portare online le proprie idee con prodotti digitali
        veloci, affidabili e curati nel design.
      </p>
      <p className="mt-4 text-lg text-muted">
        Dal primo schizzo alla pubblicazione, seguiamo ogni fase del progetto con
        un approccio pratico e orientato ai risultati.
      </p>

      <h2 className="mt-16 text-2xl font-bold">I nostri valori</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {VALUES.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold text-brand">{v.title}</h3>
            <p className="mt-2 text-sm text-muted">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
