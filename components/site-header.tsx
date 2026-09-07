"use client";

import { Menu } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { JoinDialog } from "@/components/join-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  ["關於我們", "#about"],
  ["行動議題", "#actions"],
  ["2027 青年參議院", "/2027"],
  ["青年投稿", "mailto:neogentaiwan2026@gmail.com?subject=青年投稿"],
] as const;

export function SiteHeader() {
  return (
    <header data-gsap-header className="relative z-40 bg-white">
      <div className="site-container flex min-h-[78px] items-center justify-between border-b-2 border-[var(--ink)] py-4 lg:min-h-[92px]">
        <BrandMark />

        <div className="hidden items-center gap-8 lg:flex">
          <nav aria-label="主要導覽">
            <ul className="flex items-center gap-8">
              {navItems.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="nav-link text-[15px] font-bold tracking-[0.08em]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <JoinDialog />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="開啟選單"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="inset-y-0 left-auto right-0 top-0 h-dvh w-[min(90vw,420px)] max-w-none translate-x-0 translate-y-0 content-start border-y-0 border-r-0 px-7 py-8"
            aria-describedby={undefined}
          >
            <DialogTitle className="text-2xl">選單</DialogTitle>
            <nav aria-label="行動版導覽" className="mt-10">
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {navItems.map(([label, href], index) => (
                  <li key={label}>
                    <DialogClose asChild>
                      <a
                        href={href}
                        className="group flex items-center justify-between py-5 text-xl font-bold"
                      >
                        {label}
                        <span className="display-font text-lg text-[var(--orange)]">
                          0{index + 1}
                        </span>
                      </a>
                    </DialogClose>
                  </li>
                ))}
              </ul>
            </nav>
            <JoinDialog className="mt-8 w-full" size="lg" />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
