"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/text-animations";
import { Building2, Car, Leaf, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

function StatItem({ icon, value, suffix = "", label }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-xl font-bold text-secondary sm:text-2xl">
        {count.toLocaleString("fr-FR")}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="relative z-10 flex shrink-0 flex-col py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-6"
        >
          <StaggerItem>
            <StatItem
              icon={<Car className="h-5 w-5" />}
              value={1200}
              suffix="+"
              label="Trajets partagés"
            />
          </StaggerItem>
          <StaggerItem>
            <StatItem
              icon={<Users className="h-5 w-5" />}
              value={450}
              suffix="+"
              label="Collaborateurs inscrits"
            />
          </StaggerItem>
          <StaggerItem>
            <StatItem
              icon={<Leaf className="h-5 w-5" />}
              value={12}
              suffix=" tonnes"
              label="CO₂ économisées"
            />
          </StaggerItem>
          <StaggerItem>
            <StatItem
              icon={<Building2 className="h-5 w-5" />}
              value={35}
              label="Sites reliés"
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
