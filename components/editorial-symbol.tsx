type EditorialSymbolProps = {
  variant: "voice" | "dialogue" | "action" | "invitation";
  className?: string;
};

export function EditorialSymbol({
  variant,
  className,
}: EditorialSymbolProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-editorial-symbol={variant}
      fill="none"
      focusable="false"
      height={160}
      viewBox="0 0 160 160"
      width={160}
    >
      {variant === "voice" && (
        <>
          <circle cx="80" cy="80" r="13" stroke="currentColor" strokeWidth="4" />
          <circle cx="80" cy="80" r="5" fill="var(--symbol-accent, var(--orange))" />
          <path
            d="M55 55a35 35 0 0 0 0 50M105 55a35 35 0 0 1 0 50M38 38a59 59 0 0 0 0 84M122 38a59 59 0 0 1 0 84"
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="4"
          />
        </>
      )}

      {variant === "dialogue" && (
        <>
          <circle cx="61" cy="80" r="38" stroke="currentColor" strokeWidth="4" />
          <circle cx="99" cy="80" r="38" stroke="currentColor" strokeWidth="4" />
          <path
            d="m80 58 11 22-11 22-11-22Z"
            fill="var(--symbol-accent, var(--orange))"
          />
        </>
      )}

      {variant === "action" && (
        <>
          <path
            d="M30 126 126 30M82 30h44v44"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="4"
          />
          <circle cx="31" cy="126" r="9" stroke="currentColor" strokeWidth="4" />
          <circle
            cx="80"
            cy="80"
            r="7"
            fill="var(--symbol-accent, var(--orange))"
          />
        </>
      )}

      {variant === "invitation" && (
        <>
          <path
            d="M80 15v130M15 80h130M34 34l92 92M126 34l-92 92"
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="3"
          />
          <circle cx="80" cy="80" r="22" fill="currentColor" />
          <circle
            cx="80"
            cy="80"
            r="8"
            fill="var(--symbol-accent, var(--orange))"
          />
        </>
      )}
    </svg>
  );
}
