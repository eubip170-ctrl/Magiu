import { NextResponse } from "next/server";
import { parseRestaurantInput } from "@/lib/ristoranti";
import { createRestaurant, isSupabaseConfigured } from "@/lib/restaurants-store";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase non è ancora configurato." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const input = parseRestaurantInput(body);
  if (!input) {
    return NextResponse.json(
      { ok: false, error: "Nome e città sono obbligatori." },
      { status: 422 }
    );
  }

  try {
    const restaurant = await createRestaurant(input);
    return NextResponse.json({ ok: true, restaurant }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
