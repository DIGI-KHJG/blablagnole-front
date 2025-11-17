"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "@/features/user/hooks";
import { getRoleColor, getRoleLabel, User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsCellProps {
  user: User;
}

function ActionsCell({ user }: ActionsCellProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteUser = useDeleteUser();
  const router = useRouter();

  const handleDeleteUser = (id: number) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        toast.success(`Utilisateur "${user.firstName}" supprimé`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="text-sm"
        onClick={() => router.push(`/dashboard/collaborateurs/${user.id}`)}
      >
        Voir
      </Button>

      <Button
        variant="destructive"
        className="text-sm"
        onClick={() => setDialogOpen(true)}
      >
        Supprimer
      </Button>

      <DeleteConfirmationDialog
        showDeleteDialog={dialogOpen}
        setShowDeleteDialog={setDialogOpen}
        title="Supprimer un utilisateur"
        description={`supprimer l'utilisateur ${user.firstName} ${user.lastName}`}
        handleDelete={() => user.id && handleDeleteUser(user.id)}
      />
    </div>
  );
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "profilePicture",
    header: () => <div className="text-center">Photo</div>,
    cell: ({ row }) => {
      const url = row.original.profilePicture;

      return (
        <div className="flex justify-center">
          {url ? (
            <Image
              width={40}
              height={40}
              src={url}
              alt={`${row.original.firstName} ${row.original.lastName}`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "lastName",
    header: () => <div className="text-center">Nom</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("lastName")}</div>
    ),
  },

  {
    accessorKey: "firstName",
    header: () => <div className="text-center">Prénom</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("firstName")}</div>
    ),
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("email")}</div>
    ),
  },

  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => (
      <Badge
        className={`${getRoleColor(row.getValue("role"))} text-white text-sm`}
      >
        {getRoleLabel(row.getValue("role"))}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <ActionsCell user={row.original} />
        </div>
      );
    },
  },
];
