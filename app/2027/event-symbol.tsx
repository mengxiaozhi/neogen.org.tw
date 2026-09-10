type EventSymbolProps = {
  variant: "dialogue" | "invitation";
  className?: string;
};

export function EventSymbol({ variant, className }: EventSymbolProps) {
  return (
    <svg
      className={className}
      viewBox={variant === "dialogue" ? "0 0 240 160" : "0 0 240 240"}
      width={240}
      height={variant === "dialogue" ? 160 : 240}
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-event-symbol={variant}
    >
      {variant === "dialogue" ? (
        <>
          <circle cx="88" cy="80" r="48" stroke="#195b32" strokeWidth="12" />
          <circle cx="152" cy="80" r="48" stroke="#e95a08" strokeWidth="12" />
          <path d="m120 60 10 20-10 20-10-20Z" fill="#ffe02c" />
        </>
      ) : (
        <g transform="rotate(-12 120 120)">
          <path
            d="m120 16 17 63 54-30-30 54 63 17-63 17 30 54-54-30-17 63-17-63-54 30 30-54-63-17 63-17-30-54 54 30Zm24 104a24 24 0 1 0-48 0 24 24 0 0 0 48 0Z"
            fill="#ffe02c"
            fillRule="evenodd"
          />
          <circle cx="216" cy="32" r="10" fill="#e95a08" />
        </g>
      )}
    </svg>
  );
}
