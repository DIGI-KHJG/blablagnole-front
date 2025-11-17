"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { useDeleteUser } from "@/features/user/hooks";
import { Button } from "@/components/ui/button";



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
  accessorKey: "profilePicture",
  header: "Photo",
  cell: ({ row }) => {
    const url = row.original.profilePicture;

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const deleteUser = useDeleteUser();

    return (
      <>
        <Button
          variant="destructive"
          onClick={() => setDialogOpen(true)}
          className="text-sm"
        >
          Supprimer
        </Button>

        <DeleteConfirmationDialog
          showDeleteDialog={dialogOpen}
          setShowDeleteDialog={setDialogOpen}
          title="Supprimer un utilisateur"
          description={`${user.firstName} ${user.lastName}`}
          handleDelete={() => {
            deleteUser.mutate(user.id, {
              onSuccess: () => setDialogOpen(false),
            });
          }}
        />
      </>
    );
  },
}


];
