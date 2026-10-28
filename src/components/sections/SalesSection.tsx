"use client";

import Image from "next/image";
import { useRef, type RefObject } from "react";
import { Button } from "@/components/ui/Button";
import {
  LockIcon,
  PackageIcon,
  WarrantyIcon,
} from "@/components/icons/Icons";
import { gsap, useGSAP } from "@/lib/gsap";

type OfferCardProps = {
  recommended?: boolean;
  badgeRef?: RefObject<HTMLSpanElement | null>;
};

function OfferCard({ recommended = false, badgeRef }: OfferCardProps) {
  const isCombo = recommended;
  return (
    <article
      className={`sales-offer relative isolate flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-accent/15 p-5 text-foreground sm:p-6 lg:h-140 lg:rounded-[25px] lg:p-6 ${isCombo ? "sales-offer--recommended" : ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-15%] -z-50 bg-primary/5 rotate-30"
        style={{
          maskImage: "url('/pure-icon-quad.svg')",
          WebkitMaskImage: "url('/pure-icon-quad.svg')",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
      <div className="flex items-start justify-between gap-3 lg:block">
        <p className="text-xs font-bold leading-tight sm:text-sm lg:text-[clamp(20px,1.3vw,28px)] lg:font-medium">
          {isCombo ? "Tratamento Recomendado" : "Tratamento Inicial"}
        </p>
        {isCombo && (
          <span ref={badgeRef} className="sales-mobile-badge shrink-0 rounded bg-foreground px-2 py-1 text-[10px] font-bold leading-none text-background shadow-[0_0_8px_rgba(0,0,0,0.3)] lg:hidden">
            Mais vendido
          </span>
        )}
      </div>

      <div className="mt-2 lg:mt-0">
        <h3 className="text-xl font-bold leading-tight sm:text-2xl lg:text-[clamp(24px,1.6vw,32px)]">
          {isCombo ? "Combo 3 Frascos" : "1 Frasco"}
        </h3>
        <p className="mt-1 max-w-90 text-xs leading-[1.3] text-primary sm:text-sm lg:mt-6 lg:text-base">
          {isCombo
            ? "Máximo resultado para memória, imunidade e clareza mental."
            : "Para testar os benefícios imediatos no dia a dia."}
        </p>
      </div>

      <div className="mt-16 flex flex-1 flex-col justify-end lg:mt-0">
        {isCombo && (
          <p className="mb-1 text-[8px] font-semibold text-foreground/80 sm:text-[10px] lg:text-xs">
            Economize 35% + Frete Grátis
          </p>
        )}
        <p className="whitespace-nowrap text-xl font-bold leading-tight sm:text-2xl lg:text-[clamp(24px,1.6vw,32px)]">
          {isCombo ? "R$ 179,90" : "R$ 89,90"}{" "}
          <span className="text-sm font-normal sm:text-base lg:text-[clamp(18px,1.2vw,24px)]">à vista</span>
        </p>
        <p className="mt-1 text-xs font-semibold leading-tight sm:text-sm lg:text-base">
          ou 12x de {isCombo ? "R$ 19,99" : "R$ 9,99"}
        </p>
        <Button
          href={`/checkout?product=${isCombo ? "combo" : "single"}`}
          className="mt-5 min-h-11 w-full px-4 py-3 text-base sm:text-lg lg:mt-8 lg:min-h-15 lg:max-w-60 lg:text-xl hover:outline-primary/75 focus-visible:outline-primary/75"
        >
          {isCombo ? "Garantir Combo" : "Comprar 1 Frasco"}
        </Button>
      </div>
    </article>
  );
}

const assurances = [
  { Icon: LockIcon, text: "Compra 100% Segura e Criptografada" },
  { Icon: WarrantyIcon, text: "Garantia Incondicional de 30 Dias" },
  { Icon: PackageIcon, text: "Entrega Rastreada para todo o Brasil" },
];

export function SalesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!badgeRef.current) return;
      const media = gsap.matchMedia();
      media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(badgeRef.current, {
          scale: 1.045,
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="vendas"
      aria-labelledby="sales-title"
      className="relative z-10 mx-auto w-full max-w-[1680px] bg-transparent px-8 pb-16 text-foreground sm:px-12 sm:pb-20 lg:px-[3.5%] lg:pb-24 lg:pt-12"
    >
      <header className="mb-8 sm:mb-12 lg:mb-16">
        <h2 id="sales-title" className="max-w-175 text-[clamp(20px,2.5vw,36px)] font-bold leading-tight">
          Escolha o melhor tratamento para a sua rotina
        </h2>
        <p className="mt-4 text-[clamp(14px,1.5vw,20px)] font-medium leading-tight text-primary">
          Comece hoje a cuidar da sua saúde e vitalidade natural.
        </p>
      </header>

      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,1.12fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <div className="relative">
          <OfferCard recommended badgeRef={badgeRef} />
          <div
            role="img"
            aria-label="Mais vendido"
            className="pointer-events-none absolute -right-12 -top-12 z-20 hidden aspect-155/149 w-30 -rotate-15 lg:block xl:w-37.5"
          >
            <Image
              src="/best-seller-badge.svg"
              alt=""
              fill
              sizes="(min-width: 1280px) 150px, 120px"
              className="object-contain"
            />
            <span className="absolute inset-0 flex items-center justify-center text-center text-base font-bold leading-tight text-foreground">
              Mais
              <br />
              vendido
            </span>
          </div>
        </div>

        <div className="relative hidden min-h-162.5 items-center justify-center lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[45%] aspect-square h-[105%] -translate-x-1/2 -translate-y-1/2 bg-surface/50"
            style={{
              maskImage: "url('/pure-icon-single.svg')",
              WebkitMaskImage: "url('/pure-icon-single.svg')",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
          <div className="absolute top-0 z-20 grid grid-cols-3 gap-3 rounded-2xl bg-foreground px-5 py-4 text-center text-background">
            {assurances.map(({ Icon, text }) => (
              <div key={text} className="flex flex-col w-30 items-center gap-3 text-[clamp(8px,0.65vw,12px)] font-medium leading-tight">
                <Icon className="h-6 w-6 stroke-2" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute left-[40%] top-[17.7%] z-10 aspect-square w-[134%] max-w-160 -translate-x-1/2">
            <Image
              src="/concentran-product.webp"
              alt="Frasco do Concentran"
              fill
              sizes="(min-width: 1024px) 38vw, 0px"
              className="object-contain"
            />
          </div>
        </div>

        <OfferCard />
      </div>

      <div className="mt-8 flex flex-col gap-2 rounded-[20px] bg-foreground p-4 text-background lg:hidden">
        {assurances.map(({ Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-xs font-medium leading-tight sm:text-base">
            <Icon className="h-5 w-5 shrink-0 stroke-2" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
