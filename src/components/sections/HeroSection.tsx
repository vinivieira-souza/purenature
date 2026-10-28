import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowIcon, CheckIcon } from "@/components/icons/Icons";
import { MobileMenu } from "@/components/sections/MobileMenu";
import { HeroLeaf } from "@/components/sections/HeroLeaf";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Fórmula", href: "#formula" },
  { label: "Depoimentos", href: "#depoimentos" },
];

const promises = [
  "Fórmula 100% natural",
  "Livre de glúten e cafeína sintética",
  "Envio rápido para todo o Brasil",
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-207.5 overflow-x-clip overflow-y-visible bg-[#101b00] text-background md:min-h-225 lg:min-h-[min(1150px,100svh)]"
    >
      {/* Camadas decorativas: permanecem atrás de todo o conteúdo. */}
      <Image
        src="/background-com-folhas-upscale.webp"
        alt=""
        fill
        priority
        sizes="100dvw"
        className="-z-30 object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(9,20,0,0.52)_0%,rgba(9,20,0,0.12)_58%,rgba(9,20,0,0.16)_100%)]" />
      <HeroLeaf
        src="/folha-cima.svg"
        width={900}
        height={900}
        rotation={-164.65}
        swing={3}
        className="pointer-events-none absolute right-[-20%] top-[-12%] -z-10 w-[75%] max-w-225 object-contain md:right-[-4%] md:top-[-17%] md:w-[47%] lg:right-[-1%] lg:top-[-21%] lg:w-[43%] xl:bottom-auto xl:left-[51%] xl:right-auto xl:-top-91.25 xl:h-[811.43px] xl:w-[760.11px] xl:max-w-none"
      />
      <HeroLeaf
        src="/folha-baixo.svg"
        width={760}
        height={900}
        rotation={15.15}
        swing={-2.5}
        className="pointer-events-none absolute bottom-[-16%] left-[-14%] -z-10 w-[74%] max-w-190 object-contain md:bottom-[-19%] md:left-[-2%] md:w-[44%] lg:bottom-[-27%] lg:left-[1%] lg:w-[42%] xl:bottom-auto xl:left-0 xl:top-[53%] xl:h-[809.56px] xl:w-[720.29px] xl:max-w-none"
      />

      <header className="relative z-10 mx-auto flex h-15 w-full max-w-[1920px] items-center justify-between bg-[rgba(78,116,0,0.25)] px-4 py-2 shadow-[0_3px_6px_rgba(78,116,0,0.25)] backdrop-blur-[10px] md:h-18 md:px-[4.2%] md:py-2.5 lg:h-20 lg:px-[4.2%]">
        <a
          href="#inicio"
          aria-label="Pure Nature — início"
          className="relative block h-10 w-10 shrink-0 md:h-12 md:w-12 lg:h-15 lg:w-15"
        >
          <Image
            src="/logo1.svg"
            alt="Pure Nature"
            fill
            priority
            sizes="(min-width: 1024px) 60px, (min-width: 768px) 48px, 40px"
            className="object-contain"
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 text-xl font-medium lg:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          href="#vendas"
          className="hidden text-lg py-2 px-5 lg:inline-flex"
        >
          Comprar Agora
        </Button>

        <MobileMenu />
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 px-4 pb-8 pt-12 md:px-[6%] md:pt-22.5 lg:min-h-[calc(min(1150px,100svh)-80px)] lg:grid-cols-2 lg:items-start lg:px-[8.3%] lg:pb-20 lg:pt-26.25">
        <div className="relative z-10 flex max-w-197.5 flex-col items-start">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.25)_58%,transparent_100%)] blur-lg"
          />
          <p className="font-heading leading-[0.5] text-surface text-[clamp(24px,2dvw,42px)]">
            pure nature
          </p>
          <h1 className="font-medium tracking-[-0.035em] text-accent [text-shadow:5px_5px_10px_rgba(0,0,0,0.5)] text-[clamp(32px,3.75dvw,80px)]">
            Mais saúde, mais vida,
            <span className="mt-8 lg:mt-12 xl:mt-16 block font-heading leading-0 tracking-[-0.045em]">
              naturalmente
            </span>
          </h1>
          <p className="mt-4 max-w-147.5 text-surface text-[clamp(16px,1.25dvw,32px)]">
            A fórmula bioativa desenvolvida para restaurar sua vitalidade e concentração diária
          </p>

          <div className="mt-[16dvh] hidden items-center gap-8 lg:flex">
            <Button href="#vendas" className="text-lg py-4 px-8 text-nowrap">
              Garantir meu Concentran
            </Button>
            <a
              href="#beneficios"
              className="inline-flex text-nowrap items-center gap-2 font-bold text-lg transition-colors duration-300 hover:text-accent"
            >
              SAIBA MAIS <ArrowIcon className="size-6 stroke-4" />
            </a>
          </div>

          <ul className="mt-4 hidden space-y-1 text-base font-semibold leading-tight text-background lg:block">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 shrink-0 fill-none stroke-current stroke-3" />
                {promise}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-[8dvh] w-full max-w-152.5 md:mt-51.25 lg:mt-6.25 lg:max-w-175">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[80%] z-0 h-10 w-81 -translate-x-1/2 rounded-[50%] bg-black/70 blur-[10px] lg:left-0 lg:top-[80%] lg:h-25 lg:w-190 lg:translate-x-0 lg:bg-black lg:blur-[50px]"
          />
          <Image
            src="/mockup-concentran-hero.webp"
            alt="Embalagem e frasco do suplemento Concentran com folhas e comprimidos"
            width={1100}
            height={850}
            priority
            sizes="(max-width: 1023px) 90dvw, 48dvw"
            className="relative z-10 h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.25)]"
          />
        </div>

        <div className="relative z-10 mt-[6dvh] flex flex-col items-start lg:hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.25)_58%,transparent_100%)] blur-lg"
          />
          <Button
            href="#vendas" className="py-4 text-base w-full sm:text-lg"
          >
            Garantir meu Concentran
          </Button>
          <ul className="mt-3 ml-2 space-y-2 text-xs font-bold leading-tight sm:text-base">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-2">
                <CheckIcon className="h-3 w-3 shrink-0 fill-none stroke-current stroke-3" />
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
