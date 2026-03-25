"use client";

import { StatsSection } from "@/components/site/stats-section";
import { FadeIn } from "@/components/ui/text-animations";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Dégradé de fond */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-accent/20 to-background" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Contenu gauche */}
          <div>
            <FadeIn>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Pourquoi Blablagnole ?
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Née d&apos;un besoin concret
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Blablagnole est née d&apos;une observation simple : chaque jour,
                des centaines de collaborateurs font le même trajet, seuls dans
                leur voiture. Les parkings débordent, les frais
                s&apos;accumulent, et l&apos;empreinte carbone grimpe.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                Nous avons créé cette plateforme pour simplifier vos trajets
                quotidiens, réduire vos coûts et créer du lien entre les équipes
                de différents sites.
                <span className="font-medium text-foreground">
                  {" "}
                  100% interne, 100% confiance
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-500" />
                  Exclusif aux employés
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-primary" />
                  100% sécurisé
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Droite - Interface type app */}
          <FadeIn delay={0.2} direction="left">
            <div className="relative">
              {/* Lueur de fond */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 opacity-50 blur-2xl" />

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-xl"
              >
                {/* En-tête */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-primary/70" />
                    <div>
                      <p className="font-semibold text-foreground">Marie L.</p>
                      <p className="text-sm text-muted-foreground">
                        4.9 - 48 trajets
                      </p>
                    </div>
                  </div>
                </div>

                {/* Itinéraire */}
                <div className="mb-6 rounded-xl bg-primary/10 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="my-1 h-8 w-0.5 bg-primary/80" />
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <MapPin className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Départ</p>
                        <p className="font-medium text-foreground">
                          Toulouse - Balma
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Arrivée</p>
                        <p className="font-medium text-foreground">
                          Bordeaux - Merignac
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Détails */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold bg-white border-2 border-primary rounded-full px-4 py-2">
                    <Clock className="h-4 w-4 text-primary" strokeWidth={3} />
                    <span className="text-sm">Lun. 15 mars - 08:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold bg-white border-2 border-primary rounded-full px-4 py-2">
                    <Users className="h-4 w-4 text-primary" strokeWidth={3} />
                    <span className="text-sm">3 places disponibles</span>
                  </div>
                </div>

                {/* Prix et CTA */}
                <div className="flex items-center justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-primary/25"
                  >
                    Reserver
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
      <StatsSection />
    </section>
  );
}
