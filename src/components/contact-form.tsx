"use client";

import { useState } from "react";

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      messaggio: formData.get("messaggio"),
    };

    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        const firstError =
          data.errors && typeof data.errors === "object"
            ? Object.values(data.errors)[0]
            : data.error;
        setStatus({
          type: "error",
          message: (firstError as string) ?? "Si è verificato un errore.",
        });
        return;
      }

      setStatus({ type: "success", message: data.message });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Impossibile inviare il messaggio. Riprova più tardi.",
      });
    }
  }

  const loading = status.type === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:border-brand"
          placeholder="Il tuo nome"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:border-brand"
          placeholder="nome@email.it"
        />
      </div>

      <div>
        <label htmlFor="messaggio" className="block text-sm font-medium">
          Messaggio
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-none focus:border-brand"
          placeholder="Raccontaci il tuo progetto..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Invio in corso..." : "Invia messaggio"}
      </button>

      {status.type === "success" && (
        <p className="rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 text-sm">
          {status.message}
        </p>
      )}
      {status.type === "error" && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {status.message}
        </p>
      )}
    </form>
  );
}
