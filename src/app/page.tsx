import { AboutSection } from "@/components/sections/AboutSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonySection } from "@/components/sections/TestimonySection";
import { SalesSection } from "@/components/sections/SalesSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <AboutSection />
      <TestimonySection />
      <SalesSection />
      <FooterSection />
    </main>
  );
}
