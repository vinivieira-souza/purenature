"use client";

import type { ReactNode } from "react";
import "@/lib/gsap";

export function GsapProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
