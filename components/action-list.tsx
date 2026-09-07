"use client";

import { useId, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

import type { ActionIndex } from "@/components/action-experience";
import { cn } from "@/lib/utils";

export const actionItems = [
  {
    title: "青年公共論壇",
    description: "邀請不同立場走進同一張桌，練習傾聽、提問與論證。",
  },
  {
    title: "議題研究與倡議",
    description: "從青年視角梳理制度問題，提出可被檢驗的公共主張。",
  },
  {
    title: "新文化內容計畫",
    description: "透過文章、訪談與紀錄，讓多元觀點持續被看見。",
  },
] as const;

type ActionListProps = {
  activeIndex?: ActionIndex;
  className?: string;
  onActiveIndexChange?(index: ActionIndex): void;
};

export function ActionList({
  activeIndex: controlledActiveIndex,
  className,
  onActiveIndexChange,
}: ActionListProps = {}) {
  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] =
    useState<ActionIndex>(0);
  const descriptionPrefix = useId();
  const activeIndex = controlledActiveIndex ?? uncontrolledActiveIndex;

  function selectAction(index: ActionIndex) {
    if (controlledActiveIndex === undefined) {
      setUncontrolledActiveIndex(index);
    }
    onActiveIndexChange?.(index);
  }

  return (
    <div className={cn("border-t border-[var(--ink)]", className)}>
      {actionItems.map((action, index) => {
        const actionIndex = index as ActionIndex;
        const isActive = activeIndex === index;
        const descriptionId = `${descriptionPrefix}-action-${index}`;

        return (
          <button
            type="button"
            key={action.title}
            onClick={() => selectAction(actionIndex)}
            aria-controls={descriptionId}
            aria-expanded={isActive}
            className={cn(
              "group grid w-full grid-cols-[2.75rem_1fr_3rem] items-start gap-4 border-b border-[var(--ink)] px-0 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--orange)] sm:grid-cols-[3rem_1fr_5rem] sm:gap-6",
              isActive && "bg-[var(--paper-soft)]",
            )}
          >
            <span className="display-font text-2xl leading-none sm:text-3xl">
              0{index + 1}
            </span>
            <span>
              <span className="block text-lg font-black tracking-[0.04em] sm:text-xl">
                {action.title}
              </span>
              <span
                id={descriptionId}
                className={cn(
                  "mt-2 block overflow-hidden text-[15px] leading-7 text-[var(--muted)] transition-all duration-300",
                  isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0 sm:max-h-24 sm:opacity-100",
                )}
              >
                {action.description}
              </span>
            </span>
            <span
              className={cn(
                "ml-auto grid size-11 place-items-center transition-colors",
                isActive
                  ? "bg-[var(--orange)] text-white"
                  : "text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white",
              )}
            >
              {isActive ? (
                <ArrowRight className="size-5" aria-hidden="true" />
              ) : (
                <Plus className="size-5" aria-hidden="true" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
