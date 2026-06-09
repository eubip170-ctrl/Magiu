import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">
            Mag<span className="text-brand">iu</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Soluzioni digitali su misura: siti web, applicazioni e strategie per
            far crescere la tua attività.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigazione</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/chi-siamo" className="hover:text-foreground">
                Chi siamo
              </Link>
            </li>
            <li>
              <Link href="/servizi" className="hover:text-foreground">
                Servizi
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contatti</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href="mailto:info@magiu.it" className="hover:text-foreground">
                info@magiu.it
              </a>
            </li>
            <li>Italia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted sm:px-6">
          © {year} Magiu. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
