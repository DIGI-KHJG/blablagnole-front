import { AboutSection } from "@/components/site/about-section";
import { BenefitsSection } from "@/components/site/benefits-section";
import { CtaSection } from "@/components/site/cta-section";
import { FaqSection } from "@/components/site/faq-section";
import { HeroSearchCard } from "@/components/site/hero-search-card";
import { HeroSection } from "@/components/site/hero-section";
import { HowItWorksSection } from "@/components/site/how-it-works-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil - Blablagnole",
  description: "Accueil - Blablagnole",
};

export default function Home() {
  return (
    <main>
      <header className="relative flex h-screen flex-col">
        <HeroSection />
        <HeroSearchCard />
      </header>

      <AboutSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
