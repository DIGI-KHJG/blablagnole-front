"use client";

import { FadeIn } from "@/components/ui/text-animations";

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative z-20 flex min-h-0 flex-1 flex-col overflow-hidden py-16 sm:py-20"
    >
      <div className="absolute inset-0 -top-80 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full min-h-full min-w-full object-cover"
          src="/misc/hero-video.mp4"
          aria-hidden
        />
        {/* Superposition noire */}
        <div
          className="absolute inset-0 bg-black/5 pointer-events-none"
          aria-hidden
        />
      </div>

      {/* Fondu blanc flou vers la section suivante */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-24 sm:h-64 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/30 to-white" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="container relative z-20 mx-auto flex flex-1 flex-col max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Contenu hero */}
        <div className="mx-auto flex flex-1 flex-col  max-w-4xl text-center pt-48">
          <FadeIn delay={0.1}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
              Covoiturez entre collègues, simplement.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl font-semibold text-xl text-white text-pretty">
              La plateforme de covoiturage interne qui réduit vos frais de
              trajet et votre empreinte carbone.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
