"use client";

import { useRef } from "react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { gsap, useGSAP } from "@/lib/gsap";

const testimonials = [
  {
    name: "Mariana Silveira",
    age: 34,
    quote:
      "Depois de duas semanas tomando o Concentran, o cansaço mental no fim da tarde simplesmente desapareceu. Consigo manter o foco no trabalho sem aquela palpitação típica de energéticos.",
  },
  {
    name: "Helena Castro",
    age: 42,
    quote:
      "Uma alternativa natural de verdade que cumpre o que promete. Minha saúde mental e disposição nunca estiveram tão alinhadas.",
  },
  {
    name: "João Carlos",
    age: 68,
    quote:
      "Sinto muito mais clareza no raciocínio e energia limpa pela manhã. A diferença na memória e na imunidade foi nítida no meu dia a dia.",
  },
];

export function TestimonySection() {
  const loopedTestimonials = [...testimonials, ...testimonials];
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktopTimelineRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const media = gsap.matchMedia();
      media.add(
        {
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          desktopTimelineRef.current = null;

          if (context.conditions?.desktop) {
            desktopTimelineRef.current = gsap.fromTo(
              track,
              { x: 0 },
              {
                x: () => -track.scrollWidth / 2,
                duration: 30,
                ease: "none",
                repeat: -1,
              },
            );
          }

          if (context.conditions?.mobile) {
            const mobileCards = gsap.utils
              .toArray<HTMLElement>(".testimonials-item", track)
              .slice(0, testimonials.length);
            const timeline = gsap.timeline({ repeat: -1 });

            timeline.to(track, { duration: 3 });

            mobileCards.slice(1).forEach((card) => {
              timeline
                .to(track, {
                  x: () => -card.offsetLeft,
                  duration: 0.65,
                  ease: "power2.inOut",
                })
                .to(track, { duration: 3 });
            });

            timeline.to(track, {
              x: 0,
              duration: 0.65,
              ease: "power2.inOut",
            });
          }
        },
      );

      return () => {
        desktopTimelineRef.current = null;
        media.revert();
      };
    },
    { scope: sectionRef },
  );

  function pauseDesktopCarousel() {
    desktopTimelineRef.current?.pause();
  }

  function resumeDesktopCarousel() {
    if (
      !isHoveredRef.current &&
      !sectionRef.current?.contains(document.activeElement)
    ) {
      desktopTimelineRef.current?.resume();
    }
  }

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      aria-labelledby="testimony-title"
      className="relative w-full overflow-hidden bg-transparent pb-16 pt-2 text-foreground sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <div className="mx-auto mb-8 w-full max-w-[1920px] px-6 sm:mb-12 sm:px-12 lg:mb-17 lg:px-30">
        <p className="font-heading text-xs leading-tight text-primary sm:text-lg lg:text-xl">
          Histórias reais, resultados reais.
        </p>
        <h2
          id="testimony-title"
          className="max-w-190 font-medium leading-[1.18] lg:mt-4 text-[clamp(20px,2.5vw,36px)]"
        >
          Veja como o <span className="font-bold">Concentran</span> transforma o dia a dia de quem busca viver melhor.
        </h2>
      </div>

      <div
        className="testimonials-viewport w-full"
        aria-label="Depoimentos de clientes"
        onMouseEnter={() => {
          isHoveredRef.current = true;
          pauseDesktopCarousel();
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          resumeDesktopCarousel();
        }}
        onFocus={pauseDesktopCarousel}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            resumeDesktopCarousel();
          }
        }}
      >
        <div
          ref={trackRef}
          className="testimonials-track flex w-max items-stretch"
          role="list"
        >
          {loopedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="testimonials-item shrink-0"
              role="listitem"
              aria-hidden={index >= testimonials.length}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
