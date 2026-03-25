/** Représente un utilisateur de l'application. */
export type User = {
  id?: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: Role;
};

/** Rôle attribué à un utilisateur. */
export type Role = "ADMIN" | "COLLABORATOR";

/** Retourne le libellé lisible d'un rôle utilisateur. */
export const getRoleLabel = (role?: Role) => {
  const labels: Record<Role, string> = {
    ADMIN: "Administrateur",
    COLLABORATOR: "Collaborateur",
  };
  return role ? labels[role] : "";
};

/** Retourne la classe Tailwind associée à un rôle utilisateur. */
export const getRoleColor = (role?: Role) => {
  const colors: Record<Role, string> = {
    ADMIN: "bg-secondary",
    COLLABORATOR: "bg-primary",
  };
  return role ? colors[role] : "";
};
