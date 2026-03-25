"use client";

import { FadeIn } from "@/components/ui/text-animations";
import { motion } from "framer-motion";
import { CalendarCheck, Car, Search } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Recherchez",
    description:
      "Entrez votre trajet et découvrez les collaborateurs qui font le même chemin.",
  },
  {
    icon: CalendarCheck,
    title: "Reservez",
    description:
      "Choisissez l'offre qui vous convient et réservez votre place.",
  },
  {
    icon: Car,
    title: "Voyagez",
    description: "Retrouvez-vous et partagez la route. Simple, n'est-ce pas ?",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-secondary py-16 sm:py-20 lg:py-24"
    >
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent lg:block" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
              Comment ca marche
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
              En trois étapes, simplement
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/60">
              Rejoindre un covoiturage n&apos;a jamais été aussi simple.
            </p>
          </FadeIn>
        </div>

        {/* Étapes */}
        <div className="relative">
          {/* Ligne de liaison */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-linear-to-r from-transparent via-white/20 to-transparent lg:block" />

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <FadeIn key={step.title} delay={0.1 + index * 0.15}>
                <div className="group relative text-center">
                  {/* Contenu qui monte au hover (sans la flèche) */}
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Numéro d'étape */}
                    <div className="relative mx-auto mb-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + index * 0.15,
                          duration: 0.5,
                          ease: [0.2, 0.65, 0.3, 0.9],
                        }}
                        className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10"
                      >
                        <step.icon className="h-8 w-8 text-primary" />
                      </motion.div>
                    </div>

                    {/* Contenu */}
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mx-auto max-w-xs text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Flèche animée : hors du motion, jamais impactée par le survol */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-4 top-21 hidden lg:block pointer-events-none">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-white/30"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
