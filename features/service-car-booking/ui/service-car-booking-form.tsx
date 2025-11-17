"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import InputDateTimeCalendar from "@/components/ui/input-date-time-calendar";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useBookServiceCar } from "@/features/service-car-booking/hooks";
import { Car } from "@/types/car";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { serviceCarBookingSchema, ServiceCarBookingSchema } from "../schemas";

interface ServiceCarBookingFormProps {
  serviceCar: Car;
}

export function ServiceCarBookingForm({
  serviceCar,
}: ServiceCarBookingFormProps) {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: bookServiceCar, isPending } = useBookServiceCar();

  const form = useForm<ServiceCarBookingSchema>({
    resolver: zodResolver(serviceCarBookingSchema),
    defaultValues: {
      serviceCarId: serviceCar?.id ?? 0,
      driverId: currentUser?.id ?? 0,
      startAt: new Date(),
      endAt: new Date(),
      status: "CONFIRMED",
    },
  });

  const onSubmit = async (data: ServiceCarBookingSchema) => {
    const formData: ServiceCarBookingSchema = {
      ...data,
      serviceCarId: serviceCar?.id ?? 0,
      driverId: currentUser?.id ?? 0,
    };
    bookServiceCar(formData, {
      onSuccess: () => {
        toast.success("Véhicule de service réservé avec succès");
        router.push("/dashboard/vehicules-de-services/mes-locations");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <form id="service-car-booking-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date et heure de début */}
          <Controller
            control={form.control}
            name="startAt"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-md">
                  Du :
                </FieldLabel>
                <InputDateTimeCalendar
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Date et heure de fin */}
          <Controller
            control={form.control}
            name="endAt"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-md">
                  Au :
                </FieldLabel>
                <InputDateTimeCalendar
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Field>
          <Button type="submit" form="service-car-booking-form">
            {isPending ? <Spinner className="w-4 h-4" /> : "Réserver"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
