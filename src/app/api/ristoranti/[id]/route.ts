import { NextResponse } from "next/server";
import { parseRestaurantInput } from "@/lib/ristoranti";
import {
  updateRestaurant,
  deleteRestaurant,
  isSupabaseConfigured,
} from "@/lib/restaurants-store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase non è ancora configurato." },
      { status: 503 }
    );
  }

  const { id } = await params;

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
    const restaurant = await updateRestaurant(id, input);
    return NextResponse.json({ ok: true, restaurant });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase non è ancora configurato." },
      { status: 503 }
    );
  }

  const { id } = await params;

  try {
    await deleteRestaurant(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
