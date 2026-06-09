export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);

  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Voto ${full} su 5`}
      title={`${full}/5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={i < full ? "text-yellow-500" : "text-muted/40"}
        >
          ★
        </span>
      ))}
    </span>
  );
}
