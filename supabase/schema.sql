-- Tabella dei ristoranti per il sito Magiu.
-- Esegui questo codice nel SQL Editor di Supabase (una sola volta).

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text not null,
  cuisine text not null default '',
  rating int not null default 5,
  visited_at date not null default now(),
  price_range text not null default '€€',
  emoji text not null default '🍽️',
  short_review text not null default '',
  review text[] not null default '{}',
  dishes text[] not null default '{}',
  photos text[] not null default '{}',
  map_query text not null default '',
  website text,
  created_at timestamptz not null default now()
);
