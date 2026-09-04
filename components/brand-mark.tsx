import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]",
        className,
      )}
      aria-label="臺灣新文化青年協會，回到頁首"
    >
      <span className="display-font text-[18px] font-black tracking-[0.08em] transition-colors group-hover:text-[var(--orange)] sm:text-[24px]">
        臺灣新文化青年協會
      </span>
    </a>
  );
}
