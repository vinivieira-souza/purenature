import type { AnchorHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full bg-primary font-[var(--font-rem)] font-bold text-background shadow-[2px_2px_5px_rgba(255,255,255,0.3),inset_2px_2px_8px_rgba(255,255,255,0.3)] outline-0 outline-transparent transition-[outline-color,outline-offset,outline-width] duration-300 hover:outline-2 hover:outline-offset-4 hover:outline-[#e7f58c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7f58c]";

  return (
    <a
      className={twMerge(baseClasses, className)}
      {...props}
    >
      {children}
    </a>
  );
}
