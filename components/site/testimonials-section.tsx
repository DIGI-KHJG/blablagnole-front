"use client";

import { FadeIn } from "@/components/ui/text-animations";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    role: "Comptabilité",
    site: "Site de Toulouse",
    quote:
      "J'économise 150€ par mois et j'ai rencontré des gens formidables d'autres services.",
    avatar: "SM",
    rating: 5,
  },
  {
    name: "Karim B.",
    role: "Développeur",
    site: "Site de Bordeaux",
    quote:
      "45 minutes seul dans ma voiture, c'est fini. A trois, la route passe en un éclair !",
    avatar: "KB",
    rating: 5,
  },
  {
    name: "Claire D.",
    role: "Ressources humaines",
    site: "Site de Montpellier",
    quote:
      "Je le recommande à tous les nouveaux arrivants. C'est un vrai outil de cohésion.",
    avatar: "CD",
    rating: 5,
  },
  {
    name: "Antoine R.",
    role: "Chef de projet",
    site: "Site de Lyon",
    quote: "L'application est tellement simple. En 30 secondes c'est réservée.",
    avatar: "AR",
    rating: 5,
  },
  {
    name: "Nadia L.",
    role: "Assistante de direction",
    site: "Site de Narbonne",
    quote:
      "Le parking du site était un cauchemar. Depuis Blablagnole, on respire.",
    avatar: "NL",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/30 via-background to-background" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Témoignages
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Ils roulent ensemble
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Découvrez ce que nos collaborateurs pensent de Blablagnole.
            </p>
          </FadeIn>
        </div>

        {/* Conteneur défilement infini */}
        <div className="relative">
          {/* Masques en dégradé */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background to-transparent" />

          {/* Conteneur défilant */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-6"
            >
              {/* Doubler les témoignages pour boucle continue */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  transition={{ duration: 0.2 }}
                  className="min-w-[280px] w-[350px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  {/* En-tête */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/70 text-sm font-semibold text-primary-foreground">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} - {testimonial.site}
                      </p>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Citation */}
                  <p className="text-muted-foreground leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
