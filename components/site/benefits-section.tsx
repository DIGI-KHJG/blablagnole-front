"use client";

import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/text-animations";
import { Leaf, Lock, ParkingCircle, Users, Wallet, Zap } from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Économies garanties",
    description:
      "Divisez vos frais de carburant et de péage entre collaborateurs.",
  },
  {
    icon: Leaf,
    title: "Éco-responsable",
    description: "Réduisez votre empreinte carbone à chaque trajet partagé.",
  },
  {
    icon: Lock,
    title: "100% interne",
    description:
      "Réservé aux employés de l'entreprise. Confiance et sécurité assurées.",
  },
  {
    icon: ParkingCircle,
    title: "Moins de stress parking",
    description: "Moins de voitures, plus de places disponibles sur les sites.",
  },
  {
    icon: Users,
    title: "Esprit d'équipe",
    description: "Créez des liens avec des collaborateurs d'autres services.",
  },
  {
    icon: Zap,
    title: "Réservation instantanée",
    description: "Trouvez et réservez un trajet en moins de 30 secondes.",
  },
];

export function BenefitsSection() {
  return (
    <section id="avantages" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Avantages
            </span>
            <h2 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">
              Pourquoi choisir Blablagnole ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Des avantages concrets pour tous les jours.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <div className="group rounded-xl bg-card p-6 shadow-sm border border-border transition-all hover:shadow-md hover:border-primary/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-secondary">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
