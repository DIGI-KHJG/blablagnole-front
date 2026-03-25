"use client";

import { FadeIn } from "@/components/ui/text-animations";
import { motion } from "framer-motion";
import { Shield, Star } from "lucide-react";
import Image from "next/image";

/** Hero de la page de location (titre, accroches, chiffres clés, visuel). */
export function LocationHeroSection() {
  return (
    <section
      className="relative flex items-center overflow-hidden bg-secondary text-secondary-foreground min-h-[70vh] py-12 lg:py-16"
      aria-labelledby="location-hero-title"
    >
      <div
        className="absolute inset-0 bg-linear-to-br from-secondary via-secondary to-primary/20"
        aria-hidden
      />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-8 md:gap-12 items-center justify-items-center">
          <div className="space-y-6 z-10 w-full max-w-xl md:max-w-none md:text-left text-center">
            <FadeIn delay={0.1}>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Location de véhicules du parc
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1
                id="location-hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance"
              >
                Louez un véhicule,
                <span className="text-primary block">en quelques clics</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg text-secondary-foreground/70 max-w-lg leading-relaxed">
                Réservez un véhicule de service pour vos déplacements
                professionnels. Disponible pour tous les collaborateurs de
                manière simple et sécurisé.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-8 pt-2 justify-center md:justify-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg" aria-hidden>
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">+450</p>
                    <p className="text-sm text-secondary-foreground/60">
                      Collaborateurs actifs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg" aria-hidden>
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">100%</p>
                    <p className="text-sm text-secondary-foreground/60">
                      Réservé aux employés
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <motion.div
            className="relative w-full max-w-md mx-auto md:mx-0 aspect-4/3 md:aspect-auto md:max-w-none md:h-[500px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
          >
            <Image
              src="/misc/location-hero.webp"
              alt="Véhicule du parc Blablagnole disponible à la location"
              className="relative w-full h-auto max-h-[500px] object-cover drop-shadow-2xl rounded-xl"
              fill
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
