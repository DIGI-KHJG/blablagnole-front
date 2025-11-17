import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceCarBookingForm } from "@/features/service-car-booking/ui/service-car-booking-form";

import { ServiceCarBooking } from "@/types/service-car-booking";
import { FaAddressCard } from "react-icons/fa";
interface ServiceCarBookingFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ServiceCarBooking;
  showStatusField?: boolean;
}

export default function ServiceCarBookingFormDialog({
  isOpen,
  onClose,
  initialData,
  showStatusField = false,
}: ServiceCarBookingFormDialogProps) {
  const isEditMode = !!initialData?.id;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="border-b pb-3 mb-2">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-primary bg-primary/10 rounded-full p-1">
              <FaAddressCard className="size-5" />
            </span>{" "}
            Modifier les dates de la location
          </DialogTitle>
          <DialogDescription>
            Modifier les dates de la location du véhicule de service
          </DialogDescription>
        </DialogHeader>
        <ServiceCarBookingForm
          initialData={initialData}
          onClose={onClose}
          isEditMode={isEditMode}
          showStatusField={showStatusField}
        />
      </DialogContent>
    </Dialog>
  );
}
