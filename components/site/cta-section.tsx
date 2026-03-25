"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/text-animations";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Dégradé de fond */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-secondary" />

      {/* Éléments décoratifs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
            Rejoignez-nous
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
            Prêt à partager la route ?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white">
            Rejoignez les 450 collaborateurs qui roulent déjà ensemble.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Link href="/results">
            <Button variant="outline" size="lg" className="text-lg">
              Commencer dès maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
