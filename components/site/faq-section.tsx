"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/text-animations";

const faqs = [
  {
    question: "Qui peut utiliser Blablagnole ?",
    answer:
      "Tous les collaborateurs avec un compte interne. Connexion via email professionnel.",
  },
  {
    question: "C'est payant ?",
    answer:
      "La plateforme est gratuite. Les frais de trajet sont partages directement entre les participants, sans commission.",
  },
  {
    question: "Comment sont calculés les frais ?",
    answer:
      "Automatiquement selon la distance et le prix du carburant. Le conducteur peut ajuster le montant s'il le souhaite.",
  },
  {
    question: "Et si un trajet est annule ?",
    answer:
      "Annulation possible jusqu'à 2h avant le départ. Les participants recoivent une notification immediate.",
  },
  {
    question: "Mes données sont protégées ?",
    answer:
      "100%. L'hébergement est interne et aucune donnée n'est partagée avec des tiers. Vos informations restent confidentielles.",
  },
  {
    question: "Suis-je assuré en tant que conducteur ?",
    answer:
      "Oui, vous êtes couvert par votre assurance auto personnelle ainsi que par une assurance complémentaire souscrite par l'entreprise.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              FAQ
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Vos questions, nos réponses
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Tout ce que vous devez savoir sur Blablagnole.
            </p>
          </FadeIn>
        </div>

        {/* Accordéon */}
        <FadeIn delay={0.3}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 ">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
