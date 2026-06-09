# Magiu

Sito web di **Magiu** costruito con [Next.js 16](https://nextjs.org) (App Router),
TypeScript e Tailwind CSS, pronto per la pubblicazione su [Vercel](https://vercel.com).

## Funzionalità

- **Home** — landing page con hero, funzionalità e call-to-action
- **Chi siamo** — presentazione e valori
- **Servizi** — elenco dei servizi offerti
- **Blog** — elenco articoli e pagine articolo dinamiche (`/blog/[slug]`, generate staticamente)

I contatti avvengono tramite link email (`mailto:`) presenti nell'header, nel footer e nelle call-to-action.

## Struttura del progetto

```
src/
├── app/
│   ├── layout.tsx          # Layout root (Navbar + Footer, metadata SEO)
│   ├── page.tsx            # Home
│   ├── chi-siamo/          # Pagina "Chi siamo"
│   ├── servizi/            # Pagina "Servizi"
│   └── blog/               # Elenco blog + [slug] dinamico
├── components/             # Navbar, Footer
└── lib/posts.ts            # Dati di esempio degli articoli
```

## Sviluppo locale

```bash
npm install      # installa le dipendenze
npm run dev      # avvia il server di sviluppo su http://localhost:3000
npm run build    # build di produzione
npm run start    # avvia la build di produzione
npm run lint     # esegue ESLint
```

## Pubblicazione su Vercel

1. Vai su [vercel.com/new](https://vercel.com/new) e accedi con il tuo account GitHub.
2. Importa la repository **Magiu**.
3. Vercel riconosce automaticamente Next.js: lascia le impostazioni predefinite
   (Build Command `next build`, nessuna configurazione extra) e premi **Deploy**.
4. Al termine il sito sarà online su un dominio `*.vercel.app`; potrai poi
   collegare un dominio personalizzato dalle impostazioni del progetto.

A ogni `git push` sul branch principale Vercel ripubblica automaticamente il sito,
e ogni branch ottiene un'anteprima dedicata.

> Le eventuali variabili d'ambiente vanno aggiunte in **Project Settings → Environment Variables** su Vercel.
