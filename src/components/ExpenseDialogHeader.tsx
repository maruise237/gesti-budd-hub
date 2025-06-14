
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExpenseDialogHeaderProps {
  expense: any;
}

export const ExpenseDialogHeader = ({ expense }: ExpenseDialogHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle>
        {expense ? "Modifier la dépense" : "Nouvelle dépense"}
      </DialogTitle>
      <DialogDescription>
        {expense 
          ? "Modifiez les informations de la dépense." 
          : "Enregistrez une nouvelle dépense pour vos projets."
        }
      </DialogDescription>
    </DialogHeader>
  );
};
