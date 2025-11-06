export type User = {
  id?: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  profile_picture: string;
  role: Role;
  created_at: Date;
};

export type Role = "ADMIN" | "COLLABORATOR";
