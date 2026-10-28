import Image from "next/image";
import type { ReactNode } from "react";
import {
  CheckIcon,
  DnaOffIcon,
  SproutIcon,
} from "@/components/icons/Icons";

const formulaPoints = [
  {
    title: "Ingredientes puros selecionados:",
    description: "Extratos naturais sem solventes químicos ou aditivos artificiais.",
  },
  {
    title: "Absorção otimizada:",
    description: "Cápsulas desenvolvidas para liberação gradual e alta biodisponibilidade no organismo.",
  },
  {
    title: "Zero dependência:",
    description: "Sem estimulantes agressivos que sobrecarregam o sistema nervoso.",
  },
];

function FormulaBadge({
  kind,
  children,
  className,
}: {
  kind: "natural" | "synthetic-free";
  children: ReactNode;
  className: string;
}) {
  const Icon = kind === "natural" ? SproutIcon : DnaOffIcon;

  return (
    <div
      className={`absolute z-20 flex aspect-square w-24 flex-col items-center justify-center rounded-full border-[3px] border-accent px-4 text-center text-xs font-semibold lg:font-bold leading-tight text-primary sm:w-28 lg:w-40 lg:text-xl ${className}`}
    >
      <Icon className="mb-2 h-6 w-6 stroke-2 lg:stroke-3 lg:mb-3 lg:h-9 lg:w-9" />
      <span>{children}</span>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="formula"
      aria-labelledby="about-title"
      className="relative z-10 mx-auto w-full max-w-[1680px] bg-transparent px-8 pb-16 pt-12 text-foreground md:px-12 lg:px-[3.5%] lg:pb-24 lg:pt-20"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-12 lg:gap-y-0">
        <div className="relative z-10 max-w-155 lg:col-start-1 lg:row-start-1">
          <h2
            id="about-title"
            className="font-bold leading-tight text-[clamp(20px,2.5vw,36px)]"
          >
            A sabedoria <span className="font-heading font-normal">ancestral</span> combinada à precisão dos bioativos.
          </h2>
          <p className="mt-4 text-[clamp(14px,2vw,20px)] leading-[1.35]">
            Desenvolvemos o Concentran unindo o melhor dos extratos botânicos a dosagens precisas para absorção imediata, entregando resultados reais com máxima segurança biológica.
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-190 items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-147.5">
          <div
            aria-hidden="true"
            className="mt-8 pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-574/640 w-[82%] -translate-x-1/2 -translate-y-1/2 bg-current text-surface opacity-50 lg:w-[85%] lg:mt-0"
            style={{
              maskImage: "url('/pure-icon-double.svg')",
              WebkitMaskImage: "url('/pure-icon-double.svg')",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          />
          <div className="relative z-10 w-full pt-24 sm:pt-28 lg:pt-0">
            <Image
              src="/mockup-concentran-emb.webp"
              alt="Embalagem e frasco do Concentran acompanhados de cápsulas"
              width={1100}
              height={850}
              sizes="(max-width: 1023px) 90vw, 48vw"
              className="relative z-20 mx-auto h-auto w-full object-contain"
            />
            <FormulaBadge kind="natural" className="right-[23%] top-[-5%] sm:right-[27%] lg:right-[7%] lg:top-[-19%]">
              100% natural
            </FormulaBadge>
            <FormulaBadge kind="synthetic-free" className="right-[-1%] top-[18%] sm:right-[1%] lg:right-[-6%] lg:top-[13%]">
              Livre de sintéticos
            </FormulaBadge>
          </div>
        </div>

        <ul className="relative mt-8 z-10 space-y-4 lg:col-start-1 lg:row-start-2 lg:mt-8">
          {formulaPoints.map((point) => (
            <li key={point.title} className="flex items-start gap-3 text-[clamp(12px,2vw,16px)] leading-[1.3]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-background">
                <CheckIcon className="h-4 w-4 stroke-2" />
              </span>
              <p>
                <strong className="font-bold">{point.title}</strong>{" "}
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
