export type User = {
  id?: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: Role;
};

export type Role = "ADMIN" | "COLLABORATOR";
