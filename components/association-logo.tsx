import Image from "next/image";

import eventLogo from "@/public/brand/association-logo-event.png";
import mainLogo from "@/public/brand/association-logo-main.png";

import { cn } from "@/lib/utils";

type AssociationLogoProps = {
  alt?: string;
  className?: string;
  eager?: boolean;
  variant?: "main" | "event";
};

export function AssociationLogo({
  alt = "",
  className,
  eager = false,
  variant = "main",
}: AssociationLogoProps) {
  return (
    <Image
      src={variant === "event" ? eventLogo : mainLogo}
      alt={alt}
      className={cn("block h-auto w-full select-none", className)}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      sizes="(max-width: 760px) 48px, 56px"
    />
  );
}
