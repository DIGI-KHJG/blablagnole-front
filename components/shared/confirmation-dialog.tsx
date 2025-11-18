import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface ConfirmationDialogProps {
  showConfirmationDialog: boolean;
  setShowConfirmationDialog: (showConfirmationDialog: boolean) => void;
  handleConfirm: () => void;
  title: string;
  description: string | React.ReactNode;
}

export function ConfirmationDialog({
  showConfirmationDialog,
  setShowConfirmationDialog,
  handleConfirm,
  title,
  description,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={showConfirmationDialog}
      onOpenChange={setShowConfirmationDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-balance">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowConfirmationDialog(false)}
          >
            Annuler
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
