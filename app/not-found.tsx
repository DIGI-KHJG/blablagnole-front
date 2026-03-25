"use client";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/text-animations";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-accent to-background py-24 sm:py-32">
          {/* Wave SVG Background  */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="oklch(0.6723 0.1606 244.9955 / 0.1)"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>

          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
              <FadeIn>
                <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Page introuvable
                </span>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h1 className="text-7xl font-bold tracking-tight text-primary sm:text-8xl">
                  404
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-5 text-lg font-medium text-foreground">
                  Cette page n&apos;existe pas.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Vous vous êtes peut-être perdu en route. <br /> Revenez à
                  l&apos;accueil pour repartir du bon pied.
                </p>
              </FadeIn>
              <FadeIn delay={0.22}>
                <Link href="/" className="mt-8 inline-block">
                  <Button size="lg">
                    <Home className="mr-1 h-5 w-5" />
                    Retour à l&apos;accueil
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
