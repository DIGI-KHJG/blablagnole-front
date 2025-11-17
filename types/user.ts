export type User = {
  id?: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: Role;
};

export type Role = "ADMIN" | "COLLABORATOR";

export const getRoleLabel = (role?: Role) => {
  const labels: Record<Role, string> = {
    ADMIN: "Administrateur",
    COLLABORATOR: "Collaborateur",
  };
  return role ? labels[role] : "";
};

export const getRoleColor = (role?: Role) => {
  const colors: Record<Role, string> = {
    ADMIN: "bg-secondary",
    COLLABORATOR: "bg-primary",
  };
  return role ? colors[role] : "";
};
