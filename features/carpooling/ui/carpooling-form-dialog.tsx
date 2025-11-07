import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CarpoolingSchema } from "@/features/carpooling/shemas";
import { CarpoolingForm } from "@/features/carpooling/ui/carpooling-form";
import { IoCarSport } from "react-icons/io5";

interface CarpoolingFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CarpoolingSchema;
}

export default function CarpoolingFormDialog({
  isOpen,
  onClose,
  initialData,
}: CarpoolingFormDialogProps) {
  const isEditing = !!initialData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="border-b pb-3 mb-2">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-primary bg-primary/10 rounded-full p-1">
              <IoCarSport className="size-5" />
            </span>{" "}
            {isEditing ? "Modifier un covoiturage" : "Publier un covoiturage"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifier les informations du covoiturage"
              : "Renseignez les informations du covoiturage"}
          </DialogDescription>
        </DialogHeader>
        <CarpoolingForm initialData={initialData} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
