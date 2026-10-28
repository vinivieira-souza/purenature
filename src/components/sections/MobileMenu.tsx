"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Fórmula", href: "#formula" },
  { label: "Depoimentos", href: "#depoimentos" },
];

type TriggerPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerPosition, setTriggerPosition] =
    useState<TriggerPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeAnimationRef = useRef<(() => void) | null>(null);
  const pendingNavigationRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const href = pendingNavigationRef.current;
      pendingNavigationRef.current = null;

      if (href) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          window.history.pushState(null, "", href);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        pendingNavigationRef.current = null;

        if (closeAnimationRef.current) {
          closeAnimationRef.current();
        } else {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const requestClose = (href?: string) => {
    pendingNavigationRef.current = href ?? null;

    if (closeAnimationRef.current) {
      closeAnimationRef.current();
    } else {
      closeMenu();
    }
  };
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();

    setTriggerPosition({ top, left, width, height });
    setIsOpen(true);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Abrir menu de navegação"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={openMenu}
        className="inline-flex size-12 shrink-0 items-center justify-center text-surface lg:hidden"
      >
        <span aria-hidden="true" className="relative size-8">
          <span className="menu-icon-line absolute left-1/2 top-1.75 h-0.5 w-6 -translate-x-1/2 rounded-full bg-current" />
          <span className="menu-icon-line absolute left-1/2 top-3.75 h-0.5 w-6 -translate-x-1/2 rounded-full bg-current" />
          <span className="menu-icon-line absolute left-1/2 top-5.75 h-0.5 w-6 -translate-x-1/2 rounded-full bg-current" />
        </span>
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <MobileMenuPanel
            triggerPosition={triggerPosition}
            closeAnimationRef={closeAnimationRef}
            closeMenu={() => requestClose()}
            navigateAfterClose={requestClose}
            onCloseComplete={closeMenu}
          />,
          document.body,
        )}
    </>
  );
}

function MobileMenuPanel({
  triggerPosition,
  closeAnimationRef,
  closeMenu,
  navigateAfterClose,
  onCloseComplete,
}: {
  triggerPosition: TriggerPosition | null;
  closeAnimationRef: { current: (() => void) | null };
  closeMenu: () => void;
  navigateAfterClose: (href: string) => void;
  onCloseComplete: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const lines = gsap.utils.toArray<HTMLElement>(".menu-icon-line", panel);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(lines, { clearProps: "all" });
        closeAnimationRef.current = onCloseComplete;

        return () => {
          if (closeAnimationRef.current === onCloseComplete) {
            closeAnimationRef.current = null;
          }
        };
      }

      const closeIconDelay = 0.25;
      const timeline = gsap.timeline();
      timeline.fromTo(
        panel,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: "power3.out" },
      );
      timeline
        .to(lines[0], { y: 8, rotation: 45, duration: 0.25 }, closeIconDelay)
        .to(lines[1], { autoAlpha: 0, duration: 0.15 }, closeIconDelay)
        .to(lines[2], { y: -8, rotation: -45, duration: 0.25 }, closeIconDelay);

      timeline.eventCallback("onReverseComplete", onCloseComplete);
      const reverseTimeline = () => timeline.reverse();
      closeAnimationRef.current = reverseTimeline;

      return () => {
        if (closeAnimationRef.current === reverseTimeline) {
          closeAnimationRef.current = null;
        }
      };
    },
    { scope: panelRef },
  );

  return (
    <div
      ref={panelRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className="fixed inset-x-0 top-0 z-100 flex h-dvh flex-col items-center overflow-y-auto bg-background px-4 pb-[11.5svh] text-foreground lg:hidden"
    >
      <button
        type="button"
        aria-label="Fechar menu de navegação"
        onClick={closeMenu}
        className="absolute inline-flex items-center justify-center text-primary"
        style={
          triggerPosition
            ? {
                top: triggerPosition.top,
                left: triggerPosition.left,
                width: triggerPosition.width,
                height: triggerPosition.height,
              }
            : undefined
        }
      >
        <span aria-hidden="true" className="relative size-8">
          <span className="menu-icon-line absolute left-1/2 top-1.75 h-0.5 w-6 -translate-x-1/2 rounded-full bg-current" />
          <span className="menu-icon-line absolute left-1/2 top-3.75 h-0.5 w-6 -translate-x-1/2 rounded-full bg-current" />
          <span className="menu-icon-line absolute left-1/2 top-5.75 h-0.5 w-6 -translate-x-1/2 rounded-full bg-current" />
        </span>
      </button>

      <div className="flex w-full flex-col items-center pt-[14dvh]">
        <a
          href="#inicio"
          onClick={(event) => {
            event.preventDefault();
            navigateAfterClose("#inicio");
          }}
          aria-label="Pure Nature — início"
          className="relative block h-32 w-26.75 shrink-0"
        >
          <Image
            src="/logo2.svg"
            alt="Pure Nature"
            fill
            priority
            sizes="107px"
            className="object-contain"
          />
        </a>

        <h2 className="mt-4 max-w-63 text-center font-body text-xl font-semibold leading-tight">
          Como posso te ajudar hoje?
        </h2>
      </div>

      <nav
        aria-label="Navegação mobile"
        className="mt-[8dvh] flex w-full max-w-82 flex-col gap-4"
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
              navigateAfterClose(item.href);
            }}
            className="flex h-10 w-full shrink-0 items-center border-b border-foreground px-4 pb-px font-body text-xl font-medium leading-6.25 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Button
        href="#vendas"
        onClick={(event) => {
          event.preventDefault();
          navigateAfterClose("#vendas");
        }}
        className="mt-7 h-12 w-full max-w-82 shrink-0 text-xl"
      >
        Comprar Agora
      </Button>
    </div>
  );
}
