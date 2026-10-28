import type { Metadata } from "next";
import { REM, Borel } from "next/font/google";
import { GsapProvider } from "@/components/GsapProvider";
import "./globals.css";

const fontBorel = Borel({
  variable: "--font-borel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fontRem = REM({
  variable: "--font-rem",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pure Nature | Concentran",
  description:
    "Conheça o Concentran, a fórmula bioativa da Pure Nature para sua rotina.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fontBorel.variable} ${fontRem.variable} h-full antialiased`}>
      <body className="min-h-full">
        <GsapProvider>{children}</GsapProvider>
      </body>
    </html>
  );
}
