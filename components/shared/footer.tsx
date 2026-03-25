"use client";

import Image from "next/image";
import Link from "next/link";

import { SITE_SECTION_LINKS } from "@/lib/site-sections";

const footerLinks = {
  support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "#" },
    { label: "Signaler un probleme", href: "#" },
  ],
  legal: [
    { label: "Mentions legales", href: "#" },
    { label: "Politique de confidentialite", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/bbgl-logo.svg"
                alt="Blablagnole"
                width={160}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/50 leading-relaxed">
              La plateforme de covoiturage interne qui rapproche vos
              collaborateurs et réduit votre empreinte carbone.
            </p>
          </div>

          {/* Plateforme */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Plateforme
            </h3>
            <ul className="space-y-3">
              {SITE_SECTION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mentions légales */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Mentions légales
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/40">
            Copyright © - {new Date().getFullYear()} Blablagnole - Made by
            Khaled & Julia with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
