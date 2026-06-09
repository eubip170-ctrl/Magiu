export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "perche-scegliere-nextjs",
    title: "Perché scegliere Next.js per il tuo sito",
    date: "2026-05-20",
    excerpt:
      "Next.js unisce velocità, SEO e funzionalità lato server. Ecco perché è la scelta ideale per progetti moderni.",
    content: [
      "Next.js è un framework React che permette di costruire siti veloci e applicazioni complete, con rendering lato server e generazione statica integrati.",
      "Il vantaggio principale è la combinazione di prestazioni e flessibilità: pagine statiche velocissime dove serve, contenuti dinamici dove necessario.",
      "Essendo sviluppato da Vercel, il deploy è immediato e ottimizzato, senza configurazioni complesse.",
    ],
  },
  {
    slug: "deploy-su-vercel",
    title: "Come pubblicare un sito su Vercel in pochi minuti",
    date: "2026-05-28",
    excerpt:
      "Dalla repository alla pubblicazione: guida pratica per mettere online il tuo progetto Next.js.",
    content: [
      "Vercel collega direttamente la tua repository GitHub e pubblica il sito a ogni push, in automatico.",
      "Basta importare il progetto, confermare le impostazioni rilevate per Next.js e attendere il primo deploy.",
      "Ogni branch ottiene un'anteprima dedicata, perfetta per testare le modifiche prima di andare in produzione.",
    ],
  },
  {
    slug: "design-che-converte",
    title: "Un design che converte: principi essenziali",
    date: "2026-06-04",
    excerpt:
      "Un bel sito non basta: deve guidare l'utente verso l'azione. Ecco i principi che seguiamo.",
    content: [
      "Gerarchia visiva chiara, call-to-action evidenti e tempi di caricamento ridotti sono alla base di un sito che converte.",
      "La coerenza tra colori, tipografia e tono di voce rafforza la fiducia e l'identità del brand.",
      "Ogni elemento dovrebbe avere uno scopo: se non aiuta l'utente, probabilmente distrae.",
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
