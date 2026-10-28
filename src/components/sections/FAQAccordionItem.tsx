"use client";

import { useId, useState } from "react";
import { ChevronIcon } from "@/components/icons/Icons";

type FAQAccordionItemProps = {
  question: string;
  answer: string;
};

export function FAQAccordionItem({
  question,
  answer,
}: FAQAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const triggerId = `faq-trigger-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div className="border-b border-background/75 px-4">
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left text-sm font-normal leading-snug sm:text-xl lg:py-6 lg:text-xl"
      >
        <span>{question}</span>
        <ChevronIcon
          className={`h-5 w-5 shrink-0 stroke-3 transition-transform duration-500 sm:h-6 sm:w-6${isOpen ? " rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none${isOpen ? " grid-rows-[1fr]" : " grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="max-w-170 pb-5 pr-8 text-xs leading-relaxed text-background/85 sm:text-base lg:pb-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
