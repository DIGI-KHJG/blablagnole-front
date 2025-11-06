import { User } from "./user";


export type Carpooling = {
  id: string;
  driver: User;
  departure_date: string ;
  departure_location: Address;
  arrival_location: string;
  time: number;
  available_seats: number;
  distance : number;
  car: Car;
  carpooling_status:carpooling_status
  passengers: User[];
};

export type carpooling_status = "ACTIVE" | "COMPLETED"| "CANCELED";

export type Address = {
  street: string;
  city: string;
  zipCode: string;
  country: string;
};
