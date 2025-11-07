
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FaTruck } from "react-icons/fa";
import { CarSchema } from "./ui/shema";
import { CompanyCarForm } from "./ui/company-car-form";

interface CompanyCarFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CarSchema;
}

export default function CompanyCarFormDialog({
  isOpen,
  onClose,
  initialData,
}: CompanyCarFormDialogProps) {
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
        <CompanyCarForm initialData={initialData} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
