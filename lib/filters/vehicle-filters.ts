import { Car } from "@/types/car";
import { ServiceCarBooking } from "@/types/service-car-booking";

export type VehicleFilters = {
  brand: string;
  category: string;
  motorisation: string;
  immatriculation: string;
  status?: string;
};

/** Indique si un véhicule correspond aux filtres (marque, catégorie, motorisation, plaque, statut). */
function carMatchesFilters(car: Car, filters: VehicleFilters): boolean {
  if (filters.brand && car.brand !== filters.brand) return false;
  if (filters.category && car.category !== filters.category) return false;
  if (filters.motorisation && car.motorisation !== filters.motorisation)
    return false;
  if (filters.immatriculation) {
    const search = filters.immatriculation.trim().toLowerCase();
    if (!car.registrationPlate?.toLowerCase().includes(search)) return false;
  }
  if (
    filters.status &&
    (car.status !== filters.status || car.status === undefined)
  )
    return false;
  return true;
}

/**
 * Filtre la liste des véhicules selon les critères (marque, catégorie, etc.).
 * @param cars Liste des véhicules (ou undefined).
 * @param filters Critères de filtrage.
 * @returns Liste des véhicules qui correspondent aux filtres.
 */
export function filterCarsByVehicleFilters(
  cars: Car[] | undefined,
  filters: VehicleFilters
): Car[] {
  if (!cars) return [];
  return cars.filter((car) => carMatchesFilters(car, filters));
}

/**
 * Filtre les réservations de véhicules de service selon les critères appliqués au véhicule associé.
 * @param bookings Liste des réservations (ou undefined).
 * @param filters Critères de filtrage véhicule.
 * @returns Liste des réservations dont le véhicule correspond aux filtres.
 */
export function filterBookingsByVehicleFilters(
  bookings: ServiceCarBooking[] | undefined,
  filters: VehicleFilters
): ServiceCarBooking[] {
  if (!bookings) return [];
  return bookings.filter((booking) => {
    const car = booking.serviceCar;
    if (!car) return false;
    return carMatchesFilters(car, filters);
  });
}
