/** Représente une adresse postale utilisée dans l'application. */
export type Address = {
  id?: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};
