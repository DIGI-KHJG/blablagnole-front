import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceCarForm } from "@/features/service-car/ui/service-car-form";

import { Car } from "@/types/car";
import { FaTruck } from "react-icons/fa";
interface ServiceCarFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Car;
}

export default function ServiceCarFormDialog({
  isOpen,
  onClose,
  initialData,
}: ServiceCarFormDialogProps) {
  const isEditing = !!initialData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="border-b pb-3 mb-2">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-primary bg-primary/10 rounded-full p-1">
              <FaTruck className="size-5" />
            </span>{" "}
            {isEditing
              ? "Modifier le véhicule de service"
              : "Ajouter un véhicule de service"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifier les informations du véhicule de service"
              : "Renseignez les informations du véhicule de service"}
          </DialogDescription>
        </DialogHeader>
        <ServiceCarForm initialData={initialData} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
