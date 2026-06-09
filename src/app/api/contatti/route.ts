import { NextResponse } from "next/server";

type ContactPayload = {
  nome?: string;
  email?: string;
  messaggio?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: ContactPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const nome = data.nome?.trim();
  const email = data.email?.trim();
  const messaggio = data.messaggio?.trim();

  const errors: Record<string, string> = {};
  if (!nome) errors.nome = "Il nome è obbligatorio.";
  if (!email || !EMAIL_REGEX.test(email))
    errors.email = "Inserisci un'email valida.";
  if (!messaggio || messaggio.length < 10)
    errors.messaggio = "Il messaggio deve contenere almeno 10 caratteri.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // In un progetto reale qui invieresti un'email, salveresti su database
  // o richiameresti un servizio esterno. Per ora registriamo a console.
  console.log("Nuovo contatto ricevuto:", { nome, email, messaggio });

  return NextResponse.json(
    { ok: true, message: "Messaggio ricevuto. Ti ricontatteremo presto!" },
    { status: 200 }
  );
}
