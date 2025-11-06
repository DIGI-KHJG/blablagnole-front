export type User = {
  id?: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  profile_picture: string;
  role: Role;
};

export type Role = "ADMIN" | "COLLABORATOR";
