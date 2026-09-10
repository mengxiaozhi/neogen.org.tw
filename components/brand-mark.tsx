import { AssociationLogo } from "@/components/association-logo";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  eager = false,
}: {
  className?: string;
  eager?: boolean;
}) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] sm:gap-3",
        className,
      )}
      aria-label="臺灣新文化青年協會，回到頁首"
    >
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden sm:size-12">
        <AssociationLogo
          variant="main"
          eager={eager}
          className="size-full transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105"
        />
      </span>
      <span className="display-font text-[16px] font-black tracking-[0.06em] transition-colors group-hover:text-[var(--orange)] min-[380px]:text-[18px] sm:text-[24px] sm:tracking-[0.08em]">
        臺灣新文化青年協會
      </span>
    </a>
  );
}
