"use client";

import { ColumnDef } from "@tanstack/react-table";


export type Collaborateur = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  profile_picture: string | null;
  role: string;
};

export const columns: ColumnDef<Collaborateur>[] = [
  {
    accessorKey: "lastName",
    header: "Nom",
  },
  {
    accessorKey: "firstName",
    header: "Prénom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
 {
  accessorKey: "profile_picture",
  header: "Photo",
  cell: ({ row }) => {
    const url = row.original.profile_picture;

    return url ? (
      <img
        src={url}
        alt="Photo"
        className="h-10 w-10 rounded-full object-cover"
      />
    ) : (
      <span className="text-gray-400">-</span>
    );
  },
},

  {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const user = row.original;

    const handleDelete = async () => {
      if (!confirm(`Supprimer ${user.first_name} ${user.last_name} ?`)) return;

      const res = await fetch(`/api/dashboard/collaborateurs/${user.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Collaborateur supprimé !");
        window.location.reload(); // refresh tableau
      } else {
        alert("Erreur lors de la suppression");
      }
    };

    return (
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
      >
        Supprimer
      </button>
    );
  },
}

];
