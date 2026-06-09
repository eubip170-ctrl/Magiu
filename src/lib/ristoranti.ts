export type Restaurant = {
  /** Identificativo del database (assente per gli esempi locali) */
  id?: string;
  slug: string;
  name: string;
  city: string;
  cuisine: string;
  /** Voto da 1 a 5 */
  rating: number;
  /** Data della visita in formato ISO, es. "2026-05-10" */
  visitedAt: string;
  priceRange: "€" | "€€" | "€€€" | "€€€€";
  /** Emoji mostrata come copertina quando non ci sono foto */
  emoji: string;
  shortReview: string;
  /** Recensione completa, un elemento per paragrafo */
  review: string[];
  /** Piatti provati / consigliati */
  dishes: string[];
  /** Percorsi delle foto in /public, es. "/ristoranti/mario-1.jpg" */
  photos: string[];
  /** Indirizzo o "Nome, Città" usato per la mappa incorporata */
  mapQuery: string;
  website?: string;
};

/** Dati di esempio mostrati finché Supabase non è configurato. */
export const sampleRestaurants: Restaurant[] = [
  {
    slug: "trattoria-da-mario",
    name: "Trattoria da Mario",
    city: "Roma, Trastevere",
    cuisine: "Cucina romana",
    rating: 5,
    visitedAt: "2026-05-12",
    priceRange: "€€",
    emoji: "🍝",
    shortReview:
      "Cucina romana autentica in un'atmosfera familiare. La cacio e pepe è tra le migliori provate.",
    review: [
      "Locale piccolo e accogliente nel cuore di Trastevere, gestito con passione da una famiglia del posto.",
      "La cacio e pepe era cremosa al punto giusto e i supplì croccanti e generosi. Servizio cordiale e prezzi onesti.",
      "Da tornarci sicuramente, magari prenotando perché si riempie in fretta.",
    ],
    dishes: ["Cacio e pepe", "Supplì", "Tiramisù"],
    photos: [],
    mapQuery: "Trattoria da Mario, Trastevere, Roma",
  },
  {
    slug: "sushi-zen",
    name: "Sushi Zen",
    city: "Milano, Porta Romana",
    cuisine: "Giapponese",
    rating: 4,
    visitedAt: "2026-04-28",
    priceRange: "€€€",
    emoji: "🍣",
    shortReview:
      "Sushi fresco e presentazione curata. Ottimo per una cena tranquilla e di qualità.",
    review: [
      "Ambiente minimal ed elegante, perfetto per una serata rilassata.",
      "Il pesce era freschissimo e i nigiri ben bilanciati. Qualche attesa tra una portata e l'altra, ma ne è valsa la pena.",
    ],
    dishes: ["Nigiri misto", "Uramaki salmone e avocado", "Mochi"],
    photos: [],
    mapQuery: "Sushi Zen, Porta Romana, Milano",
  },
  {
    slug: "pizzeria-il-vulcano",
    name: "Pizzeria Il Vulcano",
    city: "Napoli, Centro Storico",
    cuisine: "Pizzeria napoletana",
    rating: 5,
    visitedAt: "2026-03-15",
    priceRange: "€",
    emoji: "🍕",
    shortReview:
      "Vera pizza napoletana: impasto leggero, cornicione alto e ingredienti di prima qualità.",
    review: [
      "Una delle migliori pizze mangiate a Napoli. Impasto soffice e ben lievitato, cottura nel forno a legna impeccabile.",
      "La margherita era semplice e perfetta, con pomodoro saporito e fiordilatte filante. Rapporto qualità-prezzo eccezionale.",
    ],
    dishes: ["Margherita", "Marinara", "Frittatina di pasta"],
    photos: [],
    mapQuery: "Pizzeria Il Vulcano, Centro Storico, Napoli",
  },
];

/** Dati che si possono creare/modificare (senza id e slug). */
export type RestaurantInput = Omit<Restaurant, "id" | "slug">;

/** Normalizza e valida i dati del form. Ritorna null se mancano nome o città. */
export function parseRestaurantInput(
  body: Record<string, unknown>
): RestaurantInput | null {
  const name = String(body.name ?? "").trim();
  const city = String(body.city ?? "").trim();
  if (!name || !city) return null;

  const ratingRaw = Number(body.rating);
  const rating = Number.isFinite(ratingRaw)
    ? Math.min(5, Math.max(1, Math.round(ratingRaw)))
    : 5;

  const toArray = (v: unknown) =>
    Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];

  const priceRange = (["€", "€€", "€€€", "€€€€"] as const).includes(
    body.priceRange as RestaurantInput["priceRange"]
  )
    ? (body.priceRange as RestaurantInput["priceRange"])
    : "€€";

  return {
    name,
    city,
    cuisine: String(body.cuisine ?? "").trim(),
    rating,
    visitedAt:
      String(body.visitedAt ?? "").trim() ||
      new Date().toISOString().slice(0, 10),
    priceRange,
    emoji: String(body.emoji ?? "").trim() || "🍽️",
    shortReview: String(body.shortReview ?? "").trim(),
    review: toArray(body.review),
    dishes: toArray(body.dishes),
    photos: toArray(body.photos),
    mapQuery: String(body.mapQuery ?? "").trim(),
    website: String(body.website ?? "").trim() || undefined,
  };
}

export function formatVisit(date: string): string {
  return new Date(date).toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric",
  });
}

/** Costruisce l'URL per la mappa Google Maps incorporata (senza API key) */
export function mapEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&z=15&output=embed`;
}

/** Trasforma un nome in uno slug per l'URL (minuscolo, con trattini). */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
