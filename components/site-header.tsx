"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { AssociationLogo } from "@/components/association-logo";
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pendingNavTargetRef = useRef<string | null>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileNavOpen(false);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <header data-gsap-header className="relative z-40 bg-white">
      <div className="site-container flex min-h-[78px] items-center justify-between border-b-2 border-[var(--ink)] py-4 lg:min-h-[92px]">
        <BrandMark eager />

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

        <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="group lg:hidden"
              aria-label="開啟選單"
            >
              <Menu
                className="size-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                aria-hidden="true"
              />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="mobile-nav-panel inset-0 left-0 top-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 content-start gap-0 overflow-y-auto border-0 bg-[var(--ink)] p-0 text-white shadow-none"
            aria-describedby={undefined}
            showCloseButton={false}
            onCloseAutoFocus={(event) => {
              const targetSelector = pendingNavTargetRef.current;

              if (!targetSelector) return;

              event.preventDefault();
              pendingNavTargetRef.current = null;
              window.requestAnimationFrame(() => {
                document
                  .querySelector<HTMLElement>(targetSelector)
                  ?.focus({ preventScroll: true });
              });
            }}
          >
            <DialogTitle className="sr-only">網站選單</DialogTitle>

            <div className="mobile-nav-decoration" aria-hidden="true">
              <span>PUBLIC</span>
              <span>CULTURE</span>
            </div>

            <div className="mobile-nav-shell">
              <div className="mobile-nav-topbar">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center bg-white p-0.5">
                    <AssociationLogo variant="main" eager className="size-full" />
                  </span>
                  <span className="display-font max-w-[10.5rem] text-[16px] font-black leading-snug tracking-[0.06em] min-[390px]:max-w-none min-[390px]:text-[19px] min-[390px]:tracking-[0.08em]">
                    臺灣新文化青年協會
                  </span>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mobile-nav-close shrink-0 border-white/45 bg-transparent text-white hover:border-[var(--orange)] hover:bg-[var(--orange)] hover:text-white"
                    aria-label="關閉選單"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Button>
                </DialogClose>
              </div>

              <div className="mobile-nav-heading" aria-hidden="true">
                <span>MENU</span>
                <span>01—04</span>
              </div>

              <nav aria-label="行動版導覽" className="mobile-nav-main">
                <ul className="mobile-nav-list">
                  {navItems.map(([label, href], index) => (
                    <li
                      className="mobile-nav-item"
                      key={label}
                      style={{ "--nav-index": index } as CSSProperties}
                    >
                      <DialogClose asChild>
                        <a
                          href={href}
                          className="mobile-nav-link group"
                          onClick={() => {
                            pendingNavTargetRef.current = href.startsWith("#")
                              ? href
                              : null;
                          }}
                        >
                          <span className="mobile-nav-index">
                            0{index + 1}
                          </span>
                          <span className="mobile-nav-label">{label}</span>
                          <ArrowUpRight
                            className="mobile-nav-arrow size-5"
                            aria-hidden="true"
                          />
                        </a>
                      </DialogClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mobile-nav-footer">
                <div>
                  <p className="display-font text-2xl font-black leading-snug min-[390px]:text-3xl">
                    以青年之聲，
                    <br />
                    寫臺灣新章。
                  </p>
                  <a
                    className="mt-3 inline-block text-xs tracking-[0.12em] text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                    href="mailto:neogentaiwan2026@gmail.com"
                  >
                    neogentaiwan2026@gmail.com
                  </a>
                </div>
                <JoinDialog
                  className="mobile-nav-cta w-full min-[430px]:w-auto"
                  size="lg"
                  variant="inverse"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
