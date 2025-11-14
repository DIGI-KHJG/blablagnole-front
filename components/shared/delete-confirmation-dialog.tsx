import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmationDialogProps {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (showDeleteDialog: boolean) => void;
  handleDelete: () => void;
  title: string;
  description: string;
}

export function DeleteConfirmationDialog({
  showDeleteDialog,
  setShowDeleteDialog,
  handleDelete,
  title,
  description,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer <strong>{description}</strong> ?{" "}
            <br />
            Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
