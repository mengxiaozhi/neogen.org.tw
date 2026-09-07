"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type JoinDialogProps = {
  label?: string;
  className?: string;
  variant?: "primary" | "outline" | "inverse" | "ghost";
  size?: "default" | "lg" | "icon";
};

const paths = [
  ["參與活動", "加入論壇、工作坊與公共議題討論。"],
  ["提出觀點", "以文章、訪談或提案，讓青年觀點被看見。"],
  ["共同發起", "成為協作夥伴，把一個公共提問變成行動。"],
] as const;

export function JoinDialog({
  label = "加入行動",
  className,
  variant = "primary",
  size = "default",
}: JoinDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant={variant} size={size}>
          {label}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>讓你的觀點，走進公共現場。</DialogTitle>
          <DialogDescription>
            告訴我們你關心的議題與想參與的方式，我們會回覆近期行動與合作資訊。
          </DialogDescription>
        </DialogHeader>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {paths.map(([title, description], index) => (
            <div
              className="grid grid-cols-[2.5rem_1fr] gap-4 py-5"
              key={title}
            >
              <span className="display-font text-2xl text-[var(--orange)]">
                0{index + 1}
              </span>
              <div>
                <h3 className="mb-1 text-base font-bold">{title}</h3>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button asChild size="lg" className={cn("w-full sm:w-auto")}>
          <a href="mailto:neogentaiwan2026@gmail.com?subject=我想加入青年行動">
            <Mail className="size-5" aria-hidden="true" />
            寫信給我們
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
