# Foto dei ristoranti

Metti qui le foto dei ristoranti (es. `trattoria-da-mario-1.jpg`).

Poi indicale nel file `src/lib/ristoranti.ts`, nel campo `photos`, con il
percorso che parte da `/ristoranti/`. Esempio:

```ts
photos: ["/ristoranti/trattoria-da-mario-1.jpg", "/ristoranti/trattoria-da-mario-2.jpg"],
```

Se `photos` è vuoto, viene mostrata una copertina con l'emoji del ristorante.
