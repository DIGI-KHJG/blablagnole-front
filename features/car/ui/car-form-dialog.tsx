import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CarSchema } from "@/features/car/schemas";
import { CarForm } from "@/features/car/ui/car-form";
import { FaTruck } from "react-icons/fa";

interface CarFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CarSchema;
}

export default function CarFormDialog({
  isOpen,
  onClose,
  initialData,
}: CarFormDialogProps) {
  const isEditing = !!initialData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="border-b pb-3 mb-2">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-primary bg-primary/10 rounded-full p-1">
              <FaTruck className="size-5" />
            </span>{" "}
            {isEditing ? "Modifier le véhicule" : "Ajouter un véhicule"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifier les informations du véhicule"
              : "Renseignez les informations du véhicule"}
          </DialogDescription>
        </DialogHeader>
        <CarForm initialData={initialData} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
