"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type HeroLeafProps = {
  src: string;
  width: number;
  height: number;
  className: string;
  rotation: number;
  swing: number;
};

export function HeroLeaf({
  src,
  width,
  height,
  className,
  rotation,
  swing,
}: HeroLeafProps) {
  const leafRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const leaf = leafRef.current;
    if (!leaf) return;

    gsap.set(leaf, { rotation, transformOrigin: "center center" });

    const media = gsap.matchMedia();
    media.add(
      {
        reducedMotion: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (context.conditions?.reducedMotion) {
          gsap.set(leaf, { rotation });
          return;
        }

        const entrance = gsap.timeline();
        entrance
          .to(leaf, {
            rotation: rotation + swing,
            duration: 0.4,
            ease: "sine.inOut",
          })
          .to(leaf, {
            rotation,
            duration: 0.55,
            ease: "sine.inOut",
          });

        return undefined;
      },
    );

    return () => media.revert();
  });

  return (
    <Image
      ref={leafRef}
      src={src}
      alt=""
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}
