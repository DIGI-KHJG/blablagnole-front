"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceCarBookingForm } from "@/features/service-car-booking/ui/service-car-booking-form";
import type { Car } from "@/types/car";

type ServiceCarBookingRangeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceCar: Car | null;
};

/**
 * Dialogue de réservation sur une plage de dates pour un véhicule de service.
 * @param open Contrôle l’ouverture du dialogue.
 * @param onOpenChange Callback de changement d’état d’ouverture.
 * @param serviceCar Véhicule à réserver (null affiche seulement le bouton fermer).
 */
export function ServiceCarBookingRangeDialog({
  open,
  onOpenChange,
  serviceCar,
}: ServiceCarBookingRangeDialogProps) {
  const handleOpenChange = (next: boolean) => onOpenChange(next);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Réserver {serviceCar?.brand} {serviceCar?.model}
          </DialogTitle>
        </DialogHeader>
        {serviceCar ? (
          <ServiceCarBookingForm
            serviceCar={serviceCar}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
