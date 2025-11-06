import { Address } from "cluster";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type Carpooling = {
  id: string;
  driverId:string;
  departure_Date:string ;
  departure_Location: Address;
  arrival_Location: string;
  time: number;
  available_Seats: number;
  lenght: number;
  
    };

