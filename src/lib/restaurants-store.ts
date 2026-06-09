import "server-only";
import {
  sampleRestaurants,
  slugify,
  type Restaurant,
  type RestaurantInput,
} from "@/lib/ristoranti";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = "restaurants";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function endpoint(query = ""): string {
  return `${SUPABASE_URL}/rest/v1/${TABLE}${query}`;
}

function headers(extra: Record<string, string> = {}): HeadersInit {
  return {
    apikey: SUPABASE_KEY as string,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/** Converte una riga del database (snake_case) nel tipo Restaurant. */
function fromRow(row: Record<string, unknown>): Restaurant {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    city: row.city as string,
    cuisine: row.cuisine as string,
    rating: Number(row.rating ?? 0),
    visitedAt: String(row.visited_at ?? ""),
    priceRange: (row.price_range as Restaurant["priceRange"]) ?? "€€",
    emoji: (row.emoji as string) ?? "🍽️",
    shortReview: (row.short_review as string) ?? "",
    review: (row.review as string[]) ?? [],
    dishes: (row.dishes as string[]) ?? [],
    photos: (row.photos as string[]) ?? [],
    mapQuery: (row.map_query as string) ?? "",
    website: (row.website as string) || undefined,
  };
}

/** Converte i dati del form in una riga del database (snake_case). */
function toRow(input: RestaurantInput, slug?: string) {
  return {
    ...(slug ? { slug } : {}),
    name: input.name,
    city: input.city,
    cuisine: input.cuisine,
    rating: input.rating,
    visited_at: input.visitedAt,
    price_range: input.priceRange,
    emoji: input.emoji,
    short_review: input.shortReview,
    review: input.review,
    dishes: input.dishes,
    photos: input.photos,
    map_query: input.mapQuery,
    website: input.website ?? null,
  };
}

async function request(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: headers(init?.headers as Record<string, string>),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase ${res.status}: ${detail}`);
  }

  return res;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  if (!isSupabaseConfigured()) return sampleRestaurants;

  const res = await request(endpoint("?select=*&order=visited_at.desc"));
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows.map(fromRow);
}

export async function getRestaurantBySlug(
  slug: string
): Promise<Restaurant | undefined> {
  if (!isSupabaseConfigured()) {
    return sampleRestaurants.find((r) => r.slug === slug);
  }

  const res = await request(
    endpoint(`?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`)
  );
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows[0] ? fromRow(rows[0]) : undefined;
}

export async function getRestaurantById(
  id: string
): Promise<Restaurant | undefined> {
  if (!isSupabaseConfigured()) return undefined;

  const res = await request(
    endpoint(`?id=eq.${encodeURIComponent(id)}&select=*&limit=1`)
  );
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows[0] ? fromRow(rows[0]) : undefined;
}

/** Genera uno slug univoco a partire dal nome. */
async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name) || "ristorante";
  let slug = base;
  let i = 2;
  while (await getRestaurantBySlug(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export async function createRestaurant(
  input: RestaurantInput
): Promise<Restaurant> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato.");
  }

  const slug = await uniqueSlug(input.name);
  const res = await request(endpoint(), {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(toRow(input, slug)),
  });
  const rows = (await res.json()) as Record<string, unknown>[];
  return fromRow(rows[0]);
}

export async function updateRestaurant(
  id: string,
  input: RestaurantInput
): Promise<Restaurant> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato.");
  }

  const res = await request(
    endpoint(`?id=eq.${encodeURIComponent(id)}`),
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(toRow(input)),
    }
  );
  const rows = (await res.json()) as Record<string, unknown>[];
  return fromRow(rows[0]);
}

export async function deleteRestaurant(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato.");
  }

  await request(endpoint(`?id=eq.${encodeURIComponent(id)}`), {
    method: "DELETE",
  });
}
