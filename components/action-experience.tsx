"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { ActionList } from "@/components/action-list";
import { InteractiveActionOrbit } from "@/components/interactive-action-orbit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ActionIndex = 0 | 1 | 2;

type ActionExperienceProps = {
  className?: string;
  defaultActiveIndex?: ActionIndex;
};

/**
 * Owns the small piece of shared state that keeps the accessible action list
 * and its progressively enhanced Three.js visual in sync.
 */
export function ActionExperience({
  className,
  defaultActiveIndex = 0,
}: ActionExperienceProps = {}) {
  const [activeIndex, setActiveIndex] = useState<ActionIndex>(defaultActiveIndex);

  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-[1.05fr_0.9fr] lg:gap-20",
        className,
      )}
    >
      <figure
        data-gsap-reveal
        data-gsap-direction="left"
        className="editorial-frame relative order-2 lg:order-1"
      >
        <InteractiveActionOrbit
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />
        <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-[var(--ink)] pb-3 text-xs font-bold tracking-[0.14em] text-[var(--muted)]">
          <span>公共對話軌道</span>
          <span>THINK · SPEAK · ACT</span>
        </figcaption>
      </figure>

      <div
        data-gsap-reveal
        data-gsap-direction="right"
        className="order-1 lg:order-2"
      >
        <h2 className="display-font text-[clamp(2.65rem,4.7vw,5.5rem)] font-black leading-[1.12] tracking-[-0.055em] text-balance">
          讓思考成為行動，
          <br />
          讓行動進入公共。
        </h2>
        <div className="my-7 h-px w-56 bg-[var(--ink)]" />
        <p className="mb-9 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          從議題討論、青年培力到公共倡議，我們把關心變成可以一起參與的現場。
        </p>
        <ActionList
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />
        <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
          <a href="mailto:neogentaiwan2026@gmail.com?subject=我想探索行動議題">
            探索行動議題
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}
