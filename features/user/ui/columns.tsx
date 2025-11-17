"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "@/features/user/hooks";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export type Collaborateur = {
  id: number;
  firstName: string;
  lastName: string;
  full_name: string;
  email: string;
  profilePicture: string | null;
  role: string;
};

export const columns: ColumnDef<Collaborateur>[] = [
  // 👉 1. Photo
  {
    accessorKey: "profilePicture",
    header: "Photo",
    cell: ({ row }) => {
      const url = row.original.profilePicture;

      return url ? (
        <Image
          width={40}
          height={40}
          src={url}
          alt={`${row.original.firstName} ${row.original.lastName}`}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
  },


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
    accessorKey: "role",
    header: "Role",
  },


  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const [dialogOpen, setDialogOpen] = useState(false);
      const deleteUser = useDeleteUser();
      const router = useRouter();

      return (
        <div className="flex gap-2">
          {/* Bouton VOIR */}
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => router.push(`/dashboard/collaborateurs/${user.id}`)}
          >
            Voir
          </Button>

          {/* Bouton SUPPRIMER */}
          <Button
            variant="destructive"
            className="text-sm"
            onClick={() => setDialogOpen(true)}
          >
            Supprimer
          </Button>

          {/* Popup de confirmation */}
          <DeleteConfirmationDialog
            showDeleteDialog={dialogOpen}
            setShowDeleteDialog={setDialogOpen}
            title="Supprimer un utilisateur"
      description={`supprimer l'utilisateur ${user.firstName} ${user.lastName}`}
            handleDelete={() => {
              deleteUser.mutate(user.id, {
                onSuccess: () => {
                  toast.success(`Utilisateur "${user.firstName}" supprimé`);
                  setDialogOpen(false);
                },
                onError: () => {
                  toast.error("Erreur lors de la suppression");
                },
              });
            }}
          />
        </div>
      );
    },
  },
];
